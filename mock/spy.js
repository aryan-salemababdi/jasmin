export class Spy {
  constructor(fn = () => {}) {
    this.fn = fn;
    this.calls = [];
    this.returns = [];
  }

  get callCount() {
    return this.calls.length;
  }

  call(...args) {
    this.calls.push(args);
    const result = this.fn(...args);
    this.returns.push(result);
    return result;
  }

  reset() {
    this.calls = [];
    this.returns = [];
  }

  getCalls() {
    return this.calls;
  }

  getReturns() {
    return this.returns;
  }
}