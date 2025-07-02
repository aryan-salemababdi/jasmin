import { Jasmin } from './core/Jasmin.js';

const j = new Jasmin();

j.describe('Parallel Snapshot Suite', () => {
  j.test('snapshot test 1', (expect) => {
    const user = { id: 1, name: 'Aryan' };
    expect(user).toMatchSnapshot();
  });

  j.test('snapshot test 2', (expect) => {
    const html = '<div class="title">Hello World</div>';
    expect(html).toMatchSnapshot();
  });
});

await j.run();