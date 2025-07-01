import { TestCase } from './TestCase.js';

export class Suite {
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.suites = [];
    this.beforeEachHook = null;
    this.afterEachHook = null;
  }

  addTest(name, fn) {
    this.tests.push(new TestCase(name, fn, this.beforeEachHook, this.afterEachHook));
  }

  addSuite(suite) {
    this.suites.push(suite);
  }

  setBeforeEach(fn) {
    this.beforeEachHook = fn;
  }

  setAfterEach(fn) {
    this.afterEachHook = fn;
  }

  execute(fn) {
    fn();
  }

  async run() {
    console.log(`\n📦 Suite: ${this.name}`);
    for (const test of this.tests) {
      await test.run();
    }
    for (const suite of this.suites) {
      await suite.run();
    }
  }
}