'use strict';

var registry = require.resolve('../lib/registry');

module.exports = function styleEntry(src) {
  this && this.cacheable && this.cacheable();
  return [
    src,
    'module.exports = require(' + JSON.stringify('-!' + registry) + ').get();'
  ].join('\n');
};

module.exports.pitch = function styleEntryPitch(remainingRequest) {
  return;
  this && this.cacheable && this.cacheable();
  return [
    'require(' + JSON.stringify('-!' + remainingRequest) + ');',
    'module.exports = require(' + JSON.stringify('-!' + registry) + ').get();'
  ].join('\n');
};
