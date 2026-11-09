import fs from 'node:fs';
import path from 'node:path';
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
export function readJson(file) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
export function writeJson(file, data) { fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2)); }
export function appendLead(lead) {
  const leads = readJson('leads.json');
  leads.push({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...lead });
  writeJson('leads.json', leads);
  return lead;
}