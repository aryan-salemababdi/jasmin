import { parentPort, workerData } from 'node:worker_threads';
import { Expect } from '../../matchers/expect.js';

const { name, fnString, filePath } = workerData;

const expect = (value) =>
  new Expect(value, false, {
    testName: name,
    filePath,
  });

(async () => {
  try {
    const fn = eval(`(${fnString})`);
    await fn(expect);
    parentPort.postMessage({
      status: 'passed',
      coverage: global.__coverage__ || null,
    });
  } catch (err) {
    parentPort.postMessage({
      status: 'failed',
      error: err.message,
      coverage: global.__coverage__ || null,
    });
  }
})();