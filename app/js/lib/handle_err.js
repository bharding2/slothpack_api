module.exports = function(err) {
  console.log(err);
  this.errs = (this.errs || []).push(err);
};
