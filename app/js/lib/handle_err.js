module.exports = function(res) {
  console.log(res);
  this.errors.push(new Error('server error'));
};
