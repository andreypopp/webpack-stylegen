'use strict';

var alphaid = require('alpha-id');
var index = 0;

alphaid.options.index = 'abcdefghijklmnopqrstuvxzABCDEFGHIJKLMNOPQRSTUVXZ';

function generateClassName() {
  index += 1;
  return alphaid.encode(index);
}

module.exports = generateClassName;
