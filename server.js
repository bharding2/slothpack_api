const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5555;
const bearsRouter = require(__dirname + '/routes/bears_router');
const slothsRouter = require(__dirname + '/routes/sloths_router');
const slothbearsRouter = require(__dirname + '/routes/slothbears_router');
const mateRouter = require(__dirname + '/routes/mate_router');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/slothbearDB');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');

  next();
});

app.use('/api', bearsRouter);
app.use('/api', slothsRouter);
app.use('/api', slothbearsRouter);
app.use('/api', mateRouter);

module.exports = exports = app.listen(PORT, () => console.log('server up on port: ' + PORT));
