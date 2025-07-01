import { Suite } from './Suite.js';
import { TestCase } from './TestCase.js';
import { DefaultReporter } from '../reporters/defaultReporter.js';

export class Jasmin {
  constructor() {
    this.reporter = new DefaultReporter();
    this.rootSuite = new Suite('Root Suite', this.reporter);
    this.onlyTests = [];
  }

  describe(name, fn) {
    const suite = new Suite(name, this.reporter);
    this.rootSuite.addSuite(suite);
    suite.execute(fn);
  }

  test(name, fn) {
    this.rootSuite.addTest(new TestCase(name, fn));
  }

  only(name, fn) {
    this.onlyTests.push(new TestCase(name, fn));
  }

  skip(name, fn) {
    this.rootSuite.addTest(new TestCase(name, fn, { skip: true }));
  }

  beforeEach(fn) {
    this.rootSuite.setBeforeEach(fn);
  }

  afterEach(fn) {
    this.rootSuite.setAfterEach(fn);
  }

  async run() {
    if (this.onlyTests.length > 0) {
      this.onlyTests.forEach(t => t.setReporter(this.reporter));
      this.rootSuite.tests = this.onlyTests;
    }

    await this.rootSuite.run();
  }
}