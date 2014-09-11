var ReactStyle = 1;
require('./dep-with-style');
var dep = require('./dep');
module.exports = 'example has ' + dep;
