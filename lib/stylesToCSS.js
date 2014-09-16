'use strict';

var invariant = require('react/lib/invariant');
var merge     = require('react/lib/merge');
var mergeInto = require('react/lib/mergeInto');
var Style     = require('./Style');

/**
 * A list of children style names to be compiled as pseudo-selectors.
 */
var pseudoSelectors = {
  onActive: ':active',
  onHover: ':hover',
  onFocus: ':focus',
  onChecked: ':checked',
  onEnabled: ':enabled',
  onDisabled: ':disabled',

  pseudoChildren: ' > *',
  pseudoLastChild: ':last-child',
  pseudoFirstChild: ':first-child',
  pseudoNotLastChild: ':not(:last-child)',
  pseudoNotFirstChild: ':not(:first-child)',
  pseudoFirstOfType: ':first-of-type',
  pseudoLastOfType: ':last-of-type',
};

var _uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;

/**
 * Convert DOM style (camel cased) prop to CSS style (hyphenated).
 *
 * @copyright Cheng Lou and RCSS contributors
 * @license MIT
 */
function hyphenateProp(string) {
  // MozTransition -> -moz-transition
  // msTransition -> -ms-transition. Notice the lower case m
  // http://modernizr.com/docs/#prefixed
  // thanks a lot IE
  return string.replace(_uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}

function buildRules(result, rules, selector) {
  if (Object.keys(rules).length === 0) {
    return result;
  }

  result.css += selector + ' {\n';
  for (var styleKey in rules) {
    if (!rules.hasOwnProperty(styleKey)) {
      continue;
    }
    var value = rules[styleKey];
    if (typeof value.toCSS === 'function') {
      value = value.toCSS();
    }
    // TODO: escape value
    result.css += '  ' + hyphenateProp(styleKey) + ': ' + value + ';\n';
  }
  result.css += '}\n';

  return result;
}

function replicateSelector(s) {
  return [
    s,
    s + (s + 1),
    s + (s + 1) + (s + 2),
    s + (s + 1) + (s + 2) + (s + 3),
    s + (s + 1) + (s + 2) + (s + 3) + (s + 4),
    s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5),
    s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5) + (s + 6),
    s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5) + (s + 6) + (s + 7),
    s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5) + (s + 6) + (s + 7) + (s + 9)
  ].join(',');
}

function buildStyle(result, style, selector) {
  if (!style.className) {
    return result;
  }

  if (!selector && result.classNames[style.className]) {
    return result;
  }

  if (!selector) {
    result.classNames[style.className] = true;
    selector = replicateSelector('.' + style.className);
  }

  buildRules(result, style.style, selector);

  if (style.children) {
    for (var childKey in style.children) {
      if (!style.children.hasOwnProperty(childKey)) {
        continue;
      }
      var child = style.children[childKey];
      var childResult;
      if (pseudoSelectors[childKey]) {
        childKey = pseudoSelectors[childKey];
        var childSelector = selector.split(',').map(function(sel) { return sel + childKey });
        childResult = buildStyle(result, child, childSelector);
      } else {
        childResult = buildStyle(result, child);
      }
    }
  }

  return result;
}

function stylesToCSS(styles) {
  if (!Array.isArray(styles)) {
    styles = [styles];
  }

  var result = {css: '', classNames: {}};
  for (var i = 0, len = styles.length; i < len; i++) {
    buildStyle(result, styles[i]);
  }
  return result;
}

module.exports = stylesToCSS;
