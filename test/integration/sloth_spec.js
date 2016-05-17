describe('sloths', function() {
  it('should create a sloth', function() {
    browser.get('http://localhost:5525');
    element(by.model('slothsctrl.newSloth.name')).sendKeys('test sloth');
    element(by.id('createsloth')).click();
    element(by.css('#slothslist li:last-child span')).getText().then(function(text) {
      expect(text).toEqual('test sloth (gender: f) weighs 100 lbs and has a strength of 50');
    });
  });

  it('should edit a sloth', function() {
    browser.get('http://localhost:5525');
    element(by.css('#slothslist li:last-child'))
      .element(by.buttonText('Edit')).click();
    element(by.model('sloth.name')).clear().sendKeys('Rick');
    element(by.css('#slothslist li:last-child'))
      .element(by.buttonText('Update Sloth')).click();
    element(by.css('#slothslist li:last-child span')).getText().then(function(text) {
      expect(text).toEqual('Rick (gender: f) weighs 100 lbs and has a strength of 50');
    });
  });

  it('should not edit a sloth on cancel', function() {
    browser.get('http://localhost:5525');
    element(by.css('#slothslist li:last-child'))
      .element(by.buttonText('Edit')).click();
    element(by.model('sloth.name')).clear().sendKeys('Other Rick');
    element(by.css('#slothslist li:last-child'))
      .element(by.buttonText('Cancel')).click();
    element(by.css('#slothslist li:last-child span')).getText().then(function(text) {
      expect(text).not.toEqual('Other Rick (gender: f) weighs 100 lbs and has a strength of 50');
    });
  });

  it('should delete a sloth', function() {
    browser.get('http://localhost:5525');
    var beginLength = 0;
    var endLength = 0;
    element.all(by.css('#slothslist li')).count().then(function(count) {
      beginLength = count;
    });
    element(by.css('#slothslist li:last-child'))
      .element(by.buttonText('Delete Sloth')).click();
    element.all(by.css('#slothslist li')).count().then(function(count) {
      endLength = count;
    });
    expect(endLength).not.toEqual(beginLength - 1);
  });
});
