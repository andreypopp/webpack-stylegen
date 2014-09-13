var React = require('react');
var ReactStyle = 1;
var x;
var dep = require('./dep');
module.exports = [].concat(
  [[module.id, 'example has: ' + dep, '']],
  require('./dep-with-style')
);
