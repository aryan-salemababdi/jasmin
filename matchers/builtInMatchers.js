export const builtInMatchers = {
  toHaveBeenCalled(received) {
    const spy = received._spy;
    const pass = spy?.callCount > 0;
    return {
      pass,
      message: pass
        ? 'Expected mock NOT to have been called'
        : 'Expected mock to have been called'
    };
  },

  toHaveBeenCalledTimes(received, times) {
    const spy = received._spy;
    const pass = spy?.callCount === times;
    return {
      pass,
      message: pass
        ? `Expected mock NOT to be called ${times} times`
        : `Expected mock to be called ${times} times, but was called ${spy.callCount}`
    };
  },

  toHaveBeenCalledWith(received, ...args) {
    const spy = received._spy;
    const match = spy?.calls.some((call) =>
      JSON.stringify(call) === JSON.stringify(args)
    );

    return {
      pass: match,
      message: match
        ? `Expected mock NOT to be called with ${JSON.stringify(args)}`
        : `Expected mock to be called with ${JSON.stringify(args)}`
    };
  },

  toHaveReturnedWith(received, expected) {
    const spy = received._spy;
    const match = spy?.returns.includes(expected);
    return {
      pass: match,
      message: match
        ? `Expected mock NOT to return ${expected}`
        : `Expected mock to return ${expected}`
    };
  }
};