describe('slothbears', function() {
  it('should create a slothbear', function() {
    browser.get('http://localhost:5525');
    element.all(by.model('bear.name')).sendKeys('Joe');
    element(by.buttonText('Create Bear')).click();
    element.all(by.model('sloth.name')).sendKeys('Sara');
    element(by.buttonText('Create Sloth')).click();
    var beginLength = 0;
    var endLength = 0;
    element.all(by.css('#slothbearslist li')).count().then(function(count) {
      beginLength = count;
    });
    element(by.buttonText('Make a Slothbear')).click();
    element.all(by.css('#slothbearslist li')).count().then(function(count) {
      endLength = count;
    });
    expect(endLength).not.toEqual(beginLength + 1);
    element(by.css('#bearslist li:last-child'))
      .element(by.buttonText('Delete Bear')).click();
    element(by.css('#slothslist li:last-child'))
      .element(by.buttonText('Delete Sloth')).click();
  });

  it('should edit a slothbear', function() {
    browser.get('http://localhost:5525');
    var beforeText = '';
    element(by.css('#slothbearslist li:last-child span')).getText().then(function(text) {
      beforeText = text;
    });
    element(by.css('#slothbearslist li:last-child'))
      .element(by.buttonText('Edit')).click();
    element(by.model('slothbear.name')).clear().sendKeys('Rick');
    element(by.css('#slothbearslist li:last-child'))
      .element(by.buttonText('Update Slothbear')).click();
    element(by.css('#slothbearslist li:last-child span')).getText().then(function(text) {
      expect(text).not.toEqual(beforeText);
    });
  });

  it('should not edit a slothbear on cancel', function() {
    browser.get('http://localhost:5525');
    var beforeText = '';
    element(by.css('#slothbearslist li:last-child span')).getText().then(function(text) {
      beforeText = text;
    });
    element(by.css('#slothbearslist li:last-child'))
      .element(by.buttonText('Edit')).click();
    element(by.model('slothbear.name')).clear().sendKeys('Other Rick');
    element(by.css('#slothbearslist li:last-child'))
      .element(by.buttonText('Cancel')).click();
    element(by.css('#slothbearslist li:last-child span')).getText().then(function(text) {
      expect(text).toEqual(beforeText);
    });
  });

  it('should delete a slothbear', function() {
    browser.get('http://localhost:5525');
    var beginLength = 0;
    var endLength = 0;
    element.all(by.css('#slothbearslist li')).count().then(function(count) {
      beginLength = count;
    });
    element(by.css('#slothbearslist li:last-child'))
      .element(by.buttonText('Delete Slothbear')).click();
    element.all(by.css('#slothbearslist li')).count().then(function(count) {
      endLength = count;
    });
    expect(endLength).not.toEqual(beginLength - 1);
  });
});
