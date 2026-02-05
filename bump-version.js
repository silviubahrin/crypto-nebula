import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const versionPath = path.join(__dirname, 'src/version.ts');

const content = fs.readFileSync(versionPath, 'utf8');
const match = content.match(/APP_VERSION = "(\d+\.\d+\.\d+)";/);

if (match) {
  const currentVersion = match[1];
  const parts = currentVersion.split('.').map(Number);
  
  // Randomly increment patch or minor
  if (Math.random() > 0.7) {
    parts[1]++; // Minor bump
    parts[2] = 0;
  } else {
    parts[2]++; // Patch bump
  }

  const newVersion = parts.join('.');
  const newContent = `export const APP_VERSION = "${newVersion}";\nexport const BUILD_ID = "${Date.now().toString(36).toUpperCase()}";\n`;

  fs.writeFileSync(versionPath, newContent);
  console.log(`Bumping version: ${currentVersion} -> ${newVersion}`);
} else {
  console.error("Could not find version string");
  process.exit(1);
}
