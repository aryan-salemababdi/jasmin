import { performance } from 'node:perf_hooks';

export class TestCase {
  constructor(name, fn, options = {}) {
    this.name = name;
    this.fn = fn;
    this.beforeEachHook = null;
    this.afterEachHook = null;
    this.skipped = options.skip || false;
    this.reporter = null;
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
      if (this.beforeEachHook) await this.beforeEachHook();

      const expect = await import('../matchers/matches.js'); 
      await this.fn(expect.expect);

      const duration = (performance.now() - start).toFixed(2);

      if (duration > 100) {
        this.reporter.logSlow(this.name, duration);
      } else {
        this.reporter.logSuccess(this.name, duration);
      }
    } catch (err) {
      const duration = (performance.now() - start).toFixed(2);
      this.reporter.logFailure(this.name, duration, err);
    } finally {
      if (this.afterEachHook) await this.afterEachHook();
    }
  }
}