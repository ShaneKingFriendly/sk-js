;(function (global, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd && define.amd.jQuery) {
    //AMD
    // register as 'sk-js', consistent with npm package name
    define('sk-js', ['jquery'], function ($) {
      return factory(global, $);
    });
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    //CMD
    //var $sk = require('sk')(window, jQuery);
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

  $sk.STR_OF_INFINITY = 'Infinity';
  $sk.STR_OF_INVALID_DATE = 'Invalid Date';
  $sk.STR_OF_NAN = 'NaN';
  $sk.STR_OF_NULL = 'null';
  $sk.STR_OF_UNDEFINED = 'undefined';
  $sk.ARR_OF_BAD_VALUE = [$sk.STR_OF_INFINITY, $sk.STR_OF_INVALID_DATE, $sk.STR_OF_NAN, $sk.STR_OF_NULL, $sk.STR_OF_UNDEFINED];

  $sk.TYPE_OF_BOOLEAN = 'boolean';
  $sk.TYPE_OF_NUMBER = 'number';
  $sk.TYPE_OF_OBJECT = 'object';
  $sk.TYPE_OF_STRING = 'string';
  $sk.TYPE_OF_UNDEFINED = $sk.STR_OF_UNDEFINED;

  $sk.OWN_PROP_OF_OBJECT = {}.hasOwnProperty;

  $sk.REGEXP_SPACE = /\s+/;

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

  //copy from classNames
  // don't inherit from Object so we can skip hasOwnProperty check later
  // http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
  function StorageObject() {
  }

  StorageObject.prototype = Object.create(null);

  function _parseString4ClassNames(resultSet, str) {
    var array = str.split($sk.REGEXP_SPACE);

    for (var i = 0; i < array.length; ++i) {
      resultSet[array[i]] = true;
    }
  }

  function _parseObject4ClassNames(resultSet, object) {
    for (var k in object) {
      if ($sk.OWN_PROP_OF_OBJECT.call(object, k)) {
        // set value to false instead of deleting it to avoid changing object structure
        // https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
        resultSet[k] = !!object[k];
      }
    }
  }

  function _parseNumber4ClassNames(resultSet, num) {
    resultSet[num] = true;
  }

  function _parse4ClassNames(resultSet, arg) {
    if (!arg) return;
    var argType = typeof arg;

    // 'foo bar'
    if (argType === $sk.TYPE_OF_STRING) {
      _parseString4ClassNames(resultSet, arg);

      // ['foo', 'bar', ...]
    } else if (Array.isArray(arg)) {
      _parseArray4ClassNames(resultSet, arg);

      // { 'foo': true, ... }
    } else if (argType === $sk.TYPE_OF_OBJECT) {
      _parseObject4ClassNames(resultSet, arg);

      // '130'
    } else if (argType === $sk.TYPE_OF_NUMBER) {
      _parseNumber4ClassNames(resultSet, arg);
    }
  }

  function _parseArray4ClassNames(resultSet, array) {
    for (var i = 0; i < array.length; ++i) {
      _parse4ClassNames(resultSet, array[i]);
    }
  }

  $sk.classNames = function () {
    // don't leak arguments
    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    var len = arguments.length;
    var args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }

    var classSet = new StorageObject();
    _parseArray4ClassNames(classSet, args);

    var list = [];

    for (var k in classSet) {
      if (classSet[k]) {
        list.push(k)
      }
    }

    return list.join(' ');
  };

  // sk body here
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

  $sk.isA = function (a) {
    return (typeof a == 'object') && a.constructor == Array;
  };
  $sk.isD = function (d) {
    return (typeof d == 'object') && d.constructor == Date;
  };
  $sk.isF = function (f) {
    return (typeof f == 'function') && f.constructor == Function;
  };
  $sk.isN = function (n) {
    return (typeof n == 'number') && n.constructor == Number;
  };
  $sk.isO = function (o) {
    return (typeof o == 'object') && o.constructor == Object;
  };
  $sk.isS = function (s) {
    return (typeof s == 'string') && s.constructor == String;
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
    return $sk.ARR_OF_BAD_VALUE.indexOf(String(string)) === -1 ? String(string) : '';
  };

  // reset to old $sk
  if (typeof DO_NOT_EXPOSE_SK_TO_GLOBAL !== 'undefined' && DO_NOT_EXPOSE_SK_TO_GLOBAL === true) {
    window.$sk = _sk;
  }
  return $sk;
}));
