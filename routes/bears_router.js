const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Bear = require(__dirname + '/../models/bear');
const handleErr = require(__dirname + '/../lib/handle_err');

var bearsRouter = module.exports = Router();

bearsRouter.post('/bears', bodyParser, (req, res) => {
  var newBear = new Bear(req.body);
  newBear.save((err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.get('/bears', (req, res) => {
  Bear.find(null, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.get('/bears/:id', (req, res) => {
  Bear.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.put('/bears/:id', bodyParser, (req, res) => {
  var bearData = req.body;
  delete bearData._id;
  Bear.update({ _id: req.params.id }, bearData, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'bear updated' });
  });
});

bearsRouter.delete('/bears/:id', (req, res) => {
  Bear.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'bear deleted' });
  });
});
