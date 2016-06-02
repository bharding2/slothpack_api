const Router = require('express').Router;
const async = require('async');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

const Sloth = require(__dirname + '/../models/sloth');
const Bear = require(__dirname + '/../models/bear');
const Slothbear = require(__dirname + '/../models/slothbear');
const handleErr = require(__dirname + '/../lib/handle_err');

var mateRouter = module.exports = Router();

mateRouter.get('/mate', jwtAuth, (req, res) => {
  var allSloths = [];
  var allBears = [];
  var randomSloth = {};
  var randomBear = {};

  function findSloth(callback) {
    Sloth.find(null, (err, data) => {
      if (err) return handleErr(err, res);
      allSloths = data;
      randomSloth = allSloths[Math.floor(Math.random() * allSloths.length)];
      callback(null);
    });
  }

  function findBear(callback) {
    Bear.find(null, (err, data) => {
      if (err) return handleErr(err, res);
      allBears = data;
      randomBear = allBears[Math.floor(Math.random() * allBears.length)];
      callback(null);
    });
  }

  async.series([findSloth, findBear], (err) => {
    if (err) return handleErr(err, res);
    if (!randomSloth || !randomBear) {
      return res.status(412).json({ msg: 'You need a sloth and a bear to mate' });
    }

    var newSlothbearName = randomSloth.name.slice(0, parseInt(randomSloth.name.length / 2, 10)) +
      randomBear.name.slice(parseInt(randomBear.name.length / 2, 10));
    var newSlothbearGender = 'f';
    if (Math.floor(Math.random() * 2) + 1 === 2) newSlothbearGender = 'm';
    var newSlothbearWeight = (randomSloth.weight + randomBear.weight) / 2;
    var newSlothbearStrength = (randomSloth.strength + randomBear.strength) / 2;

    var newSlothbear = new Slothbear({
      name: newSlothbearName,
      gender: newSlothbearGender,
      weight: newSlothbearWeight,
      strength: newSlothbearStrength,
      wranglerId: req.user._id,
      parents: [randomSloth.name, randomBear.name]
    });

    newSlothbear.save((err, data) => {
      if (err) return handleErr(err, res);
      Sloth.findByIdAndUpdate(randomSloth._id,
        { $push: { offspring: newSlothbear.name } }, (err) => {
          if (err) return err;
      });
      Bear.findByIdAndUpdate(randomBear._id,
        { $push: { offspring: newSlothbear.name } }, (err) => {
          if (err) return err;
      });
      res.status(200).json(data);
    });
  });
});
