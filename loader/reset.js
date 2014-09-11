module.exports = function reset(src) {
  this.cacheable();
  return src;
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  remainingRequest = remainingRequest.split('!');
  remainingRequest.shift();
  return "module.exports = require('!!" + remainingRequest.join('!') + "')";
}
