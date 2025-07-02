import path from 'path';
import fs from 'fs';
import pkg from 'istanbul-api';
import { coverageCollector } from '../core/coverage/globalCollector.js';
const { createReporter } = pkg;


async function runTests() {
  const testFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.test.js'));

  for (const file of testFiles) {
    const modulePath = path.resolve(process.cwd(), file);
    await import(modulePath);
  }
  const reporter = createReporter();

  reporter.addAll(['text', 'html']);

  reporter.write(coverageCollector.getCoverageMap());
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});