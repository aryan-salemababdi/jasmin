import { Expect } from './expect.js'
import { builtInMatchers } from './builtInMatchers.js';
Expect.extend(builtInMatchers);

export function expect(received) {
  return new Expect(received);
}