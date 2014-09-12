'use strict';

var rewrite = require.resolve('./rewrite');

module.exports = function reset(src) {
  this.cacheable();
  return src;
};

module.exports.pitch = function(remainingRequest) {
  remainingRequest = remainingRequest.split('!');
  remainingRequest.shift();
  remainingRequest.unshift(rewrite);
  return "module.exports = require('!!" + remainingRequest.join('!') + "')";
}
