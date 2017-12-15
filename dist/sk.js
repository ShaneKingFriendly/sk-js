(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("js-cookie"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "js-cookie"], factory);
	else if(typeof exports === 'object')
		exports["SK"] = factory(require("lodash"), require("js-cookie"));
	else
		root["SK"] = factory(root["_"], root["Cookies"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _jsCookie = __webpack_require__(2);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * default of key function
 *
 * @private
 * @param key index of array or property name of object
 * @param item value of array by index or value of object by property name
 * @param context array or object
 * @returns {*}
 */
function _skKeyFunc(key, item, context) {
  return _lodash2.default.isPlainObject(context) ? _lodash2.default.startsWith(key, 'skIdx') : 'skIdx' + key;
}
/**
 * @example
 * [2,{skIdx0:3,skIdx1:[4,{skIdx0:5,skIdx1:[]}]}] -> [2,[3,[4,[5,[]]]]]
 */
if (!Array.prototype.skArr) {
  Object.defineProperty(Array.prototype, 'skArr', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(recursive) {
      var keyFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _skKeyFunc;

      var rtn = [];
      this.forEach(function ($item) {
        rtn.push(recursive && (_lodash2.default.isArray($item) || _lodash2.default.isPlainObject($item)) ? $item.skArr(recursive, keyFunc) : $item);
      });
      return rtn;
    }
  });
}
if (!Array.prototype.skFilter) {
  Object.defineProperty(Array.prototype, 'skFilter', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(recursive, filterFunc) {
      var _this = this;

      var rtn = [];
      this.forEach(function ($item, $index) {
        if (_lodash2.default.isFunction(filterFunc) && filterFunc($index, $item, _this)) {
          rtn.push(recursive && (_lodash2.default.isArray($item) || _lodash2.default.isPlainObject($item)) ? $item.skFilter(recursive, filterFunc) : $item);
        }
      });
      return rtn;
    }
  });
}
/**
 * @example
 * [1,{a:2,b:[3,{c:4,d:[5,{}]}]}] -> {skIdx0:1,skIdx1:{a:2,b:{skIdx0:3,skIdx1:{c:4,d:{skIdx0:5,skIdx1:{}}}}}}
 */
if (!Array.prototype.skObj) {
  Object.defineProperty(Array.prototype, 'skObj', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(recursive) {
      var _this2 = this;

      var keyFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _skKeyFunc;

      var rtn = {};
      this.forEach(function ($item, $index) {
        rtn[_lodash2.default.isFunction(keyFunc) ? keyFunc($index, $item, _this2) : $index] = recursive && (_lodash2.default.isArray($item) || _lodash2.default.isPlainObject($item)) ? $item.skObj(recursive, keyFunc) : $item;
      });
      return rtn;
    }
  });
}
/**
 * @example
 * [1,2,3].skRmv(2) -> [1,3]
 */
if (!Array.prototype.skRmv) {
  Object.defineProperty(Array.prototype, 'skRmv', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(item) {
      var idx = this.indexOf(item);
      if (idx > -1) {
        this.splice(idx, 1);
      }
      return this;
    }
  });
}
/**
 * @example
 * [1,2,3].skToggle(2) -> [1,3]
 * [1,3].skToggle(2) -> [1,3,2]
 */
if (!Array.prototype.skToggle) {
  Object.defineProperty(Array.prototype, 'skToggle', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(item) {
      var idx = this.indexOf(item);
      if (idx > -1) {
        this.splice(idx, 1);
      } else {
        this.push(item);
      }
      return this;
    }
  });
}
/**
 * @example
 * (987654.321).skCurrencyFmt(2) -> 987,654.32
 */
if (!Number.prototype.skCurrencyFmt) {
  Number.prototype.skCurrencyFmt = function (fraction) {
    return String(this).skCurrencyFmt(fraction);
  };
}
/**
 * @example
 * {skIdx0:1,skIdx1:[2,{skIdx0:3,skIdx1:[4,{skIdx0:5,skIdx1:[]}]}]} -> [1,[2,[3,[4,[5,[]]]]]]
 */
