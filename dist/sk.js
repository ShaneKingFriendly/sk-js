(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["SK"] = factory(require("lodash"));
	else
		root["SK"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

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
	      var tmpIdx = this.indexOf(item);
	      if (tmpIdx > -1) {
	        this.splice(tmpIdx, 1);
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
	      var tmpArr = str.split('.');
	      var tmpIdx = 0;
	      if (arguments.length > 1) {
	        for (; tmpIdx < tmpArr.length - 1; tmpIdx++) {
	          if (rtn[tmpArr[tmpIdx]] === undefined) {
	            rtn[tmpArr[tmpIdx]] = {};
	          }
	          rtn = rtn[tmpArr[tmpIdx]];
	        }
	        if (rtn) {
	          rtn[tmpArr[tmpIdx]] = val;
	        }
	      } else {
	        for (; tmpIdx < tmpArr.length; tmpIdx++) {
	          rtn = rtn[tmpArr[tmpIdx]];
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
	    fraction = fraction > 0 && fraction <= 20 ? fraction : 2;
	    var tmpArr = (parseFloat(this.replace(/[^\d\.-]/g, '')).toFixed(fraction) + '').split('.');
	    return tmpArr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.' + tmpArr[1];
	  };
	}
	if (!String.prototype.skEmpty) {
	  String.prototype.skEmpty = function () {
	    return this.length === 0;
	  };
	}
	if (!String.prototype.skFmt) {
	  String.prototype.skFmt = function (o) {
	    return this.replace(/(\$\{\w+(\.\w+)*\})/g, function ($matched) {
	      ///(\{\w+\.\})/g
	      return o.skVal($matched.replace('${', '').replace('}', ''));
	    });
	  };
	}
	if (!String.prototype.skFmtArr) {
	  String.prototype.skFmtArr = function (a) {
	    return this.replace(/\$(\d+)/g, function ($_, $m) {
	      return a[--$m];
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
	     * @param {Object} env window(browser) or global(nodejs) etc.
	     * @param {string} $ namespace
	     * @returns {*} Returns the new assigner function.
	     */
	    value: function $() {
	      var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SK.DEFAULT_ENV;

	      var _$ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SK.DEFAULT_DOMAIN;

	      if (!env[_$]) {
	        env[_$] = {};
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
	     * @param {Array|string} arr1
	     * @param {Array|string} arr2
	     * @param {string} concat
	     * @returns {Array|string}
	     * @example
	     * descartes(['alert','btn'],['success','info']);//['alert-success','alert-info','btn-success','btn-info']
	     * descartes('alert','link','-');//'alert-link'
	     */

	  }, {
	    key: 'descartes',
	    value: function descartes() {
	      var arr1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	      var arr2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      var concat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SK.STR_OF_CHAR_DASH;

	      var tmpArr1 = Array.isArray(arr1) ? arr1 : [arr1];
	      var tmpArr2 = Array.isArray(arr2) ? arr2 : [arr2];
	      var rtn = [];
	      tmpArr1.forEach(function ($ele1) {
	        tmpArr2.forEach(function ($ele2) {
	          rtn.push($ele1 + concat + $ele2);
	        });
	      });
	      return rtn.length === 1 ? rtn[0] : rtn;
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
	      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	      return _lodash2.default.isString(value) || _lodash2.default.isFinite(value) ? String(value) : defaultValue;
	    }

	    /**
	     * @param word
	     * @returns {string}
	     * @example
	     * upperWordFirstChar('path');//Path
	     * upperWordFirstChar('list');//List
	     */

	  }, {
	    key: 'upperWordFirstChar',
	    value: function upperWordFirstChar(word) {
	      return _lodash2.default.toString(word).replace(/(\w)/, function ($1) {
	        return $1.toUpperCase();
	      });
	    }

	    /**
	     * @param words
	     * @returns {string}
	     * @example
	     * upperWordsFirstChar('xi nAn shi you xUe yuan china people');//Xi NAn Shi You XUe Yuan China People
	     */

	  }, {
	    key: 'upperWordsFirstChar',
	    value: function upperWordsFirstChar(words) {
	      return _lodash2.default.toString(words).replace(/\s[a-z]/g, function ($11) {
	        return $11.toUpperCase();
	      }).replace(/^[a-z]/, function ($21) {
	        return $21.toUpperCase();
	      });
	    }
	  }]);

	  return SK;
	}();

	SK.STR_OF_CHAR_AMPERSAND = '&';
	SK.STR_OF_CHAR_ANGLE = '∠';
	SK.STR_OF_CHAR_APPROXIMATELY = '≈';
	SK.STR_OF_CHAR_ARROW = '→';
	SK.STR_OF_CHAR_ASTERISK = '*';
	SK.STR_OF_CHAR_BACKSLASH = '\\';
	SK.STR_OF_CHAR_CELSIUS = '℃';
	SK.STR_OF_CHAR_CIRCLE = '⊙';
	SK.STR_OF_CHAR_CIRCUMFERENCE = '○';
	SK.STR_OF_CHAR_CLOSE_BRACE = '}';
	SK.STR_OF_CHAR_CLOSE_BRACKET = ']';
	SK.STR_OF_CHAR_CLOSE_PARENTHESIS = ')';
	SK.STR_OF_CHAR_COLON = ':';
	SK.STR_OF_CHAR_COMMA = ',';
	SK.STR_OF_CHAR_DASH = '-';
	SK.STR_OF_CHAR_DEGREE = '°';
	SK.STR_OF_CHAR_DIVIDE = '÷';
	SK.STR_OF_CHAR_DOT = '.';
	SK.STR_OF_CHAR_DOUBLE_QUOTATION = '"';
	SK.STR_OF_CHAR_EQUAL = '=';
	SK.STR_OF_CHAR_EQUAL_APPROXIMATELY = '≌';
	SK.STR_OF_CHAR_EQUIVALENT = '≡';
	SK.STR_OF_CHAR_EXCLAMATION = '!';
	SK.STR_OF_CHAR_HENCE = '∴';
	SK.STR_OF_CHAR_INFINITY = '∞';
	SK.STR_OF_CHAR_INTEGRAL = '∫';
	SK.STR_OF_CHAR_INTERSECTION = '∩';
	SK.STR_OF_CHAR_LESS = '<';
	SK.STR_OF_CHAR_LESS_EQUAL = '≤';
	SK.STR_OF_CHAR_MINUS = '-';
	SK.STR_OF_CHAR_MINUTE = '′';
	SK.STR_OF_CHAR_MULTIPLY = '×';
	SK.STR_OF_CHAR_MORE = '>';
	SK.STR_OF_CHAR_MORE_EQUAL = '≥';
	SK.STR_OF_CHAR_NOT_EQUAL = '≠';
	SK.STR_OF_CHAR_NOT_LESS = '≮';
	SK.STR_OF_CHAR_NOT_MORE = '≯';
	SK.STR_OF_CHAR_OPEN_BRACE = '{';
	SK.STR_OF_CHAR_OPEN_BRACKET = '[';
	SK.STR_OF_CHAR_OPEN_PARENTHESIS = '(';
	SK.STR_OF_CHAR_PARALLEL = '‖';
	SK.STR_OF_CHAR_PERCENT = '%';
	SK.STR_OF_CHAR_PERMILL = '‰';
	SK.STR_OF_CHAR_PERPENDICULAR = '⊥';
	SK.STR_OF_CHAR_PI = 'π';
	SK.STR_OF_CHAR_PLUS = '+';
	SK.STR_OF_CHAR_PLUS_MINUS = '±';
	SK.STR_OF_CHAR_POUND = '#';
	SK.STR_OF_CHAR_PROPORTION = '∷';
	SK.STR_OF_CHAR_QUESTION = '?';
	SK.STR_OF_CHAR_SECOND = '〃';
	SK.STR_OF_CHAR_SECTION = '§';
	SK.STR_OF_CHAR_SEMICIRCLE = '⌒';
	SK.STR_OF_CHAR_SEMICOLON = ';';
	SK.STR_OF_CHAR_SIGMA = '∑';
	SK.STR_OF_CHAR_SINCE = '∵';
	SK.STR_OF_CHAR_SINGLE_QUOTATION = '\'';
	SK.STR_OF_CHAR_SLASH = '/';
	SK.STR_OF_CHAR_SQUARE = '√';
	SK.STR_OF_CHAR_TRIANGLE = '△';
	SK.STR_OF_CHAR_UNDERLINE = '_';
	SK.STR_OF_CHAR_UNION = '∪';
	SK.STR_OF_CHAR_VARIES = '∝';
	SK.STR_OF_CHAR_VERTICAL = '|';
	SK.DEFAULT_DOMAIN = '$sk';
	SK.DEFAULT_ENV = {};
	exports.default = SK;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;