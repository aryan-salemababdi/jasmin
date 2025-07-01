import { SnapshotManager } from '../snapshot/snapshotManager.js';

export class Expect {
  static customMatchers = {};

  constructor(received, isNegated = false, testMeta = null) {
    this.received = received;
    this.isNegated = isNegated;
    this.testMeta = testMeta; // { testName, filePath }
  }

  get not() {
    return new Expect(this.received, !this.isNegated, this.testMeta);
  }

  _pass(condition, failMessage) {
    if (this.isNegated ? condition : !condition) {
      throw new Error(
        this.isNegated ? `Expected NOT: ${failMessage}` : failMessage
      );
    }
  }

  toBe(expected) {
    this._pass(
      this.received === expected,
      `Expected ${this.received} to be ${expected}`
    );
  }

  toEqual(expected) {
    const a = JSON.stringify(this.received);
    const b = JSON.stringify(expected);
    this._pass(a === b, `Expected ${a} to equal ${b}`);
  }

  toContain(expected) {
    const list = this.received;
    const contains = Array.isArray(list) && list.includes(expected);
    this._pass(
      contains,
      `Expected ${JSON.stringify(list)} to contain ${expected}`
    );
  }

  toThrow(expectedMessage) {
    if (typeof this.received !== 'function') {
      throw new Error('Expected a function to test .toThrow');
    }

    try {
      this.received();
    } catch (err) {
      if (!expectedMessage || err.message.includes(expectedMessage)) return;
      else {
        throw new Error(
          `Expected error message to include "${expectedMessage}" but got "${err.message}"`
        );
      }
    }

    throw new Error('Expected function to throw an error, but it didn’t');
  }

  runCustomMatcher(name, ...args) {
    const matcherFn = Expect.customMatchers[name];
    if (!matcherFn) {
      throw new Error(`Matcher ${name} not found`);
    }

    const result = matcherFn(this.received, ...args);
    const pass = result.pass;
    const message = result.message;

    this._pass(pass, message);
  }

  toMatchSnapshot() {
    if (!this.testMeta) {
      throw new Error('Snapshot testing requires test metadata (filePath & testName)');
    }

    const manager = new SnapshotManager(this.testMeta.filePath);

    const serialized = typeof this.received === 'string'
      ? this.received
      : JSON.stringify(this.received, null, 2);

    const result = manager.compareSnapshot(this.testMeta.testName, serialized);
    manager.persist();

    if (!result.match) {
      const msg = result.new
        ? '🆕 Snapshot created'
        : '❌ Snapshot mismatch!';
      throw new Error(msg);
    }
  }
}

Expect.extend = function (matchers) {
  for (const name in matchers) {
    if (typeof matchers[name] !== 'function') {
      throw new Error(`Matcher ${name} must be a function`);
    }

    Expect.customMatchers[name] = matchers[name];
    Expect.prototype[name] = function (...args) {
      return this.runCustomMatcher(name, ...args);
    };
  }
};