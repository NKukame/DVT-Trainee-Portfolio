import {spawn} from "child_process";
import {config} from "dotenv";
import fs from "fs";
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
    console.log(process.env.DATABASE_URL);
    const dbName = "database";
    const filename = `${process.env.DB_NAME}_${isoFilename()}.bak`;
    const tunnelHost = "127.0.0.1";
    const tunnelPort = 5555;
  
    console.log(`Starting backup of ${filename}`);
  
    console.log("Starting Prisma tunnel...");
    const tunnel = spawn("npx", [
      "--yes", 
      "@prisma/ppg-tunnel",
      "--host", tunnelHost,
      "--port", tunnelPort.toString()
    ], {
      env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL, NPX_YES: "1", PGSSLMODE: "disable" },
      stdio: ["ignore", "pipe", "pipe"],
      shell: true
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

        if (!fs.existsSync("./backups")) {
            fs.mkdirSync("./backups");
        }
        const outputPath = `./backups/${filename}`;

        const pgDump = spawn(
            "pg_dump",
            [
                process.env.DATABASE_URL2,
                "--format=custom",
                "--compress=9",
                "--no-owner",
                "--no-privileges",
                "--verbose",
                "-f",
                outputPath
            ],
            { stdio: ["ignore", "inherit", "inherit"], env: { ...process.env, PGSSLMODE: "disable" } }
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

        console.log(`Backup completed and saved to ${outputPath}`);
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
