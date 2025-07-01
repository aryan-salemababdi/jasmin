import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const watchDir = process.cwd();

console.log(`Watching for file changes in ${watchDir}`);

fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.js') || filename.endsWith('.ts'))) {
    console.log(`File changed: ${filename}, re-running tests...`);
    exec('npm run jasmin', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running tests: ${error.message}`);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
  }
});