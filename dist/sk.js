;(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CMD
    // all dependencies need to passed as parameters manually,
    // will not require here.
    module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as sk
    // TODO how to define the jquery plugin here?
    define('sk', ['jsface', 'jquery'], factory);
  } else {
    // in browser, global is window.
    // all dependencies were loaded already.
    // bootstrap and jquery's plugin are all attached to jquery,
    // expose $sk and all components to window.
    factory(global, jsface, jQuery);
  }
}(typeof window !== 'undefined' ? window : this, function (window, jsface, jQuery, DO_NOT_EXPOSE_SK_TO_GLOBAL) {
  var _sk = window.$sk;
  var $sk = {};
  window.$sk = $sk;

  $sk.noConflict = function () {
    window.$sk = _sk;
    return $sk;
  };

  // insert all source code here
  // copy from jQuery
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
          if (deep && copy && ( jQuery.isPlainObject(copy) ||
            ( copyIsArray = Array.isArray(copy) ) )) {
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

  // sk body here
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
  $sk.n = function (number) {
    return isNaN(Number(number)) ? 0 : Number(number);
  };

  //Always return valid Object, if invalid return empty object
  $sk.o = function (object) {
    return jQuery.isPlainObject(object) ? object : {};
  };

  //Return the String of input
  $sk.s = function (string) {
    return String(string);
  };

  var SKResult = jsface.Class({
    constructor: function (result) {
      this._result = result;
    },

    result: {
      get: function () {
        return this._result;
      },
      set: function (result) {
        this._result = result;
      }
    },

    fmtMsg: function () {
      return this._result.msg ? this._result.msg : this._result.fmt.skFmt(this._result.arg);
    },

    success: function () {
      return this._result.success;
    }

  });

  //{"success":true,"code":"","fmt":"","arg":{},"msg":"","data":{}}
  $sk.createResult = function (result) {
    return new SKResult(result)
  };

  // reset to old $sk
  if (typeof DO_NOT_EXPOSE_SK_TO_GLOBAL !== 'undefined' && DO_NOT_EXPOSE_SK_TO_GLOBAL === true) {
    window.$sk = _sk;
  }
  return $sk;
}));
