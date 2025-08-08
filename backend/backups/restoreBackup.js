import { spawn } from "child_process";
import fs from "fs";
import { config } from "dotenv";
config();

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

function findLatestBackup() {
  if (!fs.existsSync("./backups")) throw new Error("./backups folder not found");
  const files = fs.readdirSync("./backups")
    .filter(f => f.endsWith(".bak"))
    .map(f => ({ f, t: fs.statSync(`./backups/${f}`).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  if (!files.length) throw new Error("No .bak files in ./backups");
  return `./backups/${files[0].f}`;
}

async function main() {
  const tunnelHost = "127.0.0.1";
  const tunnelPort = 5555;
  const backupPath = process.argv[2] ?? findLatestBackup();

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
    await new Promise(r => setTimeout(r, 3000));
    await waitForTunnel(tunnelHost, tunnelPort);

    const pgRestore = spawn("pg_restore", [
      "--clean",
      "--no-owner",
      "--no-privileges",
      "--verbose",
      "--dbname", process.env.DATABASE_URL,
      backupPath
    ], { stdio: ["ignore", "inherit", "inherit"], env: { ...process.env, PGSSLMODE: "disable" } });

    await new Promise((resolve, reject) => {
      pgRestore.on("error", reject);
      pgRestore.on("close", code => {
        if (code !== 0) return reject(new Error(`pg_restore exited with code ${code}`));
        resolve();
      });
    });

    console.log("Restore completed successfully.");
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
      if (!tunnel.killed) tunnel.kill("SIGKILL");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
