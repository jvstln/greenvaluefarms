/**
 * Next 16 SWC WASM fallback seeder.
 *
 * Next's SWC loader only falls back to `@next/swc-wasm-nodejs` by downloading
 * it on demand, and that download resolves the registry via
 * `pnpm config get registry` — which fails on Hostinger's shared-hosting
 * builder because `pnpm` is not on PATH during `next build`. The node_modules
 * import path is unusable there too, so the download is unavoidable... unless
 * the package is already extracted at `next/wasm/@next/swc-wasm-nodejs`,
 * which makes `downloadWasmSwc` return early without touching pnpm.
 *
 * This postinstall copies the installed package there (idempotent). Runs on
 * every platform; harmless where native SWC works.
 */
import { cpSync, existsSync, mkdirSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

function resolvePackageDir(specifier) {
  try {
    return dirname(realpathSync(require.resolve(`${specifier}/package.json`)));
  } catch {
    return dirname(realpathSync(require.resolve(specifier)));
  }
}

const srcDir = resolvePackageDir("@next/swc-wasm-nodejs");
const nextDir = resolvePackageDir("next");
const destDir = join(nextDir, "wasm", "@next/swc-wasm-nodejs");

if (!existsSync(destDir)) {
  mkdirSync(dirname(destDir), { recursive: true });
  cpSync(srcDir, destDir, { recursive: true });
  console.log(`[seed-next-wasm] copied SWC WASM bindings to ${destDir}`);
} else {
  console.log(
    `[seed-next-wasm] SWC WASM bindings already present at ${destDir}`,
  );
}