if (!Object.prototype.skArr) {
  Object.defineProperty(Object.prototype, 'skArr', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(recursive) {
      var _this3 = this;

      var keyFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _skKeyFunc;

      var rtnArr = [];
      var rtnObj = {};
      Object.keys(this).forEach(function ($key) {
        var tmpVal = _this3[$key];
        var rtn = recursive && (_lodash2.default.isPlainObject(tmpVal) || _lodash2.default.isArray(tmpVal)) ? tmpVal.skArr(recursive, keyFunc) : tmpVal;

        rtnObj[$key] = rtn;
        if (_lodash2.default.isFunction(keyFunc) && keyFunc($key, tmpVal, _this3)) {
          rtnArr.push(rtn);
        }
      });
      return Object.keys(rtnObj).length === rtnArr.length ? rtnArr : rtnObj;
    }
  });
}
if (!Object.prototype.skAssign) {
  Object.defineProperty(Object.prototype, 'skAssign', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value() {
      for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
        objects[_key] = arguments[_key];
      }

      return SK.assign.apply(this, _lodash2.default.concat(this, objects));
    }
  });
}
if (!Object.prototype.skFilter) {
  Object.defineProperty(Object.prototype, 'skFilter', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(recursive, filterFunc) {
      var _this4 = this;

      var rtn = {};
      Object.keys(this).forEach(function ($key) {
        var tmpVal = _this4[$key];
        if (_lodash2.default.isFunction(filterFunc) && filterFunc($key, tmpVal, _this4)) {
          rtn[$key] = recursive && (_lodash2.default.isArray(tmpVal) || _lodash2.default.isPlainObject(tmpVal)) ? tmpVal.skFilter(recursive, filterFunc) : tmpVal;
        }
      });
      return rtn;
    }
  });
}
/**
 * @example
 * {a:2,b:[3,{c:4,d:[5,{}]}]} -> {a:2,b:{skIdx0:3,skIdx1:{c:4,d:{skIdx0:5,skIdx1:{}}}}}
 */
if (!Object.prototype.skObj) {
  Object.defineProperty(Object.prototype, 'skObj', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(recursive) {
      var _this5 = this;

      var keyFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _skKeyFunc;

      var rtn = {};
      Object.keys(this).forEach(function ($key) {
        var tmpVal = _this5[$key];
        rtn[$key] = recursive && (_lodash2.default.isArray(tmpVal) || _lodash2.default.isPlainObject(tmpVal)) ? tmpVal.skObj(recursive, keyFunc) : tmpVal;
      });
      return rtn;
    }
  });
}
if (!Object.prototype.skVal) {
  Object.defineProperty(Object.prototype, 'skVal', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(str, val) {
      var rtn = this;
      var arr = str.split('.');
      var idx = 0;
      if (arguments.length > 1) {
        for (; idx < arr.length - 1; idx++) {
          if (rtn[arr[idx]] === undefined) {
            rtn[arr[idx]] = {};
          }
          rtn = rtn[arr[idx]];
        }
        if (rtn) {
          rtn[arr[idx]] = val;
        }
      } else {
        for (; idx < arr.length; idx++) {
          rtn = rtn[arr[idx]];
          if (rtn === undefined) {
            break;
          }
        }
      }
      return rtn;
    }
  });
}
if (!Object.prototype.skVals) {
  Object.defineProperty(Object.prototype, 'skVals', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value() {
      var _this6 = this;

      return Object.keys(this).map(function ($key) {
        return _this6[$key];
      });
    }
  });
}
if (!String.prototype.skBlank) {
  String.prototype.skBlank = function () {
    return this.trim().length === 0;
  };
}
if (!String.prototype.skCurrencyFmt) {
  String.prototype.skCurrencyFmt = function (fraction) {
    fraction = fraction >= 0 && fraction <= 20 ? fraction : 2;
    var arr = (parseFloat(this.replace(/[^\d\.-]/g, '')).toFixed(fraction) + '').split('.');
    return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (fraction == 0 ? '' : '.' + arr[1]);
  };
}
if (!String.prototype.skEmpty) {
  String.prototype.skEmpty = function () {
    return this.length === 0;
  };
}
if (!String.prototype.skFmt) {
  String.prototype.skFmt = function (o) {
    return this.replace(/(\$\{\w+(\.\w+)*\})/g, function ($replacement) {
      ///(\{\w+\.\})/g
      return o.skVal($replacement.replace('${', '').replace('}', ''));
    });
  };
}
if (!String.prototype.skFmtArr) {
  String.prototype.skFmtArr = function (array) {
    return this.replace(/\$(\d+)/g, function ($match, $p1) {
      return array[--$p1];
    });
  };
}

