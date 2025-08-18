import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { config } from "dotenv";
import B2 from "backblaze-b2";
import {spawn} from "child_process";

config();

// Initialize Backblaze B2 client
const b2 = new B2({
  applicationKey: process.env.B2_APPLICATION_KEY,
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
});

async function waitForTunnel(host = "127.0.0.1", port = 5555, maxWait = 30000) {
  const start = Date.now();
  const { spawn: run } = await import("node:child_process");
  while (Date.now() - start < maxWait) {
    const test = run("pg_isready", ["-h", host, "-p", port.toString()], { stdio: "ignore" });
    const exit = await new Promise(res => {
      test.on("close", res);
      test.on("error", () => res(1));
    });
    if (exit === 0) return;
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error("Tunnel not ready in time");
}

async function findLatestBackup() {
  try {
    await b2.authorize();
    
    const response = await b2.listFileNames({
      bucketId: process.env.B2_BUCKET_ID,
      maxFileCount: 1000,
    });

    console.log(response.data.files);
    
    if (!response.data || !response.data.files) {
      throw new Error("No files found in Backblaze bucket");
    }

    const bakFiles = response.data.files
      .filter(file => file.fileName.endsWith(".bak"))
      .sort((a, b) => b.uploadTimestamp - a.uploadTimestamp);

    if (!bakFiles.length) {
      throw new Error("No .bak files found in Backblaze bucket");
    }

    return bakFiles[0];
  } catch (error) {
    throw new Error(`Failed to find latest backup: ${error.message}`);
  }
}

async function downloadBackup(backupFile) {
  try {
    console.log(`Downloading backup: ${backupFile.fileName}...`);
    
    // Create temp directory if it doesn't exist
    const tempDir = "./temp";
    if (!fs.existsSync(tempDir)) {
      await fsp.mkdir(tempDir, { recursive: true });
    }
    
    // Download the file
    const downloadResponse = await b2.downloadFileByName({
      bucketName: "DVT-Portfolio",
      fileName: backupFile.fileName,
    });
    
    // Save to temporary file
    const tempFilePath = path.join(tempDir, backupFile.fileName);
    await fsp.writeFile(tempFilePath, downloadResponse.data);
    
    const mb = backupFile.contentLength / 1024 / 1024;
    console.log(`Download completed: ${tempFilePath} (${mb.toFixed(2)} MB)`);
    
    return tempFilePath;
  } catch (error) {
    throw new Error(`Failed to download backup: ${error.message}`);
  }
}

async function cleanupTempFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      await fsp.unlink(filePath);
      console.log(`Cleaned up temporary file: ${filePath}`);
    }
  } catch (error) {
    console.warn(`Failed to cleanup temp file: ${error.message}`);
  }
}

async function main() {
  const tunnelHost = "127.0.0.1";
  const tunnelPort = 5555;
  
  let backupPath = process.argv[2];
  let tempFilePath = null;
  
  // If no backup path provided, find and download latest from Backblaze
  if (!backupPath) {
    const latestBackup = await findLatestBackup();
    backupPath = await downloadBackup(latestBackup);
    tempFilePath = backupPath; // Mark for cleanup
  }

  console.log(`Starting restore from ${backupPath}`);
  console.log("Starting Prisma tunnel...");

  const tunnel = spawn("npx.cmd", [
    "--yes", 
    "@prisma/ppg-tunnel",
    "--host", tunnelHost,
    "--port", tunnelPort.toString()
  ], {
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL, NPX_YES: "1", PGSSLMODE: "disable" },
    stdio: ["ignore", "inherit", "inherit"],
    shell: true
  });

  try {
    await new Promise(r => setTimeout(r, 6000));
    await waitForTunnel(tunnelHost, tunnelPort);

    // const pgRestore = spawn("pg_restore", [
    //   "--clean",
    //   "--no-owner",
    //   "--no-privileges",
    //   "--verbose",
    //   "--dbname", process.env.DATABASE_URL,
    //   backupPath
    // ], { stdio: ["ignore", "inherit", "inherit"], env: { ...process.env, PGSSLMODE: "disable" } });

    // await new Promise((resolve, reject) => {
    //   pgRestore.on("error", reject);
    //   pgRestore.on("close", code => {
    //     if (code !== 0) return reject(new Error(`pg_restore exited with code ${code}`));
    //     resolve();
    //   });
    // });

    console.log("Restore completed successfully.", tempFilePath);
  } finally {
    // Cleanup
    if (tunnel) {
      console.log("Closing tunnel...");
      tunnel.stdout?.removeAllListeners();
      tunnel.stderr?.removeAllListeners();
      tunnel.kill();
      await Promise.race([
        new Promise(res => tunnel.once("close", res)),
        new Promise(res => setTimeout(res, 5000))
      ]);
      if (!tunnel.killed) tunnel.kill("SIGKILL");
    }
    
    // Clean up downloaded temp file
    if (tempFilePath) {
      await cleanupTempFile(tempFilePath);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });