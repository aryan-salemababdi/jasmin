import { Jasmin } from './core/Jasmin.js';

const j = new Jasmin();

j.beforeEach(() => {
  console.log('🧹 Setup before each test');
});

j.afterEach(() => {
  console.log('🧹 Cleanup after each test');
});

j.describe('Math Operations', () => {
  j.test('adds two numbers', (assert) => {
    assert.strictEqual(1 + 2, 3);
  });

  j.test('subtracts numbers', (assert) => {
    assert.strictEqual(5 - 2, 3);
  });
});

await j.run();