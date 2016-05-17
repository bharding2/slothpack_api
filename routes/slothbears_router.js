const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Slothbear = require(__dirname + '/../models/slothbear');
const handleErr = require(__dirname + '/../lib/handle_err');

var slothbearsRouter = module.exports = Router();

slothbearsRouter.get('/slothbears', (req, res) => {
  Slothbear.find(null, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

slothbearsRouter.get('/slothbears/:id', (req, res) => {
  Slothbear.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

slothbearsRouter.put('/slothbears/:id', bodyParser, (req, res) => {
  Slothbear.update({ _id: req.params.id }, req.body, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'slothbear updated' });
  });
});

slothbearsRouter.delete('/slothbears/:id', (req, res) => {
  Slothbear.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'slothbear deleted' });
  });
});
