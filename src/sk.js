(function () {
  'use strict';

  // Export SK.
  var SK = function () {
    return this;
  };
  SK.prototype = {
    constructor: SK
  };

  SK.STR_OF_INFINITY = 'Infinity';
  SK.STR_OF_INVALID_DATE = 'Invalid Date';
  SK.STR_OF_NAN = 'NaN';
  SK.STR_OF_NULL = 'null';
  SK.STR_OF_UNDEFINED = 'undefined';
  SK.ARR_OF_BAD_VALUE = [SK.STR_OF_INFINITY, SK.STR_OF_INVALID_DATE, SK.STR_OF_NAN, SK.STR_OF_NULL, SK.STR_OF_UNDEFINED];

  SK.STR_OF_TRUE = 'true';

  SK.STR_OF_CONSTRUCTOR = 'constructor';
  SK.STR_OF_BOOLEAN = 'boolean';
  SK.STR_OF_FUNCTION = 'function';
  SK.STR_OF_NUMBER = 'number';
  SK.STR_OF_OBJECT = 'object';
  SK.STR_OF_STRING = 'string';

  SK.TAG_OF_ARGS = '[object Arguments]';
  SK.TAG_OF_ARRAY = '[object Array]';
  SK.TAG_OF_BOOLEAN = '[object Boolean]';
  SK.TAG_OF_DATE = '[object Date]';
  SK.TAG_OF_ERROR = '[object Error]';
  SK.TAG_OF_FUNCTION = '[object Function]';
  SK.TAG_OF_MAP = '[object Map]';
  SK.TAG_OF_NUMBER = '[object Number]';
  SK.TAG_OF_OBJECT = '[object Object]';
  SK.TAG_OF_PROMISE = '[object Promise]';
  SK.TAG_OF_REGEXP = '[object RegExp]';
  SK.TAG_OF_SET = '[object Set]';
  SK.TAG_OF_STRING = '[object String]';
  SK.TAG_OF_SYMBOL = '[object Symbol]';

  SK.REGEXP_OF_SPACE = /\s+/;

  SK.TYPE_OF_CLASS = {};

  SK.PROTO_OF_OBJECT = Object.getPrototypeOf;

  SK.FUNC_OF_OBJECT_TOSTRING = SK.TYPE_OF_CLASS.toString;

  SK.OWN_OF_OBJECT = SK.TYPE_OF_CLASS.hasOwnProperty;

  SK.FN_OF_OBJECT_TOSTRING = SK.OWN_OF_OBJECT.toString;

  SK.RST_OF_OBJECT_TOSTRING = SK.FN_OF_OBJECT_TOSTRING.call(Object);

  SK.typeOf = function (obj) {
    if (obj == null) {
      return obj + '';
    }
    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === SK.STR_OF_OBJECT || typeof obj === SK.STR_OF_FUNCTION ? SK.TYPE_OF_CLASS[SK.FUNC_OF_OBJECT_TOSTRING.call(obj)] || SK.STR_OF_OBJECT : typeof obj;
  };

  SK.isFunction = function (obj) {
    return SK.typeOf(obj) === SK.STR_OF_FUNCTION;
  };

  SK.isPlainObject = function (obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || SK.FUNC_OF_OBJECT_TOSTRING.call(obj) !== SK.TAG_OF_OBJECT) {
      return false;
    }

    proto = SK.PROTO_OF_OBJECT(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
      return true;
    }

    // Objects with prototype are plain if they were constructed by a global Object function
    Ctor = SK.OWN_OF_OBJECT.call(proto, SK.STR_OF_CONSTRUCTOR) && proto.constructor;
    return typeof Ctor === SK.STR_OF_FUNCTION && SK.FN_OF_OBJECT_TOSTRING.call(Ctor) === SK.RST_OF_OBJECT_TOSTRING;
  };

  /** Copy from jQuery, different is array extend */
  SK.extend = function () {
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
    if (typeof target !== SK.STR_OF_OBJECT && !SK.isFunction(target)) {
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
          if (deep && copy && (SK.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = [];//src && jQuery.isArray( src ) ? src : []; //sk different with jQuery
            } else {
              clone = src && SK.isPlainObject(src) ? src : {};
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
  SK.$ = function (context, $) {
    var innerContext = context ? context : root;
    var inner$ = $ ? $ : '$sk';
    if (!innerContext[inner$]) {
      innerContext[inner$] = {};
    }
    return innerContext[inner$];
  };

  //Always return valid Array, if invalid return empty array
  SK.a = function (array) {
    return Array.isArray(array) ? array : [];
  };
  //Just true return true, other return false
  SK.b = function (boolean) {
    return String(boolean) === SK.STR_OF_TRUE && boolean !== SK.STR_OF_TRUE && boolean;
  };
  //Always return valid Date, if invalid return defaultDate or new Date()
  SK.d = function (date, defaultDate) {
    var rtnDate = arguments.length > 1 ? defaultDate : new Date();
    return (date instanceof Date) ? (date.toString() === SK.STR_OF_INVALID_DATE ? rtnDate : date) : rtnDate;
  };
  //Can be to Number than return value of number, other return 0
  SK.n = function (number, defaultNumber) {
    return isNaN(Number(number)) ? (arguments.length > 1 ? defaultNumber : 0) : Number(number);
  };
  //Always return valid Object, if invalid return empty object
  SK.o = function (object) {
    return SK.isPlainObject(object) ? object : {};
  };
  //Return the String of input
  SK.s = function (string, defaultString) {
    return SK.ARR_OF_BAD_VALUE.indexOf(String(string)) === -1 ? String(string) : (arguments.length > 1 ? defaultString : '');
  };

  /**
   * Checks if `value` is a global object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {null|Object} Returns `value` if it's a global object, else `null`.
   */
  function checkGlobal(value) {
    return (value && value.Object === Object) ? value : null;
  }

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == SK.STR_OF_OBJECT && exports;
  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == SK.STR_OF_OBJECT && module;
  /** Detect free variable `global` from Node.js. */
  var freeGlobal = checkGlobal(typeof global == SK.STR_OF_OBJECT && global);
  /** Detect free variable `self`. */
  var freeSelf = checkGlobal(typeof self == SK.STR_OF_OBJECT && self);
  /** Detect `this` as the global object. */
  var thisGlobal = checkGlobal(typeof this == SK.STR_OF_OBJECT && this);
  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

  // Save the previous value of the `SK` variable.
  var _SK = root.SK;

  // Expose SK on the free variable `window` or `self` when available so it's
  // globally accessible, even when bundled with Browserify, Webpack, etc. This
  // also prevents errors in cases where SK is loaded by a script tag in the
  // presence of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch
  // for more details. Use `SK.noConflict` to remove SK from the global object.
  (freeSelf || {}).SK = SK;

  // Run sk.js in *noConflict* mode, returning the `SK` variable to its
  // previous owner. Returns a reference to the SK object.
  SK.noConflict = function () {
    root.SK = _SK;
    return this;
  };

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == SK.STR_OF_FUNCTION && typeof define.amd == SK.STR_OF_OBJECT && define.amd) {
    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "SK" module.
    define(function () {
      return SK;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = SK).SK = SK;
    // Export for CommonJS support.
    freeExports.SK = SK;
  }
  else {
    // Export to the global object.
    root.SK = SK;
  }
}.call(this));
