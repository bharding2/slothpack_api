const express = require('express');
const PORT = process.env.BUILD_PORT || 5575;

var server = express().use(express.static(__dirname + '/build'));

server.get('*', (req, res) => {
  res.redirect('/#' + req.url);
});

module.exports = exports = server.listen(PORT, () => console.log('Build port up'));
