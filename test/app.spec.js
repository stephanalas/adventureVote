const app = require('../server/app');

describe('App', () => {
  it('it exists', () => {
    expect(app.settings).toBeTruthy();
  });
});
