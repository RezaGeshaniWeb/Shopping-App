import { spawn } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";
import "dotenv/config";

/**
 * Prisma Studio 7 detects protocols with `url.split("://")[0]`, so relative
 * SQLite URLs like `file:./dev.db` fail. Pass an absolute `file:///C:/...`
 * URL instead. Migrate still uses DATABASE_URL (`file:./dev.db`) from config.
 */
const raw = process.env.DATABASE_URL ?? "file:./dev.db";
const relativePath = raw.startsWith("file:") ? raw.slice("file:".length) : raw;
const absolutePath = path.resolve(process.cwd(), relativePath);
const url = pathToFileURL(absolutePath).href;

const child = spawn(
  "npx",
  ["prisma", "studio", "--url", url, ...process.argv.slice(2)],
  { stdio: "inherit", shell: true },
);

child.on("exit", (code) => process.exit(code ?? 0));
