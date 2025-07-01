import { Suite } from './Suite.js';

export class Jasmin {
  constructor() {
    this.rootSuite = new Suite('Root Suite');
  }

  describe(name, fn) {
    const suite = new Suite(name);
    this.rootSuite.addSuite(suite);
    suite.execute(fn);
  }

  test(name, fn) {
    this.rootSuite.addTest(name, fn);
  }

  beforeEach(fn) {
    this.rootSuite.setBeforeEach(fn);
  }

  afterEach(fn) {
    this.rootSuite.setAfterEach(fn);
  }

  async run() {
    await this.rootSuite.run();
  }
}