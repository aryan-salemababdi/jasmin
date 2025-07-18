import { Worker } from "node:worker_threads";
import { coverageCollector } from '../core/coverage/globalCollector.js';
import path from "path";
import { performance } from "node:perf_hooks";

export class TestCase {
  constructor(name, fn, options = {}) {
    this.name = name;
    this.fn = fn;
    this.skipped = options.skip || false;
    this.reporter = null;
    this.beforeEachHook = null;
    this.afterEachHook = null;
    this.filePath = options.filePath || "unknown.test.js"; // ✅ جدید
  }

  setHooks(beforeEach, afterEach) {
    this.beforeEachHook = beforeEach;
    this.afterEachHook = afterEach;
  }

  setReporter(reporter) {
    this.reporter = reporter;
  }

async run() {
  if (this.skipped) {
    this.reporter.logSkipped(this.name);
    return;
  }

  const start = performance.now();

  try {
    // اجرای beforeEach تو در همین thread (main thread)
    if (this.beforeEachHook) {
      console.log('🧼 Running before each test');
      await this.beforeEachHook();
    }

    // اجرای خود تست در Worker
    const result = await this.runInWorker();

    const duration = (performance.now() - start).toFixed(2);
    if (result.status === "passed") {
      if (duration > 100) {
        this.reporter.logSlow(this.name, duration);
      } else {
        this.reporter.logSuccess(this.name, duration);
      }
    } else {
      this.reporter.logFailure(this.name, duration, {
        message: result.error,
      });
    }
  } catch (err) {
    const duration = (performance.now() - start).toFixed(2);
    this.reporter.logFailure(this.name, duration, err);
  } finally {
    // اجرای afterEach تو در همین thread (main thread)
    if (this.afterEachHook) {
      console.log('🧼 Finished a test');
      await this.afterEachHook();
    }
  }
}

  

runInWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.resolve("core/workerRunner/workerRunner.js"),
      {
        workerData: {
          name: this.name,
          fnString: this.fn.toString(),
          filePath: this.filePath || "unknown.test.js",
        },
      }
    );

    worker.on("message", (result) => {
      if (result.coverage) {
        coverageCollector.addCoverage(result.coverage);
      }
      resolve(result);
    });

    worker.on("error", reject);

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with code ${code}`));
      }
    });
  });
}
}