var SK = function () {
  function SK() {
    _classCallCheck(this, SK);
  }

  _createClass(SK, null, [{
    key: '$',


    /**
     * New or get namespace object.
     *
     * @param {string} $ namespace
     * @param {Object} initVal init value
     * @param {Object} env window(browser) or global(nodejs) etc.
     * @returns {*} Returns the new assigner function.
     */
    value: function $() {
      var _$ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SK.DEFAULT_DOMAIN;

      var initVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var env = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SK.DEFAULT_ENV;

      if (!env[_$]) {
        env[_$] = initVal;
      } else if (!_lodash2.default.isEmpty(initVal)) {
        env[_$] = initVal;
      }
      return env[_$];
    }

    /**
     * default of assignWith's customizer
     *
     * @private
     * @returns {*|undefined}
     * @see _.assignWith
     */

  }, {
    key: '_skAssignCustomizer',
    value: function _skAssignCustomizer(objValue, srcValue, key, object, source) {
      return SK.arePlainObject(objValue, srcValue, object, source) ? SK.assign(objValue, srcValue) : undefined;
    }

    /**
     * xxx.com,a,b => xxx.com?a=b
     * xxx.com?a=b,a,c => xxx.com?a=c
     * xxx.com?a=b,c,d => xxx.com?a=b&c=d
     *
     * @param url
     * @param param
     * @param value
     * @returns {string}
     */

  }, {
    key: 'appendParameter',
    value: function appendParameter(url, param, value) {
      if (url.indexOf(SK.CHAR_QUESTION) == -1) {
        return url + SK.CHAR_QUESTION + param + SK.CHAR_EQUAL + value;
      } else {
        var currentValue = SK.getRequestParameter(param, url.split(SK.CHAR_QUESTION)[1]);
        if (currentValue) {
          return url.replace(param + SK.CHAR_EQUAL + currentValue, param + SK.CHAR_EQUAL + value);
        } else {
          return url + SK.CHAR_AMPERSAND + param + SK.CHAR_EQUAL + value;
        }
      }
    }

    /**
     * Checks if values are plain object.
     *
     * @returns {boolean}
     * @see _.isPlainObject
     */

  }, {
    key: 'arePlainObject',
    value: function arePlainObject() {
      var rtn = true;

      for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        values[_key2] = arguments[_key2];
      }

      values.forEach(function ($item) {
        rtn = rtn && _lodash2.default.isPlainObject($item);
      });
      return rtn;
    }

    /**
     * let o1 = {a:[{'b':1},'c',2], d:{e:3}};
     * let o2 = {a:[{'x':10},'y',20], d:{z:30}};
     * let o3 = $.extend(true,o1,o2);
     * JSON.stringify(o3);//{"a":[{"b":1,"x":10},"y",20],"d":{"e":3,"z":30}}
     * o1 == o3;//true
     * o1 === o3;//true
     *
     * let o1 = {a:[{'b':1},'c',2], d:{e:3}};
     * let o2 = {a:[{'x':10},'y',20], d:{z:30}};
     * let o3 = _.assign(o1,o2);
     * JSON.stringify(o3);//{"a":[{"x":10},"y",20],"d":{"z":30}}
     * o1 == o3;//true
     * o1 === o3;//true
     *
     * @static
     * @param {Object} object The destination object.
     * @param {...Object} objects The source objects.
     * @example
     *
     * let o1 = {a:[{'b':1},'c',2], d:{e:3}};
     * let o2 = {a:[{'x':10},'y',20], d:{z:30}};
     * let o3 = SK.assign(o1,o2);
     * JSON.stringify(o3);//{"a":[{"x":10},"y",20],"d":{"e":3,"z":30}}
     * o1 == o3;//true
     * o1 === o3;//true
     */

  }, {
    key: 'assign',
    value: function assign(object) {
      for (var _len3 = arguments.length, objects = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        objects[_key3 - 1] = arguments[_key3];
      }

      return _lodash2.default.assignWith.apply(this, _lodash2.default.concat(object, objects, SK._skAssignCustomizer));
    }

    /**
     * cookieStorage
     *
     * @param key
     * @param value
     * @returns {*}
     */

  }, {
    key: 'cookies',
    value: function cookies(key, value) {
      if (arguments.length > 1) {
        _jsCookie2.default.remove(key);
        return _jsCookie2.default.set(key, value);
      } else {
        return _jsCookie2.default.get(key);
      }
    }

    /**
     * @param {Array|string} array
     * @param {Array|string} anotherArray
     * @param {string} concat
     * @returns {Array|string}
     * @example
     * descartes(['alert','btn'],['success','info']);//['alert-success','alert-info','btn-success','btn-info']
     * descartes('alert','link','-');//'alert-link'
     */

  }, {
    key: 'descartes',
    value: function descartes() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var anotherArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var concat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SK.CHAR_DASH;

      var arr1 = Array.isArray(array) ? array : [array];
      var arr2 = Array.isArray(anotherArray) ? anotherArray : [anotherArray];
      var rtn = [];
      arr1.forEach(function ($item) {
        arr2.forEach(function ($$item) {
          rtn.push($item + concat + $$item);
        });
      });
      return rtn.length === 1 ? rtn[0] : rtn;
    }
  }, {
    key: 'emptyFunc',
    value: function emptyFunc() {}

    /**
     * the url of page or sub frame page
     *
     * @returns {string}
     */

  }, {
    key: 'getCurrentHref',
    value: function getCurrentHref() {
      return window.location.href;
    }

    /**
     * language in cookies if exist, else defautl
     *
     * @returns {string}
     */

  }, {
    key: 'getCurrentLanguage',
    value: function getCurrentLanguage() {
      var language = SK.cookies(SK.STR_LANGUAGE);
      return language ? language : SK.DEFAULT_LANGUAGE;
    }

    /**
     * window.location.origin
     *
     * @returns {string}
     */

  }, {
    key: 'getCurrentOrigin',
    value: function getCurrentOrigin() {
      return window.location.origin;
    }

    /**
     * /a/b -> /a/b
     * /a/b/c.html -> /a/b/c
     * /context/a -> /a
     *
     * @returns {string}
     */

  }, {
    key: 'getCurrentPath',
    value: function getCurrentPath() {
      var path = window.location.pathname;
      path = path.substring(SK.CONTEXT_PATH.length, path.length);
      path = _lodash2.default.endsWith(path, SK.FILE_TYPE_HTML_WITH_POINT) ? path.substring(0, path.length - 5) : path;
      return path;
    }

    /**
     * ?a=1&b=2
     *
     * @returns {*}
     */

  }, {
    key: 'getCurrentSearch',
    value: function getCurrentSearch() {
      return window.location.search;
    }

    /**
     * (a,?a=1&b=2) -> 1
     *
     * @param param
     * @param search
     * @returns {*}
     */

  }, {
    key: 'getRequestParameter',
    value: function getRequestParameter(param, search) {
      search = search || SK.getCurrentSearch();
      search = _lodash2.default.startsWith(search, SK.CHAR_QUESTION) ? search.slice(1) : search;
      var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      return r ? decodeURIComponent(r[2]) : undefined;
    }

    /**
     * /a/b -> ['/','/a/','/a/b/']
     *
     * @param path
     * @returns {string[]}
     */

  }, {
    key: 'getSubPaths',
    value: function getSubPaths(path) {
      var rtn = [SK.CHAR_SLASH];
      path.split(SK.CHAR_SLASH).reduce(function ($accumulator, $item) {
        if (SK.s4s($item) === SK.EMPTY) {
          return $accumulator;
        } else {
          var tmpValidPath = SK.getValidPath($accumulator + $item);
          rtn.push(tmpValidPath);
          return tmpValidPath;
        }
      }, SK.EMPTY);
      return rtn;
    }

    /**
     * a/b/c -> /a/b/c/
     *
     * @param path
     * @returns {string}
     */

  }, {
    key: 'getValidPath',
    value: function getValidPath(path) {
      return (_lodash2.default.startsWith(path, SK.CHAR_SLASH) ? SK.EMPTY : SK.CHAR_SLASH) + path + (_lodash2.default.endsWith(path, SK.CHAR_SLASH) ? SK.EMPTY : SK.CHAR_SLASH);
    }

    /**
     * localStorage
     *
     * @param key
     * @param value
     */

  }, {
    key: 'local',
    value: function local(key, value) {
      if (arguments.length > 1) {
        return localStorage.setItem(key, value);
      } else {
        return localStorage.getItem(key);
      }
    }

    /**
     * web redirect
     *
     * @param url
     */

  }, {
    key: 'redirect',
    value: function redirect(url) {
      window.location.href = url;
    }

    /**
     * Safe array for value.
     * @param {*} value
     * @param {Array} defaultValue
     * @returns {Array}
     */

  }, {
    key: 's4a',
    value: function s4a(value) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      return _lodash2.default.isArray(value) ? value : defaultValue;
    }

    /**
     * Safe boolean for value.
     * @param {*} value
     * @param {boolean} defaultValue
     * @returns {boolean}
     */

  }, {
    key: 's4b',
    value: function s4b(value) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return _lodash2.default.isBoolean(value) ? value : defaultValue;
    }

    /**
     * Safe date for value.
     * @param {*} value
     * @param {Date} defaultValue
     * @returns {Date}
     */

  }, {
    key: 's4d',
    value: function s4d(value) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

      return _lodash2.default.isDate(value) ? value : defaultValue;
    }

    /**
     * Safe finite number for value.
     * @param {*} value
     * @param {number} defaultValue
     * @returns {number}
     */

  }, {
    key: 's4n',
    value: function s4n(value) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return _lodash2.default.isFinite(_lodash2.default.toNumber(value)) ? _lodash2.default.toNumber(value) : defaultValue;
    }

    /**
     * Safe plain object for value.
     * @param {*} value
     * @param {Object} defaultValue
     * @returns {{}}
     */

  }, {
    key: 's4o',
    value: function s4o(value) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return _lodash2.default.isPlainObject(value) ? value : defaultValue;
    }

    /**
     * Safe string for value.
     * @param {*} value
     * @param {string} defaultValue
     * @returns {string}
     */

  }, {
    key: 's4s',
    value: function s4s(value) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SK.EMPTY;

      return _lodash2.default.isBoolean(value) || _lodash2.default.isFinite(value) || _lodash2.default.isString(value) ? String(value) : defaultValue;
    }

    /**
     * sessionStorage
     *
     * @param key
     * @param value
     */

  }, {
    key: 'session',
    value: function session(key, value) {
      if (arguments.length > 1) {
        return sessionStorage.setItem(key, value);
      } else {
        return sessionStorage.getItem(key);
      }
    }

    /**
     * upper first char
     *
     * @param words
     * @returns {string}
     * @example
     * upperWordsFirstChar('list');//List
     * upperWordsFirstChar('xi nAn shi you xUe yuan china people');//Xi NAn Shi You XUe Yuan China People
     */

  }, {
    key: 'upperWordsFirstChar',
    value: function upperWordsFirstChar(words) {
      return _lodash2.default.toString(words).replace(/\s[a-z]/g, function ($nonFirstWord) {
        return $nonFirstWord.toUpperCase();
      }).replace(/^[a-z]/, function ($firstWord) {
        return $firstWord.toUpperCase();
      });
    }
  }]);

  return SK;
}();

