import { Jasmin } from './core/Jasmin.js';
import { Expect } from './matchers/expect.js';

Expect.extend({
  toBeGreaterThan(received, expected) {
    const pass = received > expected;
    return {
      pass,
      message: pass
        ? `Expected ${received} not to be greater than ${expected}`
        : `Expected ${received} to be greater than ${expected}`,
    };
  }
});

const j = new Jasmin();

j.describe('Parallel Suite', () => {
  j.test('Fast test', (expect) => {
    expect(1 + 1).toBe(2);
  });

  j.test('Slow test', async (expect) => {
    await new Promise((res) => setTimeout(res, 500));
    expect(true).toBe(true);
  });

  j.test('Fail test', (expect) => {
    expect(1).toBe(2);
  });
});

await j.run();