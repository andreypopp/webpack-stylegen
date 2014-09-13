'use strict';

var registry = [];

module.exports = {
  add: function(styles) {
    registry = registry.concat(styles);
  },
  get: function() {
    console.log('REGISTRY', registry.length);
    return registry;
  }
};
