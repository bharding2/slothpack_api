const express = require('express');
const PORT = process.env.BUILD_PORT || 5575;

var server = express().use(express.static(__dirname + '/build'));

module.exports = exports = server.listen(PORT, () => console.log('Build port up'));
