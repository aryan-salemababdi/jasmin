import path from 'path';
import fs from 'fs';

const testFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.test.js'));

for (const file of testFiles) {
  const modulePath = path.resolve(process.cwd(), file);
  await import(modulePath);
}