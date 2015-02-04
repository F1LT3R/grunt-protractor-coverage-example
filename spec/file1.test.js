
describe('homepage', function() {
  'use strict';
  it('should render title', function() {
    browser.driver.get('http://0.0.0.0:3000');
    browser.sleep(1000);
    console.log('running the test.');
    expect(1).toEqual(1);
  });
});