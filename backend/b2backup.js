import {spawn} from "child_process";
import B2 from "backblaze-b2";
import {config} from "dotenv";
config();
function isoFilename(){
    return new Date().toISOString().replace(/[:.]/g, "-");
}

async function main(){
    const dbName = "database";
    const filename = `${process.env.DB_NAME}_${isoFilename()}.bak`;
    const b2 = new B2({
        applicationKey: process.env.B2_APPLICATION_KEY,
        applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
    });

    await b2.authorize();

    const {data: uploadUrl} = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID,
    });

    console.log(`Starting backup of ${filename}`);

    const pgDump = spawn(
        "pg_dump", [
            process.env.DATABASE_URL2,
            "--format=custom",
            "--compress=9",
            "--no-owner",
            "--no-privileges",
            "--verbose",
        ],
        {stdio: ["ignore", "pipe", "pipe"]}
    );
    
    const chunks = [];
    let total = 0;
    pgDump.stdout.on("data", chunk => {
        chunks.push(chunk);
        total += chunk.length;
    });

    pgDump.stderr.on("data", (d) => process.stderr.write(d));

    await new Promise((resolve, reject) => {
        pgDump.on("error", reject);
        pgDump.on("close", (code) => {
            if (code !== 0) {
                reject(new Error(`pg_dump failed with code ${code}`));
            }
            resolve();
        });
    });

    const buffer = Buffer.concat(chunks);
    const mb = total / 1024 / 1024;
    console.log(`Backup completed: ${filename} (${mb.toFixed(2)} MB)`);
    const {data: file} = await b2.uploadFile({
        uploadUrl: uploadUrl.uploadUrl,
        uploadAuthToken: uploadUrl.authorizationToken,
        fileName: filename,
        data: buffer,
        contentType: "application/octet-stream",
    });
    console.log(`Backup completed: ${file.fileName}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
