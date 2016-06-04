;(function (global, factory) {
  'use strict';
  
  if (typeof define === 'function' && define.amd && define.amd.jQuery) {
    //AMD
    define(['jquery'], function ($) {
      return factory(global, $);
    });
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    //CMD
    //var $sk = require('js')(window, jQuery);
    module.exports = factory;
  } else {
    // in browser, global is window.
    return factory(global, global.jQuery || global.$);
  }
}(typeof window !== 'undefined' ? window : this, function (window, jQuery, DO_NOT_EXPOSE_SK_TO_GLOBAL) {
  'use strict';

  var _sk = window.$sk;
  var $sk = {};
  window.$sk = $sk;

  $sk.noConflict = function () {
    window.$sk = _sk;
    return $sk;
  };

  // insert all source code here
  // copy from jQuery
  /**
   * [deep ], target, object1 [, objectN ]
   */
  $sk.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false,
      path = '',
      func;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
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
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = [];//src && jQuery.isArray( src ) ? src : []; //sk different with jQuery
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            // Never move original objects, clone them
            target[name] = $sk.extend(deep, clone, copy);
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

  /**
   * [deep ], target, object1 [, objectN ]/array1 [, arrayN]
   */
  $sk.extends = function () {
    var options,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i] ) != null) {
        if (Array.isArray(options)) {
          options.forEach(function (option) {
            $sk.extend(deep, target, option);
          });
        } else {
          $sk.extend(deep, target, options);
        }
      }
    }
    // Return the modified object
    return target;
  };

  // sk body here
  $sk.BAD_VALUE_STRING_ARRAY = ['Infinity', 'Invalid Date', 'NaN', 'null', 'undefined'];

  var _context = window;
  $sk.$ = function (context, $) {
    var innerContext = context ? context : _context;
    var inner$ = $ ? $ : 'sk$';
    if (!innerContext[inner$]) {
      innerContext[inner$] = {};
    }
    return innerContext[inner$];
  };
  //Always return valid Array, if invalid return empty array
  $sk.a = function (array) {
    return Array.isArray(array) ? array : [];
  };

  //Just true return true, other return false
  $sk.b = function (boolean) {
    return String(boolean) === 'true' && boolean !== 'true' && boolean;
  };

  //Always return valid Date, if invalid return defaultDate or new Date()
  $sk.d = function (date, defaultDate) {
    var rtnDate = defaultDate ? defaultDate : new Date();
    return (date instanceof Date) ? (date.toString() === 'Invalid Date' ? rtnDate : date) : rtnDate;
  };

  //Can be to Number than return value of number, other return 0
  $sk.n = function (number, defaultNumber) {
    return isNaN(Number(number)) ? (defaultNumber ? defaultNumber : 0) : Number(number);
  };

  //Always return valid Object, if invalid return empty object
  $sk.o = function (object) {
    return jQuery.isPlainObject(object) ? object : {};
  };

  //Return the String of input
  $sk.s = function (string) {
    return $sk.BAD_VALUE_STRING_ARRAY.indexOf(String(string)) === -1 ? String(string) : '';
  };

  // reset to old $sk
  if (typeof DO_NOT_EXPOSE_SK_TO_GLOBAL !== 'undefined' && DO_NOT_EXPOSE_SK_TO_GLOBAL === true) {
    window.$sk = _sk;
  }
  return $sk;
}));
