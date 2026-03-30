/**
 * compare-coverage.mjs
 *
 * Compares Vitest coverage summary files for each app and package
 * captured at two points, and fails if coverage has regressed.
 *
 * Intended for use in CI to prevent pull requests from decreasing test coverage.
 *
 * Arguments:
 *   node compare-coverage.mjs <pr-dir> <baseline-dir>
 *
 * Exit codes:
 *   0  coverage is unchanged or improved
 *   1  coverage regressed in at least on project (or general script error)
 */

import fs from "node:fs";

const prDir = process.argv[2];
const baseDir = process.argv[3];

const projects = fs.readdirSync(prDir).filter((file) => file.endsWith(".json"));

let failed = false;

for (const file of projects) {
  const prPath = `${prDir}/${file}`;
  const basePath = `${baseDir}/${file}`;

  if (!fs.existsSync(basePath)) {
    console.log(`⚠️ ${file.replace(".json", "")}: no baseline found, skipping`);
    continue;
  }

  const pr = JSON.parse(fs.readFileSync(prPath));
  const base = JSON.parse(fs.readFileSync(basePath));

  const prLines = pr.total.lines.pct;
  const baseLines = base.total.lines.pct;

  const delta = (prLines - baseLines).toFixed(2);
  const name = file.replace(".json", "");

  console.log(`\nProject: ${name}`);
  console.log(`Base: ${baseLines}%`);
  console.log(`PR:   ${prLines}%`);
  console.log(`Δ:    ${delta}%`);

  if (prLines < baseLines) {
    console.log("❌ Regression detected");
    failed = true;
  } else {
    console.log("✅ OK");
  }
}

if (failed) {
  process.exit(1);
}
