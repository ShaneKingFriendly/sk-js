(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    // CMD
    // all dependencies need to passed as parameters manually,
    // will not require here.
    module.exports = factory;
  } else if (typeof define === "function" && define.amd) {
    // AMD. Register as sk
    // TODO how to define the jquery plugin here?
    define("sk", ["jsface", "jquery"], factory);
  } else {
    // in browser, global is window.
    // all dependencies were loaded already.
    // bootstrap and jquery's plugin are all attached to jquery,
    // expose $sk and all components to window.
    factory(global, jsface, jQuery);
  }
}(typeof window !== "undefined" ? window : this, function (window, jsface, jQuery, DO_NOT_EXPOSE_SK_TO_GLOBAL) {
  var _sk = window.$sk;
  var $sk = {};
  window.$sk = $sk;

  $sk.noConflict = function () {
    window.$sk = _sk;
    return $sk;
  };

  // insert all source code here
  // sk body here

  //Always return valid Array, if invalid return empty array
  $sk.a = function (array) {
    return jQuery.isArray(array) ? array : [];
  };

  //Just true return true, other return false
  $sk.b = function (boolean) {
    return String(boolean) === "true" && boolean !== "true" && boolean;
  };

  //Always return valid Date, if invalid return defaultDate or new Date()
  $sk.d = function (date, defaultDate) {
    var rtnDate = defaultDate ? defaultDate : new Date();
    return (date instanceof Date) ? (date.toString() === "Invalid Date" ? rtnDate : date) : rtnDate;
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

  // reset to old $sk
  if (typeof DO_NOT_EXPOSE_SK_TO_GLOBAL !== "undefined" && DO_NOT_EXPOSE_SK_TO_GLOBAL === true) {
    window.$sk = _sk;
  }
  return $sk;
}));
