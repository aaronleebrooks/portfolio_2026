import fs from "node:fs";

const css = fs.readFileSync("node_modules/xp.css/dist/XP.css", "utf8");
const map = {
  Minimize: "minimize",
  Maximize: "maximize",
  Restore: "restore",
  Close: "close",
};

let out =
  "/* Locale-safe window controls — XP.css icons bind to English aria-label only. */\n";

for (const [label, control] of Object.entries(map)) {
  const patterns = [
    new RegExp(`button\\[aria-label=${label}\\][^{]*\\{[^}]+\\}`, "g"),
    new RegExp(`button\\[aria-label=${label}\\]:hover\\{[^}]+\\}`, "g"),
    new RegExp(
      `button\\[aria-label=${label}\\]:not\\(:disabled\\):active\\{[^}]+\\}`,
      "g"
    ),
  ];
  for (const re of patterns) {
    for (const match of css.matchAll(re)) {
      out +=
        match[0].replace(
          `button[aria-label=${label}]`,
          `button[data-control="${control}"]`
        ) + "\n";
    }
  }
}

fs.writeFileSync("src/window-controls.css", out);
console.log(`Wrote src/window-controls.css (${out.length} bytes)`);
