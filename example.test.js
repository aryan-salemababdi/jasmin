// example.test.js
import { Jasmin } from './core/Jasmin.js';
import { mockFn } from './mock/fn.js';
import { Expect } from './matchers/expect.js';
import { builtInMatchers } from './matchers/builtInMatchers.js';

Expect.extend(builtInMatchers);

const j = new Jasmin();

j.describe('Mock Function Suite', () => {
  j.test('mock should work correctly', (expect) => {
    const mock = mockFn((x) => x + 2);
    mock(1);
    mock(2);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveReturnedWith(4);
  });
});

await j.run();