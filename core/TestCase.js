import assert from 'assert';

export class TestCase {
  constructor(name, fn, beforeEachHook, afterEachHook) {
    this.name = name;
    this.fn = fn;
    this.beforeEachHook = beforeEachHook;
    this.afterEachHook = afterEachHook;
  }

  async run() {
    const start = performance.now();

    try {
      if (this.beforeEachHook) await this.beforeEachHook();

      await this.fn(assert);

      const duration = (performance.now() - start).toFixed(2);
      console.log(`  ✅ ${this.name} (${duration}ms)`);

    } catch (err) {
      const duration = (performance.now() - start).toFixed(2);
      console.log(`  ❌ ${this.name} (${duration}ms)`);
      console.error(`     ${err.message}`);
    } finally {
      if (this.afterEachHook) await this.afterEachHook();
    }
  }
}