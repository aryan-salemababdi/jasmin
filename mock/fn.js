import { Spy } from './spy.js';

export function mockFn(fn = () => {}) {
  const spy = new Spy(fn);

  const wrapped = (...args) => {
    return spy.call(...args);
  };
 
  wrapped._spy = spy; // Attach the spy instance to the wrapped function

  return wrapped;
}