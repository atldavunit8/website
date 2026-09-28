// One-time helper: adds a `programme:` line to award files so the Awards page can group them.
// Run from the project root:  node scripts/add-programmes.mjs
// Awards not listed here are shown under "Other competitions".
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const CBSE = 'CBSE Science Exhibition & Fair';
const MANAK = 'INSPIRE MANAK';
const DAV = 'DAV School Science Fairs';
const NCSC = 'National Children’s Science Congress';
const BMC = 'BMC Science Exhibition';
const OUAT = 'OUAT Science Fair';
const ISEF = 'Regeneron ISEF';
const VIVO = 'Vivo Ignite';

const map = {
  'charge-pole-cbse-state': CBSE,
  'charged-pole-cbse-national-qualification': CBSE,
  'guyneo-cbse-national-representation': CBSE,
  'guyneo-cbse-regional-winner': CBSE,
  'hydrosense-cbse-national-qualification': CBSE,
  'hydrosense-cbse-regional-2025-26': CBSE,
  'tasar-cocoon-machine-cbse-national-winner': CBSE,
  'charged-pole-ai-readiness-top-200': MANAK,
  'charged-pole-inspire-manak-selection': MANAK,
  'guyneo-inspire-manak-district-cash-award-1': MANAK,
  'guyneo-inspire-manak-district-cash-award-2': MANAK,
  'mushroom-inspire-state': MANAK,
  'mushroom-machine-inspire-bronze': MANAK,
  'charged-pole-inter-dav-winner': DAV,
  'fertilizer-dav-unit8-third-prize': DAV,
  'guyneo-dav-unit8-science-winner': DAV,
  'fertilizer-district-selection': NCSC,
  'fertilizer-national-childrens-science-congress-selection': NCSC,
  'charged-pole-block-exhibition-second': BMC,
  'fertilizer-bmc-first-prize': BMC,
  'fertilizer-ouat-runner-up': OUAT,
  'guyneo-ouat-honorary-recognition': OUAT,
  'seriscope-isef-2026-zydus-special-award': ISEF,
  'seriscope-team-india-isef-2026-selection': ISEF,
  'mushroom-machine-vivo-ignite-third': VIVO,
  'braille-machine-vivo-ignite-top-200': VIVO,
};

let changed = 0;
for (const [name, programme] of Object.entries(map)) {
  const path = `src/content/awards/${name}.md`;
  if (!existsSync(path)) { console.log(`skip (file not found): ${name}`); continue; }
  const text = readFileSync(path, 'utf8');
  if (/^programme:/m.test(text)) continue;
  const line = `programme: "${programme}"\n`;
  const out = /^publishStatus:/m.test(text) ? text.replace(/^publishStatus:/m, `${line}publishStatus:`) : text.replace(/\n---\n/, `\n${line}---\n`);
  writeFileSync(path, out);
  changed += 1;
}
console.log(`Added programme to ${changed} award file(s).`);