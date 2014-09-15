'use strict';

var invariant = require('react/lib/invariant');

var pseudoSelectors = {
  onActive: ':active',
  onHover: ':hover',
  onFocus: ':focus',
  onChecked: ':checked',
  onEnabled: ':enabled',
  onDisabled: ':disabled',
  children: ' > *',
  lastChild: ':last-child',
  firstChild: ':first-child',
  notLastChild: ':not(:last-child)',
  notFirstChild: ':not(:first-child)',
  firstOfType: ':first-of-type',
  lastOfType: ':last-of-type',
};

function buildCSS() {
  var buffer          = '';
  var path            = [];
  var currSelector    = null;
  var lastSelector    = null;
  var b               = {};
  var frozen          = false;

  function _append(str) {
    buffer += str;
  };

  function attrib(name, value) {
    frozen && throwFrozen();
    append(currSelector, translateKey(name) + ': ' + value);
    return this;
  }

  function attribs(as) {
    frozen && throwFrozen();
    for (var k in as) {
      b.attrib(k, as[k]);
    }
    return this;
  }

  function rule(selector, rs) {
    frozen && throwFrozen();

    if (Array.isArray(rs)) {
      rs.forEach(function(r) { b.rule(selector, r); });
      return;
    }

    var oldSelector = currSelector;
    path.push(selector);
    currSelector = path.join('').replace(/\s+\&/g, '');

    if (typeof rs === 'string') {
      append(currSelector, rs);
    } else if (typeof rs === 'function') {
      rs.call(b, b);
    } else if (typeof rs === 'object') {
      for (var cssKey in rs) {
        var cssValue = rs[cssKey];
        if (typeof cssValue === 'object') {
          cssKey = cssKey.trim();
          invariant(
            cssKey[0] !== ':' && cssKey[0] !== '>',
            'nested style declarations are not allowed, got: %s', cssKey
          );
          cssKey = pseudoSelectors[cssKey] || cssKey;
          b.rule(cssKey, cssValue);
        } else {
          b.attrib(cssKey, cssValue);
        }
      }
    } else {
      throw new TypeError("rule must be string, function or object");
    }

    path.pop();
    currSelector = oldSelector;

    return this;

  }

  function rules(rs) {
    for (var k in rs) {
      b.rule(k, rs[k]);
    }
  }

  function append(sel, css) {
    if (lastSelector === sel) {
      _append(' ' + css + ';');
    } else {
      if (lastSelector !== null) {
        _append(" }\n");
      }
      _append(sel + ' { ' + css + ';');
      lastSelector = sel;
    }
  }

  function commit() {
    if (!frozen) {
      if (lastSelector) {
        _append(" }\n");
      }
      frozen = true;
    }
  }

  function translateKey(k) {
    k = k.replace(/[A-Z]/g, function(m) {
      return '-' + m[0].toLowerCase();
    });

    if (k.match(/^(webkit|moz|ms|o|khtml)-/)) {
      k = '-' + k;
    }

    return k;
  }

  function throwFrozen() {
    throw new Error("can't modify CSS builder - is frozen");
  }

  b.attrib        = attrib;
  b.attribs       = attribs;
  b.rule          = rule;
  b.rules         = rules;
  b.commit        = commit;
  b.toString      = function() { commit(); return buffer; }

  return b;

}

module.exports = buildCSS;
