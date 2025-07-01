export class Suite {
  constructor(name, reporter) {
    this.name = name;
    this.tests = [];
    this.suites = [];
    this.beforeEachHook = null;
    this.afterEachHook = null;
    this.reporter = reporter;
  }

  addTest(test) {
    test.setHooks(this.beforeEachHook, this.afterEachHook);
    test.setReporter(this.reporter);
    this.tests.push(test);
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
    this.reporter.startSuite(this.name);

    for (const test of this.tests) {
      await test.run();
    }

    for (const suite of this.suites) {
      await suite.run();
    }

    this.reporter.endSuite();
  }
}