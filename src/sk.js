;(function () {
  'use strict';

  // Export SK.
  var SK = function () {
    return this;
  };
  SK.prototype = {
    constructor: SK
  };

  var STR_OF_INFINITY = 'Infinity';
  var STR_OF_INVALID_DATE = 'Invalid Date';
  var STR_OF_NAN = 'NaN';
  var STR_OF_NULL = 'null';
  var STR_OF_UNDEFINED = 'undefined';
  var ARR_OF_BAD_VALUE = [STR_OF_INFINITY, STR_OF_INVALID_DATE, STR_OF_NAN, STR_OF_NULL, STR_OF_UNDEFINED];

  var STR_OF_TRUE = 'true';

  var STR_OF_CONSTRUCTOR = 'constructor';
  var STR_OF_BOOLEAN = 'boolean';
  var STR_OF_FUNCTION = 'function';
  var STR_OF_OBJECT = 'object';

  var TAG_OF_OBJECT = '[object Object]';

  var PROTO_OF_OBJECT = Object.getPrototypeOf;

  var TYPE_OF_CLASS = {};
  var FUNC_OF_OBJECT_toString = TYPE_OF_CLASS.toString;

  var OWN_OF_OBJECT = TYPE_OF_CLASS.hasOwnProperty;
  var FUNC_OF_OWN_OBJECT_toString = OWN_OF_OBJECT.toString;
  var RST_OF_OWN_OBJECT_toString = FUNC_OF_OWN_OBJECT_toString.call(Object);

  var typeOf = function (obj) {
    if (obj == null) {
      return obj + '';
    }
    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === STR_OF_OBJECT || typeof obj === STR_OF_FUNCTION ? TYPE_OF_CLASS[FUNC_OF_OBJECT_toString.call(obj)] || STR_OF_OBJECT : typeof obj;
  };

  var isFunction = function (obj) {
    return typeOf(obj) === STR_OF_FUNCTION;
  };

  var isPlainObject = function (obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || FUNC_OF_OBJECT_toString.call(obj) !== TAG_OF_OBJECT) {
      return false;
    }

    proto = PROTO_OF_OBJECT(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
      return true;
    }

    // Objects with prototype are plain if they were constructed by a global Object function
    Ctor = OWN_OF_OBJECT.call(proto, STR_OF_CONSTRUCTOR) && proto.constructor;
    return typeof Ctor === STR_OF_FUNCTION && FUNC_OF_OWN_OBJECT_toString.call(Ctor) === RST_OF_OWN_OBJECT_toString;
  };

  /** Copy from jQuery, different is array extend */
  SK.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    // Handle a deep copy situation
    if (typeof target === STR_OF_BOOLEAN) {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== STR_OF_OBJECT && !isFunction(target)) {
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
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = [];//src && jQuery.isArray( src ) ? src : []; //sk different with jQuery
            } else {
              clone = src && isPlainObject(src) ? src : {};
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

  /** New namespace */
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
    return String(boolean) === STR_OF_TRUE && boolean !== STR_OF_TRUE && boolean;
  };
  //Always return valid Date, if invalid return defaultDate or new Date()
  SK.d = function (date, defaultDate) {
    var rtnDate = arguments.length > 1 ? defaultDate : new Date();
    return (date instanceof Date) ? (date.toString() === STR_OF_INVALID_DATE ? rtnDate : date) : rtnDate;
  };
  //UnInput
  SK.isNullOrUndefined = function (value) {
    return value === null || value === undefined;
  };
  //Can be to Number than return value of number, other return 0
  SK.n = function (number, defaultNumber) {
    return isNaN(Number(number)) ? (arguments.length > 1 ? defaultNumber : 0) : Number(number);
  };
  //Always return plain Object, if invalid return empty object
  SK.o = function (object) {
    return isPlainObject(object) ? object : {};
  };
  //Return the String of input
  SK.s = function (string, defaultString) {
    return ARR_OF_BAD_VALUE.indexOf(String(string)) === -1 ? String(string) : (arguments.length > 1 ? defaultString : '');
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

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = checkGlobal(typeof global == STR_OF_OBJECT && global);
  /** Detect free variable `self`. */
  var freeSelf = checkGlobal(typeof self == STR_OF_OBJECT && self);
  /** Detect `this` as the global object. */
  var thisGlobal = checkGlobal(typeof this == STR_OF_OBJECT && this);
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
  if (typeof define == STR_OF_FUNCTION && typeof define.amd == STR_OF_OBJECT && define.amd) {
    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "SK" module.
    define(function () {
      return SK;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (typeof exports !== STR_OF_UNDEFINED) {
    if (typeof module !== STR_OF_UNDEFINED && module.exports) {
      exports = module.exports = SK;
    }
    exports.SK = SK;
  }
  else {
    // Export to the global object.
    root.SK = SK;
  }
}.call(this));
