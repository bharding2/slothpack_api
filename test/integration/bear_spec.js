describe('bears', function() {
  it('should create a bear', function() {
    browser.get('http://localhost:5525');
    element.all(by.model('bear.name')).sendKeys('test bear');
    element(by.buttonText('Create Bear')).click();
    element(by.css('#bearslist li:last-child span')).getText().then(function(text) {
      expect(text).toEqual('test bear (gender: m) weighs 500 lbs and has a strength of 10');
    });
  });

  it('should edit a bear', function() {
    browser.get('http://localhost:5525');
    element(by.css('#bearslist li:last-child'))
      .element(by.buttonText('Edit')).click();
    element.all(by.model('bear.name')).clear().sendKeys('Rick');
    element(by.css('#bearslist li:last-child'))
      .element(by.buttonText('Update Bear')).click();
    element(by.css('#bearslist li:last-child span')).getText().then(function(text) {
      expect(text).toEqual('Rick (gender: m) weighs 500 lbs and has a strength of 10');
    });
  });

  it('should not edit a bear on cancel', function() {
    browser.get('http://localhost:5525');
    element(by.css('#bearslist li:last-child'))
      .element(by.buttonText('Edit')).click();
    element.all(by.model('bear.name')).clear().sendKeys('Other Rick');
    element(by.css('#bearslist li:last-child'))
      .element(by.buttonText('Cancel')).click();
    element(by.css('#bearslist li:last-child span')).getText().then(function(text) {
      expect(text).not.toEqual('Other Rick (gender: m) weighs 500 lbs and has a strength of 10');
    });
  });

  it('should delete a bear', function() {
    browser.get('http://localhost:5525');
    var beginLength = 0;
    var endLength = 0;
    element.all(by.css('#bearslist li')).count().then(function(count) {
      beginLength = count;
    });
    element(by.css('#bearslist li:last-child'))
      .element(by.buttonText('Delete Bear')).click();
    element.all(by.css('#bearslist li')).count().then(function(count) {
      endLength = count;
    });
    expect(endLength).not.toEqual(beginLength - 1);
  });
});
