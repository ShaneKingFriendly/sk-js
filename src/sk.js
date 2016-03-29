(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    // CMD
    // all dependencies need to passed as parameters manually,
    // will not require here.
    module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as parrot
    // TODO how to define the jquery plugin here?
    define('parrot', ['jquery', 'jsface'], factory);
  } else {
    // in browser, global is window.
    // all dependencies were loaded already.
    // bootstrap and jquery's plugin are all attached to jquery,
    // expose $sk and all components to window.
    factory(global, jQuery, jsface);
  }
}(typeof window !== "undefined" ? window : this, function (window, jQuery, jsface, DO_NOT_EXPOSE_SK_TO_GLOBAL) {
  var _sk = window.$sk;
  var $sk = {};
  window.$sk = $sk;

  $sk.noConflict = function () {
    window.$sk = _sk;
    return $sk;
  };

  // insert all source code here
  // sk body here
  $sk.isInValid = function (obj) {
    if (obj === undefined || obj == null || isNaN(obj) ) {
      return true;
    } else {
      return false;
    }
  };

  // reset to old $sk
  if (typeof DO_NOT_EXPOSE_SK_TO_GLOBAL != 'undefined' && DO_NOT_EXPOSE_SK_TO_GLOBAL === true) {
    window.$sk = _sk;
  }
  return $sk;
}));
