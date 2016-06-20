;(function (global, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    //AMD
    // register as 'sk-js', consistent with npm package name
    define('sk-js', ['jquery'], function ($) {
      return factory(global, $);
    });
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    //CMD
    // like jQuery
    module.exports = factory(global, require('jquery'));
  } else {
    // in browser, global is window.
    return factory(global, global.$);
  }
}(typeof window !== 'undefined' ? window : this, function (window, $, noGlobal) {
  'use strict';

  var _SK = window.SK;
  var SK = {};
  window.SK = SK;

  SK.noConflict = function () {
    window.SK = _SK;
    return SK;
  };

  SK.STR_OF_INFINITY = 'Infinity';
  SK.STR_OF_INVALID_DATE = 'Invalid Date';
  SK.STR_OF_NAN = 'NaN';
  SK.STR_OF_NULL = 'null';
  SK.STR_OF_UNDEFINED = 'undefined';
  SK.ARR_OF_BAD_VALUE = [SK.STR_OF_INFINITY, SK.STR_OF_INVALID_DATE, SK.STR_OF_NAN, SK.STR_OF_NULL, SK.STR_OF_UNDEFINED];

  SK.STR_OF_TRUE = 'true';

  SK.STR_OF_BOOLEAN = 'boolean';
  SK.STR_OF_NUMBER = 'number';
  SK.STR_OF_OBJECT = 'object';
  SK.STR_OF_STRING = 'string';

  SK.OWN_PROP_OF_OBJECT = {}.hasOwnProperty;

  SK.REGEXP_SPACE = /\s+/;

  /** Copy from jQuery, different is array extend */
  SK.extend = function extend() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    // Handle a deep copy situation
    if (typeof target === SK.STR_OF_BOOLEAN) {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== SK.STR_OF_OBJECT && !$.isFunction(target)) {
      target = {};
    }
    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if (( options = arguments[i] ) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];
          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = [];//src && jQuery.isArray( src ) ? src : []; //sk different with jQuery
            } else {
              clone = src && $.isPlainObject(src) ? src : {};
            }
            // Never move original objects, clone them
            target[name] = SK.extend(deep, clone, copy);
            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    // Return the modified object
    return target;
  };

  /** Namespace */
  SK.$ = function $(context, $) {
    var innerContext = context ? context : window;
    var inner$ = $ ? $ : 'sk$';
    if (!innerContext[inner$]) {
      innerContext[inner$] = {};
    }
    return innerContext[inner$];
  };

  //Always return valid Array, if invalid return empty array
  SK.a = function a(array) {
    return Array.isArray(array) ? array : [];
  };
  //Just true return true, other return false
  SK.b = function b(boolean) {
    return String(boolean) === SK.STR_OF_TRUE && boolean !== SK.STR_OF_TRUE && boolean;
  };
  //Always return valid Date, if invalid return defaultDate or new Date()
  SK.d = function d(date, defaultDate) {
    var rtnDate = arguments.length > 1 ? defaultDate : new Date();
    return (date instanceof Date) ? (date.toString() === SK.STR_OF_INVALID_DATE ? rtnDate : date) : rtnDate;
  };
  //Can be to Number than return value of number, other return 0
  SK.n = function n(number, defaultNumber) {
    return isNaN(Number(number)) ? (arguments.length > 1 ? defaultNumber : 0) : Number(number);
  };
  //Always return valid Object, if invalid return empty object
  SK.o = function o(object) {
    return $.isPlainObject(object) ? object : {};
  };
  //Return the String of input
  SK.s = function s(string, defaultString) {
    return SK.ARR_OF_BAD_VALUE.indexOf(String(string)) === -1 ? String(string) : (arguments.length > 1 ? defaultString : '');
  };

  /** Reset to old SK */
  if (typeof noGlobal !== SK.STR_OF_UNDEFINED && noGlobal === true) {
    window.SK = _SK;
  }

  return SK;
}));
