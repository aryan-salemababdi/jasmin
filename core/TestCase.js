import assert from 'assert';

export class TestCase {
  constructor(name, fn, beforeEachHook, afterEachHook) {
    this.name = name;
    this.fn = fn;
    this.beforeEachHook = beforeEachHook;
    this.afterEachHook = afterEachHook;
  }

  async run() {
    try {
      if (this.beforeEachHook) await this.beforeEachHook();
      await this.fn(assert); // assert اصلی Node به عنوان ورودی
      console.log(`  ✅ ${this.name}`);
    } catch (err) {
      console.log(`  ❌ ${this.name}`);
      console.error(`     ${err.message}`);
    } finally {
      if (this.afterEachHook) await this.afterEachHook();
    }
  }
}