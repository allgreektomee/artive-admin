/**
 * `src/art` 폴더를 public 정적 경로용 zip으로 묶는다.
 * 배포 전에 `src/art`를 수정했다면 다시 실행해 동기화한다.
 */
import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/dev/art");
const outZip = resolve(outDir, "art-site-source.zip");

mkdirSync(outDir, { recursive: true });

try {
  execSync(`zip -r -q "${outZip}" art`, {
    cwd: resolve(root, "src"),
    stdio: "inherit",
  });
} catch {
  console.error(
    "zip 명령이 필요합니다 (macOS/Linux). Windows에서는 WSL이나 Git Bash에서 실행하세요.",
  );
  process.exit(1);
}

console.log("Wrote", outZip);
