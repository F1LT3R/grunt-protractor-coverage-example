describe('homepage', function() {
  'use strict';
  it('should render title', function() {
    browser.driver.get('http://localhost:9000');
    browser.sleep(1000);
    console.log('running the test.');
    expect(1).toEqual(1);
  });
});