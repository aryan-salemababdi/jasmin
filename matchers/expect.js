export class Expect {
  constructor(received, isNegated = false) {
    this.received = received;
    this.isNegated = isNegated;
  }

  get not() {
    return new Expect(this.received, !this.isNegated);
  }

  _pass(condition, failMessage) {
    if (this.isNegated ? condition : !condition) {
      throw new Error(
        this.isNegated
          ? `Expected NOT: ${failMessage}`
          : failMessage
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
    this._pass(
      a === b,
      `Expected ${a} to equal ${b}`
    );
  }

  toContain(expected) {
    const list = this.received;
    const contains = Array.isArray(list) && list.includes(expected);
    this._pass(contains, `Expected ${JSON.stringify(list)} to contain ${expected}`);
  }

  toThrow(expectedMessage) {
    if (typeof this.received !== 'function') {
      throw new Error('Expected a function to test .toThrow');
    }

    try {
      this.received();
    } catch (err) {
      if (!expectedMessage || err.message.includes(expectedMessage)) return;
      else throw new Error(`Expected error message to include "${expectedMessage}" but got "${err.message}"`);
    }

    throw new Error('Expected function to throw an error, but it didn’t');
  }
}