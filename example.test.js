import { Jasmin } from './core/Jasmin.js';

const j = new Jasmin();

j.beforeEach(() => {
  console.log('🧼 Running before each test');
});

j.afterEach(() => {
  console.log('🧼 Finished a test');
});

j.describe('Math Suite', () => {
  j.test('should add numbers', () => {
    const result = 2 + 2;
    if (result !== 4) throw new Error('Addition failed');
  });

  j.only('should only run this test', () => {
    const str = 'jasmin';
    if (!str.includes('jas')) throw new Error('Substring check failed');
  });

  j.skip('should be skipped', () => {
    throw new Error('Should not run');
  });
});

await j.run();