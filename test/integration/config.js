module.exports = exports = {
  config: {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['bear_spec.js', 'sloth_spec.js', 'slothbear_spec.js'],
    onPrepare: function() {
      require('babel-core/register');
    }
  }
};
