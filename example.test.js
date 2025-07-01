import { Jasmin } from './core/Jasmin.js';

const j = new Jasmin();

j.describe('Matchers Suite', () => {
  j.test('expect().toBe()', (expect) => {
    expect(3 + 2).toBe(5);
  });

  j.test('expect().not.toEqual()', (expect) => {
    expect({ x: 1 }).not.toEqual({ x: 2 });
  });

  j.test('expect().toThrow()', (expect) => {
    expect(() => {
      throw new Error('Boom');
    }).toThrow('Boom');
  });
});
await j.run();