import { parentPort, workerData } from 'node:worker_threads';
import { expect } from '../../matchers/matches.js';

// دریافت دیتای تست از والد
const { name, fnString } = workerData;

const runTest = async () => {
  try {
    const fn = eval(`(${fnString})`);
    await fn(expect);
    parentPort.postMessage({ status: 'passed', name });
  } catch (err) {
    parentPort.postMessage({ status: 'failed', name, error: err.message });
  }
};

runTest();