const chai = require('chai');
const expect = chai.expect;
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');

const User = require(__dirname + '/../models/user');

describe('user find hash', () => {
  before((done) => {
    setup(done);
  });

  after((done) => {
    teardown(done);
  });

  before(function(done) {
    var newUser = new User({ username: 'test6', password: 'test6' });
    newUser.save((err, data) => {
      if (err) throw err;
      this.user = data;
      done();
    });
  });

  it('should create a new random hash', function(done) {
    this.user.generateFindHash((err, hash) => {
      expect(err).to.eql(null);
      expect(hash.length).to.not.eql(0);
      expect(hash).to.eql(this.user.findHash);
      done();
    });
  });
});