SK.CHAR_AMPERSAND = '&';
SK.CHAR_ANGLE = '∠';
SK.CHAR_APPROXIMATELY = '≈';
SK.CHAR_ARROW = '→';
SK.CHAR_ASTERISK = '*';
SK.CHAR_BACKSLASH = '\\';
SK.CHAR_CELSIUS = '℃';
SK.CHAR_CIRCLE = '⊙';
SK.CHAR_CIRCUMFERENCE = '○';
SK.CHAR_CLOSE_BRACE = '}';
SK.CHAR_CLOSE_BRACKET = ']';
SK.CHAR_CLOSE_PARENTHESIS = ')';
SK.CHAR_COLON = ':';
SK.CHAR_COMMA = ',';
SK.CHAR_DASH = '-';
SK.CHAR_DEGREE = '°';
SK.CHAR_DIVIDE = '÷';
SK.CHAR_DOT = '.';
SK.CHAR_DOUBLE_QUOTATION = '"';
SK.CHAR_EQUAL = '=';
SK.CHAR_EQUAL_APPROXIMATELY = '≌';
SK.CHAR_EQUIVALENT = '≡';
SK.CHAR_EXCLAMATION = '!';
SK.CHAR_HENCE = '∴';
SK.CHAR_INFINITY = '∞';
SK.CHAR_INTEGRAL = '∫';
SK.CHAR_INTERSECTION = '∩';
SK.CHAR_LESS = '<';
SK.CHAR_LESS_EQUAL = '≤';
SK.CHAR_MINUS = '-';
SK.CHAR_MINUTE = '′';
SK.CHAR_MULTIPLY = '×';
SK.CHAR_MORE = '>';
SK.CHAR_MORE_EQUAL = '≥';
SK.CHAR_NOT_EQUAL = '≠';
SK.CHAR_NOT_LESS = '≮';
SK.CHAR_NOT_MORE = '≯';
SK.CHAR_OPEN_BRACE = '{';
SK.CHAR_OPEN_BRACKET = '[';
SK.CHAR_OPEN_PARENTHESIS = '(';
SK.CHAR_PARALLEL = '‖';
SK.CHAR_PERCENT = '%';
SK.CHAR_PERMILL = '‰';
SK.CHAR_PERPENDICULAR = '⊥';
SK.CHAR_PI = 'π';
SK.CHAR_PLUS = '+';
SK.CHAR_PLUS_MINUS = '±';
SK.CHAR_POUND = '#';
SK.CHAR_PROPORTION = '∷';
SK.CHAR_QUESTION = '?';
SK.CHAR_SECOND = '〃';
SK.CHAR_SECTION = '§';
SK.CHAR_SEMICIRCLE = '⌒';
SK.CHAR_SEMICOLON = ';';
SK.CHAR_SIGMA = '∑';
SK.CHAR_SINCE = '∵';
SK.CHAR_SINGLE_QUOTATION = '\'';
SK.CHAR_SLASH = '/';
SK.CHAR_SQUARE = '√';
SK.CHAR_TRIANGLE = '△';
SK.CHAR_UNDERLINE = '_';
SK.CHAR_UNION = '∪';
SK.CHAR_VARIES = '∝';
SK.CHAR_VERTICAL = '|';
SK.FILE_TYPE_HTML = 'html';
SK.FILE_TYPE_HTML_WITH_POINT = SK.CHAR_DOT + SK.FILE_TYPE_HTML;
SK.FILE_TYPE_JSON = 'json';
SK.FILE_TYPE_JSON_WITH_POINT = SK.CHAR_DOT + SK.FILE_TYPE_JSON;
SK.REQUEST_METHOD_POST = 'POST';
SK.REQUEST_METHOD_DELETE = 'DELETE';
SK.REQUEST_METHOD_PUT = 'PUT';
SK.REQUEST_METHOD_GET = 'GET';
SK.JS_KEYWORD_FUNCTION = 'function';
SK.EMPTY = '';
SK.STR_DEFAULT = 'default';
SK.STR_ERROR = 'error';
SK.STR_LANGUAGE = 'language';
SK.ENV_DEV = 'DEV';
SK.ENV_TEST = 'TEST';
SK.ENV_PROD = 'PROD';
SK.CONTEXT_PATH = SK.EMPTY;
SK.DEFAULT_DOMAIN = '$sk';
SK.DEFAULT_ENV = {};
SK.DEFAULT_LANGUAGE = 'en_US';
SK.DEFAULT_MOMENT_DATE = 'YYYY-MM-DD';
SK.DEFAULT_MOMENT_DATETIME = 'YYYY-MM-DD HH:mm:ss';
SK.DEFAULT_MOMENT_TIME = 'HH:mm:ss';
SK.DEFAULT_MOMENT_TIMEZONE = 'Z';
exports.default = SK;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});