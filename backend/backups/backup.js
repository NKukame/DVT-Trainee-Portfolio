import {spawn} from "child_process";
import {config} from "dotenv";
import { URL } from "url";
import B2 from "backblaze-b2";
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

config();

function isoFilename(){
    return new Date().toISOString().replace(/[:.]/g, "-");
}

async function waitForTunnel(host = "127.0.0.1", port = 5555, maxWait = 30000) {
    const start = Date.now();
    
    while (Date.now() - start < maxWait) {
      try {
        const { spawn } = await import("node:child_process");
        const test = spawn("pg_isready", ["-h", host, "-p", port.toString()], {
          stdio: "ignore"
        });
        
        const exitCode = await new Promise((resolve) => {
          test.on("close", resolve);
          test.on("error", () => resolve(1));
        });
        
        if (exitCode === 0) {
          console.log(`✅ Tunnel ready at ${host}:${port}`);
          return;
        }
      } catch {
      }
      
       await new Promise(res => setTimeout(res, 1000));
    }
    
    throw new Error(`Tunnel not ready after ${maxWait}ms`);
}

async function main(){
    // Validate required environment variables
    if (!process.env.DATABASE_URL && !process.env.DATABASE_URL2) {
        throw new Error("DATABASE_URL environment variable is required");
    }

    // Parse database name from DATABASE_URL
    let dbName;
    try {
        const url = new URL(process.env.DATABASE_URL);
        dbName = url.pathname.slice(1) || "database"; // Remove leading slash
    } catch (error) {
        console.error("Invalid DATABASE_URL:", error.message);
        dbName = process.env.DB_NAME || "database";
    }

    const filename = `${dbName}_${isoFilename()}.bak`;
    const b2 = new B2({
      applicationKey: process.env.B2_APPLICATION_KEY,
      applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
    });

    await b2.authorize();

    const {data: uploadUrl} = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID,
    });
    
    const tunnelHost = "127.0.0.1";
    const tunnelPort = 5555;
  
    console.log(`Starting backup of ${filename}`);
    console.log(`Database URL: ${process.env.DATABASE_URL.replace(/:\/\/[^@]+@/, '://***:***@')}`); // Log safely

    console.log("Starting Prisma tunnel...");
    
    // Detect platform for npx command
    const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    
    const tunnel = spawn(npxCommand, [
        "--yes", 
        "@prisma/ppg-tunnel",
        "--host", tunnelHost,
        "--port", tunnelPort.toString()
    ], {
        env: { 
            ...process.env, 
            DATABASE_URL: process.env.DATABASE_URL, 
            NPX_YES: "1", 
            PGSSLMODE: "disable" 
        },
        stdio: ["ignore", "pipe", "pipe"],
        shell: process.platform === 'win32'
    });
  
    let tunnelReady = false;
  
    tunnel.stdout.on("data", (data) => {
        const output = data.toString();
        console.log("Tunnel:", output.trim());
        if (output.includes("Tunnel ready") || output.includes("listening")) {
            tunnelReady = true;
        }
    });
  
    tunnel.stderr.on("data", (data) => {
        console.error("Tunnel stderr:", data.toString());
    });
  
    try {
        try {
            await new Promise(res => setTimeout(res, 3000));
            await waitForTunnel(tunnelHost, tunnelPort);
        } catch {
            console.log("Using basic wait for tunnel readiness...");
            await new Promise(res => setTimeout(res, 10000));
        }

        if (! fs.existsSync("./backups")) {
            fs.mkdirSync("./backups");
        }
        const outputPath = `./backups/${filename}`;

        // Use tunnel connection string instead of DATABASE_URL2
        const tunnelConnectionString = `postgresql://localhost:${tunnelPort}/${dbName}`;
        
        const pgDump = spawn(
            "pg_dump",
            [
                tunnelConnectionString, // Use original DATABASE_URL
                "--format=custom",
                "--compress=9",
                "--no-owner",
                "--no-privileges",
                "--verbose",
                "-f",
                outputPath
            ],
            { 
                stdio: ["ignore", "inherit", "inherit"], 
                env: { ...process.env, PGSSLMODE: "disable" } 
            }
        );

        await new Promise((resolve, reject) => {
            pgDump.on("error", reject);
            pgDump.on("close", (code) => {
                if (code !== 0) {
                    reject(new Error(`pg_dump failed with code ${code}`));
                }
                resolve();
            });
        });

        const buffer = await fsPromises.readFile(filename);
        const stats = await fsPromises.stat(filename);
        const mb = stats.size / 1024 / 1024;

        console.log(`Backup completed: ${filename} (${mb.toFixed(2)} MB) Now uploading to Backblaze B2`);

        const {data: file} = await b2.uploadFile({
            uploadUrl: uploadUrl.uploadUrl,
            uploadAuthToken: uploadUrl.authorizationToken,
            fileName: path.basename(filename), // Use just the filename, not the full path
            data: buffer,
            contentType: "application/octet-stream",
        });

        console.log(`Backup completed and saved to ${outputPath} and uploaded to Backblaze B2`);
    } finally {
        if (tunnel) {
            console.log("Closing tunnel...");
            tunnel.stdout?.removeAllListeners();
            tunnel.stderr?.removeAllListeners();
            tunnel.kill();
            await Promise.race([
                new Promise(res => tunnel.once("close", res)),
                new Promise(res => setTimeout(res, 5000))
            ]);
            if (!tunnel.killed) {
                tunnel.kill("SIGKILL");
            }
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });