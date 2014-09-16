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
  //children: ' > *',
  //lastChild: ':last-child',
  //firstChild: ':first-child',
  //notLastChild: ':not(:last-child)',
  //notFirstChild: ':not(:first-child)',
  //firstOfType: ':first-of-type',
  //lastOfType: ':last-of-type',
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

function mergeResultInto(dst, src) {
  if (src.css.length > 0) {
    dst.css = dst.css + src.css;
    mergeInto(dst.classNames, src.classNames);
  }
}

function rulesToCSS(rules, selector) {
  var result = {css: '', classNames: {}};

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

function styleToCSS(style, _selector) {
  var result = {css: '', classNames: {}};

  if (!style.className) {
    return result;
  }

  var selector = '.' + style.className;

  if (_selector) {
    selector = _selector;
  } else {
    result.classNames[style.className] = true;
  }

  mergeResultInto(result, rulesToCSS(style.style, selector));

  if (style.children) {

    for (var childKey in style.children) {
      if (!style.children.hasOwnProperty(childKey)) {
        continue;
      }
      var child = style.children[childKey];
      var childResult;
      if (pseudoSelectors[childKey]) {
        childKey = pseudoSelectors[childKey];
        childResult = styleToCSS(child, selector + childKey);
      } else {
        childResult = stylesToCSS(child);
      }
      mergeResultInto(result, childResult);
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
    mergeResultInto(result, styleToCSS(styles[i]));
  }
  return result;
}

module.exports = stylesToCSS;
