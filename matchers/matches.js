import { Expect } from './expect.js'

export function expect(received) {
  return new Expect(received);
}