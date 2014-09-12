'use strict';

module.exports = function reset(src) {
  this.cacheable();
  return src;
};

module.exports.pitch = function(remainingRequest) {
  remainingRequest = remainingRequest.split('!');
  remainingRequest.shift();
  return "module.exports = require('!!" + remainingRequest.join('!') + "')";
}
