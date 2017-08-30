'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jsCookie = require('js-cookie');

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
    fraction = fraction > 0 && fraction <= 20 ? fraction : 2;
    var arr = (parseFloat(this.replace(/[^\d\.-]/g, '')).toFixed(fraction) + '').split('.');
    return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.' + arr[1];
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
exports.default = SK;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNrLmpzIl0sIm5hbWVzIjpbIl9za0tleUZ1bmMiLCJrZXkiLCJpdGVtIiwiY29udGV4dCIsImlzUGxhaW5PYmplY3QiLCJzdGFydHNXaXRoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJza0FyciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwidmFsdWUiLCJyZWN1cnNpdmUiLCJrZXlGdW5jIiwicnRuIiwiZm9yRWFjaCIsIiRpdGVtIiwicHVzaCIsImlzQXJyYXkiLCJza0ZpbHRlciIsImZpbHRlckZ1bmMiLCIkaW5kZXgiLCJpc0Z1bmN0aW9uIiwic2tPYmoiLCJza1JtdiIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJza1RvZ2dsZSIsIk51bWJlciIsInNrQ3VycmVuY3lGbXQiLCJmcmFjdGlvbiIsIlN0cmluZyIsInJ0bkFyciIsInJ0bk9iaiIsImtleXMiLCIka2V5IiwidG1wVmFsIiwibGVuZ3RoIiwic2tBc3NpZ24iLCJvYmplY3RzIiwiU0siLCJhc3NpZ24iLCJhcHBseSIsImNvbmNhdCIsInNrVmFsIiwic3RyIiwidmFsIiwiYXJyIiwic3BsaXQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJza1ZhbHMiLCJtYXAiLCJza0JsYW5rIiwidHJpbSIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwidG9GaXhlZCIsInNrRW1wdHkiLCJza0ZtdCIsIm8iLCIkcmVwbGFjZW1lbnQiLCJza0ZtdEFyciIsImFycmF5IiwiJG1hdGNoIiwiJHAxIiwiJCIsIkRFRkFVTFRfRE9NQUlOIiwiaW5pdFZhbCIsImVudiIsIkRFRkFVTFRfRU5WIiwiaXNFbXB0eSIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJvYmplY3QiLCJzb3VyY2UiLCJhcmVQbGFpbk9iamVjdCIsInVybCIsInBhcmFtIiwiQ0hBUl9RVUVTVElPTiIsIkNIQVJfRVFVQUwiLCJjdXJyZW50VmFsdWUiLCJnZXRSZXF1ZXN0UGFyYW1ldGVyIiwiQ0hBUl9BTVBFUlNBTkQiLCJ2YWx1ZXMiLCJhc3NpZ25XaXRoIiwiX3NrQXNzaWduQ3VzdG9taXplciIsInJlbW92ZSIsInNldCIsImdldCIsImFub3RoZXJBcnJheSIsIkNIQVJfREFTSCIsImFycjEiLCJhcnIyIiwiJCRpdGVtIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibGFuZ3VhZ2UiLCJjb29raWVzIiwiU1RSX0xBTkdVQUdFIiwiREVGQVVMVF9MQU5HVUFHRSIsIm9yaWdpbiIsInBhdGgiLCJwYXRobmFtZSIsInN1YnN0cmluZyIsIkNPTlRFWFRfUEFUSCIsImVuZHNXaXRoIiwiRklMRV9UWVBFX0hUTUxfV0lUSF9QT0lOVCIsInNlYXJjaCIsImdldEN1cnJlbnRTZWFyY2giLCJzbGljZSIsInJlZyIsIlJlZ0V4cCIsInIiLCJzdWJzdHIiLCJtYXRjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsIkNIQVJfU0xBU0giLCJyZWR1Y2UiLCIkYWNjdW11bGF0b3IiLCJzNHMiLCJFTVBUWSIsInRtcFZhbGlkUGF0aCIsImdldFZhbGlkUGF0aCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwiZGVmYXVsdFZhbHVlIiwiaXNCb29sZWFuIiwiRGF0ZSIsImlzRGF0ZSIsImlzRmluaXRlIiwidG9OdW1iZXIiLCJpc1N0cmluZyIsInNlc3Npb25TdG9yYWdlIiwid29yZHMiLCJ0b1N0cmluZyIsIiRub25GaXJzdFdvcmQiLCJ0b1VwcGVyQ2FzZSIsIiRmaXJzdFdvcmQiLCJDSEFSX0FOR0xFIiwiQ0hBUl9BUFBST1hJTUFURUxZIiwiQ0hBUl9BUlJPVyIsIkNIQVJfQVNURVJJU0siLCJDSEFSX0JBQ0tTTEFTSCIsIkNIQVJfQ0VMU0lVUyIsIkNIQVJfQ0lSQ0xFIiwiQ0hBUl9DSVJDVU1GRVJFTkNFIiwiQ0hBUl9DTE9TRV9CUkFDRSIsIkNIQVJfQ0xPU0VfQlJBQ0tFVCIsIkNIQVJfQ0xPU0VfUEFSRU5USEVTSVMiLCJDSEFSX0NPTE9OIiwiQ0hBUl9DT01NQSIsIkNIQVJfREVHUkVFIiwiQ0hBUl9ESVZJREUiLCJDSEFSX0RPVCIsIkNIQVJfRE9VQkxFX1FVT1RBVElPTiIsIkNIQVJfRVFVQUxfQVBQUk9YSU1BVEVMWSIsIkNIQVJfRVFVSVZBTEVOVCIsIkNIQVJfRVhDTEFNQVRJT04iLCJDSEFSX0hFTkNFIiwiQ0hBUl9JTkZJTklUWSIsIkNIQVJfSU5URUdSQUwiLCJDSEFSX0lOVEVSU0VDVElPTiIsIkNIQVJfTEVTUyIsIkNIQVJfTEVTU19FUVVBTCIsIkNIQVJfTUlOVVMiLCJDSEFSX01JTlVURSIsIkNIQVJfTVVMVElQTFkiLCJDSEFSX01PUkUiLCJDSEFSX01PUkVfRVFVQUwiLCJDSEFSX05PVF9FUVVBTCIsIkNIQVJfTk9UX0xFU1MiLCJDSEFSX05PVF9NT1JFIiwiQ0hBUl9PUEVOX0JSQUNFIiwiQ0hBUl9PUEVOX0JSQUNLRVQiLCJDSEFSX09QRU5fUEFSRU5USEVTSVMiLCJDSEFSX1BBUkFMTEVMIiwiQ0hBUl9QRVJDRU5UIiwiQ0hBUl9QRVJNSUxMIiwiQ0hBUl9QRVJQRU5ESUNVTEFSIiwiQ0hBUl9QSSIsIkNIQVJfUExVUyIsIkNIQVJfUExVU19NSU5VUyIsIkNIQVJfUE9VTkQiLCJDSEFSX1BST1BPUlRJT04iLCJDSEFSX1NFQ09ORCIsIkNIQVJfU0VDVElPTiIsIkNIQVJfU0VNSUNJUkNMRSIsIkNIQVJfU0VNSUNPTE9OIiwiQ0hBUl9TSUdNQSIsIkNIQVJfU0lOQ0UiLCJDSEFSX1NJTkdMRV9RVU9UQVRJT04iLCJDSEFSX1NRVUFSRSIsIkNIQVJfVFJJQU5HTEUiLCJDSEFSX1VOREVSTElORSIsIkNIQVJfVU5JT04iLCJDSEFSX1ZBUklFUyIsIkNIQVJfVkVSVElDQUwiLCJGSUxFX1RZUEVfSFRNTCIsIkZJTEVfVFlQRV9KU09OIiwiRklMRV9UWVBFX0pTT05fV0lUSF9QT0lOVCIsIlJFUVVFU1RfTUVUSE9EX1BPU1QiLCJSRVFVRVNUX01FVEhPRF9ERUxFVEUiLCJSRVFVRVNUX01FVEhPRF9QVVQiLCJSRVFVRVNUX01FVEhPRF9HRVQiLCJKU19LRVlXT1JEX0ZVTkNUSU9OIiwiU1RSX0RFRkFVTFQiLCJTVFJfRVJST1IiLCJFTlZfREVWIiwiRU5WX1RFU1QiLCJFTlZfUFJPRCIsIkRFRkFVTFRfTU9NRU5UX0RBVEUiLCJERUZBVUxUX01PTUVOVF9EQVRFVElNRSIsIkRFRkFVTFRfTU9NRU5UX1RJTUUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7O0FBU0EsU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLElBQXpCLEVBQStCQyxPQUEvQixFQUF3QztBQUN0QyxTQUFPLGlCQUFFQyxhQUFGLENBQWdCRCxPQUFoQixJQUEyQixpQkFBRUUsVUFBRixDQUFhSixHQUFiLEVBQWtCLE9BQWxCLENBQTNCLEdBQXlELFVBQVVBLEdBQTFFO0FBQ0Q7QUFDRDs7OztBQUlBLElBQUksQ0FBQ0ssTUFBTUMsU0FBTixDQUFnQkMsS0FBckIsRUFBNEI7QUFDMUJDLFNBQU9DLGNBQVAsQ0FBc0JKLE1BQU1DLFNBQTVCLEVBQXVDLE9BQXZDLEVBQWdEO0FBQzlDSSxjQUFVLElBRG9DO0FBRTlDQyxnQkFBWSxLQUZrQztBQUc5Q0Msa0JBQWMsSUFIZ0M7QUFJOUNDLFdBQU8sZUFBVUMsU0FBVixFQUEyQztBQUFBLFVBQXRCQyxPQUFzQix1RUFBWmhCLFVBQVk7O0FBQ2hELFVBQUlpQixNQUFNLEVBQVY7QUFDQSxXQUFLQyxPQUFMLENBQWEsVUFBQ0MsS0FBRCxFQUFXO0FBQ3RCRixZQUFJRyxJQUFKLENBQVVMLGNBQWMsaUJBQUVNLE9BQUYsQ0FBVUYsS0FBVixLQUFvQixpQkFBRWYsYUFBRixDQUFnQmUsS0FBaEIsQ0FBbEMsQ0FBRCxHQUE4REEsTUFBTVgsS0FBTixDQUFZTyxTQUFaLEVBQXVCQyxPQUF2QixDQUE5RCxHQUFnR0csS0FBekc7QUFDRCxPQUZEO0FBR0EsYUFBT0YsR0FBUDtBQUNEO0FBVjZDLEdBQWhEO0FBWUQ7QUFDRCxJQUFJLENBQUNYLE1BQU1DLFNBQU4sQ0FBZ0JlLFFBQXJCLEVB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QXFCLEc7QUFUVDVHLEUsQ0FVWjZHLGdCLEdBQW1CLEc7QUFWUDdHLEUsQ0FXWjhHLGtCLEdBQXFCLEc7QUFYVDlHLEUsQ0FZWitHLHNCLEdBQXlCLEc7QUFaYi9HLEUsQ0FhWmdILFUsR0FBYSxHO0FBYkRoSCxFLENBY1ppSCxVLEdBQWEsRztBQWREakgsRSxDQWVabUQsUyxHQUFZLEc7QUFmQW5ELEUsQ0FnQlprSCxXLEdBQWMsRztBQWhCRmxILEUsQ0FpQlptSCxXLEdBQWMsRztBQWpCRm5ILEUsQ0FrQlpvSCxRLEdBQVcsRztBQWxCQ3BILEUsQ0FtQlpxSCxxQixHQUF3QixHO0FBbkJackgsRSxDQW9CWndDLFUsR0FBYSxHO0FBcEJEeEMsRSxDQXFCWnNILHdCLEdBQTJCLEc7QUFyQmZ0SCxFLENBc0JadUgsZSxHQUFrQixHO0FBdEJOdkgsRSxDQXVCWndILGdCLEdBQW1CLEc7QUF2QlB4SCxFLENBd0JaeUgsVSxHQUFhLEc7QUF4QkR6SCxFLENBeUJaMEgsYSxHQUFnQixHO0FBekJKMUgsRSxDQTBCWjJILGEsR0FBZ0IsRztBQTFCSjNILEUsQ0EyQlo0SCxpQixHQUFvQixHO0FBM0JSNUgsRSxDQTRCWjZILFMsR0FBWSxHO0FBNUJBN0gsRSxDQTZCWjhILGUsR0FBa0IsRztBQTdCTjlILEUsQ0E4QlorSCxVLEdBQWEsRztBQTlCRC9ILEUsQ0ErQlpnSSxXLEdBQWMsRztBQS9CRmhJLEUsQ0FnQ1ppSSxhLEdBQWdCLEc7QUFoQ0pqSSxFLENBaUNaa0ksUyxHQUFZLEc7QUFqQ0FsSSxFLENBa0NabUksZSxHQUFrQixHO0FBbENObkksRSxDQW1DWm9JLGMsR0FBaUIsRztBQW5DTHBJLEUsQ0FvQ1pxSSxhLEdBQWdCLEc7QUFwQ0pySSxFLENBcUNac0ksYSxHQUFnQixHO0FBckNKdEksRSxDQXNDWnVJLGUsR0FBa0IsRztBQXRDTnZJLEUsQ0F1Q1p3SSxpQixHQUFvQixHO0FBdkNSeEksRSxDQXdDWnlJLHFCLEdBQXdCLEc7QUF4Q1p6SSxFLENBeUNaMEksYSxHQUFnQixHO0FBekNKMUksRSxDQTBDWjJJLFksR0FBZSxHO0FBMUNIM0ksRSxDQTJDWjRJLFksR0FBZSxHO0FBM0NINUksRSxDQTRDWjZJLGtCLEdBQXFCLEc7QUE1Q1Q3SSxFLENBNkNaOEksTyxHQUFVLEc7QUE3Q0U5SSxFLENBOENaK0ksUyxHQUFZLEc7QUE5Q0EvSSxFLENBK0NaZ0osZSxHQUFrQixHO0FBL0NOaEosRSxDQWdEWmlKLFUsR0FBYSxHO0FBaEREakosRSxDQWlEWmtKLGUsR0FBa0IsRztBQWpETmxKLEUsQ0FrRFp1QyxhLEdBQWdCLEc7QUFsREp2QyxFLENBbURabUosVyxHQUFjLEc7QUFuREZuSixFLENBb0Rab0osWSxHQUFlLEc7QUFwREhwSixFLENBcURacUosZSxHQUFrQixHO0FBckROckosRSxDQXNEWnNKLGMsR0FBaUIsRztBQXRETHRKLEUsQ0F1RFp1SixVLEdBQWEsRztBQXZERHZKLEUsQ0F3RFp3SixVLEdBQWEsRztBQXhERHhKLEUsQ0F5RFp5SixxQixHQUF3QixJO0FBekRaekosRSxDQTBEWjhFLFUsR0FBYSxHO0FBMUREOUUsRSxDQTJEWjBKLFcsR0FBYyxHO0FBM0RGMUosRSxDQTREWjJKLGEsR0FBZ0IsRztBQTVESjNKLEUsQ0E2RFo0SixjLEdBQWlCLEc7QUE3REw1SixFLENBOERaNkosVSxHQUFhLEc7QUE5REQ3SixFLENBK0RaOEosVyxHQUFjLEc7QUEvREY5SixFLENBZ0VaK0osYSxHQUFnQixHO0FBaEVKL0osRSxDQWtFWmdLLGMsR0FBaUIsTTtBQWxFTGhLLEUsQ0FtRVpvRSx5QixHQUE0QnBFLEdBQUdvSCxRQUFILEdBQWNwSCxHQUFHZ0ssYztBQW5FakNoSyxFLENBb0VaaUssYyxHQUFpQixNO0FBcEVMakssRSxDQXFFWmtLLHlCLEdBQTRCbEssR0FBR29ILFFBQUgsR0FBY3BILEdBQUdpSyxjO0FBckVqQ2pLLEUsQ0F1RVptSyxtQixHQUFzQixNO0FBdkVWbkssRSxDQXdFWm9LLHFCLEdBQXdCLFE7QUF4RVpwSyxFLENBeUVacUssa0IsR0FBcUIsSztBQXpFVHJLLEUsQ0EwRVpzSyxrQixHQUFxQixLO0FBMUVUdEssRSxDQTRFWnVLLG1CLEdBQXNCLFU7QUE1RVZ2SyxFLENBOEVaa0YsSyxHQUFRLEU7QUE5RUlsRixFLENBK0Vad0ssVyxHQUFjLFM7QUEvRUZ4SyxFLENBZ0ZaeUssUyxHQUFZLE87QUFoRkF6SyxFLENBaUZaNEQsWSxHQUFlLFU7QUFqRkg1RCxFLENBbUZaMEssTyxHQUFVLEs7QUFuRkUxSyxFLENBb0ZaMkssUSxHQUFXLE07QUFwRkMzSyxFLENBcUZaNEssUSxHQUFXLE07QUFyRkM1SyxFLENBdUZaa0UsWSxHQUFlbEUsR0FBR2tGLEs7QUF2Rk5sRixFLENBd0ZaMkIsYyxHQUFpQixLO0FBeEZMM0IsRSxDQXlGWjhCLFcsR0FBYyxFO0FBekZGOUIsRSxDQTBGWjZELGdCLEdBQW1CLE87QUExRlA3RCxFLENBMkZaNkssbUIsR0FBc0IsWTtBQTNGVjdLLEUsQ0E0Rlo4Syx1QixHQUEwQixxQjtBQTVGZDlLLEUsQ0E2RlorSyxtQixHQUFzQixVO2tCQTdGVi9LLEUiLCJmaWxlIjoic2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IENvb2tpZXMgZnJvbSAnanMtY29va2llJztcblxuLyoqXG4gKiBkZWZhdWx0IG9mIGtleSBmdW5jdGlvblxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ga2V5IGluZGV4IG9mIGFycmF5IG9yIHByb3BlcnR5IG5hbWUgb2Ygb2JqZWN0XG4gKiBAcGFyYW0gaXRlbSB2YWx1ZSBvZiBhcnJheSBieSBpbmRleCBvciB2YWx1ZSBvZiBvYmplY3QgYnkgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIGNvbnRleHQgYXJyYXkgb3Igb2JqZWN0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gX3NrS2V5RnVuYyhrZXksIGl0ZW0sIGNvbnRleHQpIHtcbiAgcmV0dXJuIF8uaXNQbGFpbk9iamVjdChjb250ZXh0KSA/IF8uc3RhcnRzV2l0aChrZXksICdza0lkeCcpIDogKCdza0lkeCcgKyBrZXkpO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzIse3NrSWR4MDozLHNrSWR4MTpbNCx7c2tJZHgwOjUsc2tJZHgxOltdfV19XSAtPiBbMixbMyxbNCxbNSxbXV1dXV1cbiAqL1xuaWYgKCFBcnJheS5wcm90b3R5cGUuc2tBcnIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3NrQXJyJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwga2V5RnVuYyA9IF9za0tleUZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSBbXTtcbiAgICAgIHRoaXMuZm9yRWFjaCgoJGl0ZW0pID0+IHtcbiAgICAgICAgcnRuLnB1c2goKHJlY3Vyc2l2ZSAmJiAoXy5pc0FycmF5KCRpdGVtKSB8fCBfLmlzUGxhaW5PYmplY3QoJGl0ZW0pKSkgPyAkaXRlbS5za0FycihyZWN1cnNpdmUsIGtleUZ1bmMpIDogJGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcnRuO1xuICAgIH1cbiAgfSk7XG59XG5pZiAoIUFycmF5LnByb3RvdHlwZS5za0ZpbHRlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tGaWx0ZXInLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAocmVjdXJzaXZlLCBmaWx0ZXJGdW5jKSB7XG4gICAgICBsZXQgcnRuID0gW107XG4gICAgICB0aGlzLmZvckVhY2goKCRpdGVtLCAkaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWx0ZXJGdW5jKSAmJiBmaWx0ZXJGdW5jKCRpbmRleCwgJGl0ZW0sIHRoaXMpKSB7XG4gICAgICAgICAgcnRuLnB1c2goKHJlY3Vyc2l2ZSAmJiAoXy5pc0FycmF5KCRpdGVtKSB8fCBfLmlzUGxhaW5PYmplY3QoJGl0ZW0pKSkgPyAkaXRlbS5za0ZpbHRlcihyZWN1cnNpdmUsIGZpbHRlckZ1bmMpIDogJGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzEse2E6MixiOlszLHtjOjQsZDpbNSx7fV19XX1dIC0+IHtza0lkeDA6MSxza0lkeDE6e2E6MixiOntza0lkeDA6Myxza0lkeDE6e2M6NCxkOntza0lkeDA6NSxza0lkeDE6e319fX19fVxuICovXG5pZiAoIUFycmF5LnByb3RvdHlwZS5za09iaikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tPYmonLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAocmVjdXJzaXZlLCBrZXlGdW5jID0gX3NrS2V5RnVuYykge1xuICAgICAgbGV0IHJ0biA9IHt9O1xuICAgICAgdGhpcy5mb3JFYWNoKCgkaXRlbSwgJGluZGV4KSA9PiB7XG4gICAgICAgIHJ0bltfLmlzRnVuY3Rpb24oa2V5RnVuYykgPyBrZXlGdW5jKCRpbmRleCwgJGl0ZW0sIHRoaXMpIDogJGluZGV4XSA9IChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSgkaXRlbSkgfHwgXy5pc1BsYWluT2JqZWN0KCRpdGVtKSkpID8gJGl0ZW0uc2tPYmoocmVjdXJzaXZlLCBrZXlGdW5jKSA6ICRpdGVtO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcnRuO1xuICAgIH1cbiAgfSk7XG59XG4vKipcbiAqIEBleGFtcGxlXG4gKiBbMSwyLDNdLnNrUm12KDIpIC0+IFsxLDNdXG4gKi9cbmlmICghQXJyYXkucHJvdG90eXBlLnNrUm12KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdza1JtdicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBsZXQgaWR4ID0gdGhpcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzEsMiwzXS5za1RvZ2dsZSgyKSAtPiBbMSwzXVxuICogWzEsM10uc2tUb2dnbGUoMikgLT4gWzEsMywyXVxuICovXG5pZiAoIUFycmF5LnByb3RvdHlwZS5za1RvZ2dsZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tUb2dnbGUnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbGV0IGlkeCA9IHRoaXMuaW5kZXhPZihpdGVtKTtcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqICg5ODc2NTQuMzIxKS5za0N1cnJlbmN5Rm10KDIpIC0+IDk4Nyw2NTQuMzJcbiAqL1xuaWYgKCFOdW1iZXIucHJvdG90eXBlLnNrQ3VycmVuY3lGbXQpIHtcbiAgTnVtYmVyLnByb3RvdHlwZS5za0N1cnJlbmN5Rm10ID0gZnVuY3Rpb24gKGZyYWN0aW9uKSB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzKS5za0N1cnJlbmN5Rm10KGZyYWN0aW9uKTtcbiAgfTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqIHtza0lkeDA6MSxza0lkeDE6WzIse3NrSWR4MDozLHNrSWR4MTpbNCx7c2tJZHgwOjUsc2tJZHgxOltdfV19XX0gLT4gWzEsWzIsWzMsWzQsWzUsW11dXV1dXVxuICovXG5pZiAoIU9iamVjdC5wcm90b3R5cGUuc2tBcnIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdza0FycicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChyZWN1cnNpdmUsIGtleUZ1bmMgPSBfc2tLZXlGdW5jKSB7XG4gICAgICBsZXQgcnRuQXJyID0gW107XG4gICAgICBsZXQgcnRuT2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKCgka2V5KSA9PiB7XG4gICAgICAgIGxldCB0bXBWYWwgPSB0aGlzWyRrZXldO1xuICAgICAgICBsZXQgcnRuID0gKHJlY3Vyc2l2ZSAmJiAoXy5pc1BsYWluT2JqZWN0KHRtcFZhbCkgfHwgXy5pc0FycmF5KHRtcFZhbCkpKSA/IHRtcFZhbC5za0FycihyZWN1cnNpdmUsIGtleUZ1bmMpIDogdG1wVmFsO1xuXG4gICAgICAgIHJ0bk9ialska2V5XSA9IHJ0bjtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihrZXlGdW5jKSAmJiBrZXlGdW5jKCRrZXksIHRtcFZhbCwgdGhpcykpIHtcbiAgICAgICAgICBydG5BcnIucHVzaChydG4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhydG5PYmopLmxlbmd0aCA9PT0gcnRuQXJyLmxlbmd0aCA/IHJ0bkFyciA6IHJ0bk9iajtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrQXNzaWduKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2tBc3NpZ24nLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoLi4ub2JqZWN0cykge1xuICAgICAgcmV0dXJuIFNLLmFzc2lnbi5hcHBseSh0aGlzLCBfLmNvbmNhdCh0aGlzLCBvYmplY3RzKSk7XG4gICAgfVxuICB9KTtcbn1cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za0ZpbHRlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrRmlsdGVyJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwgZmlsdGVyRnVuYykge1xuICAgICAgbGV0IHJ0biA9IHt9O1xuICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaCgoJGtleSkgPT4ge1xuICAgICAgICBsZXQgdG1wVmFsID0gdGhpc1ska2V5XTtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWx0ZXJGdW5jKSAmJiBmaWx0ZXJGdW5jKCRrZXksIHRtcFZhbCwgdGhpcykpIHtcbiAgICAgICAgICBydG5bJGtleV0gPSAocmVjdXJzaXZlICYmIChfLmlzQXJyYXkodG1wVmFsKSB8fCBfLmlzUGxhaW5PYmplY3QodG1wVmFsKSkpID8gdG1wVmFsLnNrRmlsdGVyKHJlY3Vyc2l2ZSwgZmlsdGVyRnVuYykgOiB0bXBWYWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICoge2E6MixiOlszLHtjOjQsZDpbNSx7fV19XX0gLT4ge2E6MixiOntza0lkeDA6Myxza0lkeDE6e2M6NCxkOntza0lkeDA6NSxza0lkeDE6e319fX19XG4gKi9cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za09iaikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrT2JqJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwga2V5RnVuYyA9IF9za0tleUZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goKCRrZXkpID0+IHtcbiAgICAgICAgbGV0IHRtcFZhbCA9IHRoaXNbJGtleV07XG4gICAgICAgIHJ0blska2V5XSA9IChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSh0bXBWYWwpIHx8IF8uaXNQbGFpbk9iamVjdCh0bXBWYWwpKSkgPyB0bXBWYWwuc2tPYmoocmVjdXJzaXZlLCBrZXlGdW5jKSA6IHRtcFZhbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrVmFsKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2tWYWwnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoc3RyLCB2YWwpIHtcbiAgICAgIGxldCBydG4gPSB0aGlzO1xuICAgICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnLicpO1xuICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICg7IGlkeCA8IGFyci5sZW5ndGggLSAxOyBpZHgrKykge1xuICAgICAgICAgIGlmIChydG5bYXJyW2lkeF1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJ0blthcnJbaWR4XV0gPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcnRuID0gcnRuW2FycltpZHhdXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnRuKSB7XG4gICAgICAgICAgcnRuW2FycltpZHhdXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGlkeCA8IGFyci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgcnRuID0gcnRuW2FycltpZHhdXTtcbiAgICAgICAgICBpZiAocnRuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrVmFscykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrVmFscycsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5tYXAoKCRrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXNbJGtleV07XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrQmxhbmspIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0JsYW5rID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRyaW0oKS5sZW5ndGggPT09IDA7XG4gIH07XG59XG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc2tDdXJyZW5jeUZtdCkge1xuICBTdHJpbmcucHJvdG90eXBlLnNrQ3VycmVuY3lGbXQgPSBmdW5jdGlvbiAoZnJhY3Rpb24pIHtcbiAgICBmcmFjdGlvbiA9IGZyYWN0aW9uID4gMCAmJiBmcmFjdGlvbiA8PSAyMCA/IGZyYWN0aW9uIDogMjtcbiAgICBsZXQgYXJyID0gKHBhcnNlRmxvYXQodGhpcy5yZXBsYWNlKC9bXlxcZFxcLi1dL2csICcnKSkudG9GaXhlZChmcmFjdGlvbikgKyAnJykuc3BsaXQoJy4nKTtcbiAgICByZXR1cm4gYXJyWzBdLnJlcGxhY2UoLyhcXGQpKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJyQxLCcpICsgJy4nICsgYXJyWzFdO1xuICB9O1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrRW1wdHkpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCA9PT0gMDtcbiAgfTtcbn1cbmlmICghU3RyaW5nLnByb3RvdHlwZS5za0ZtdCkge1xuICBTdHJpbmcucHJvdG90eXBlLnNrRm10ID0gZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oXFwkXFx7XFx3KyhcXC5cXHcrKSpcXH0pL2csICgkcmVwbGFjZW1lbnQpID0+IHsvLy8oXFx7XFx3K1xcLlxcfSkvZ1xuICAgICAgcmV0dXJuIG8uc2tWYWwoJHJlcGxhY2VtZW50LnJlcGxhY2UoJyR7JywgJycpLnJlcGxhY2UoJ30nLCAnJykpO1xuICAgIH0pO1xuICB9O1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrRm10QXJyKSB7XG4gIFN0cmluZy5wcm90b3R5cGUuc2tGbXRBcnIgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9cXCQoXFxkKykvZywgKCRtYXRjaCwgJHAxKSA9PiB7XG4gICAgICByZXR1cm4gYXJyYXlbLS0kcDFdO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTSyB7XG4gIHN0YXRpYyBDSEFSX0FNUEVSU0FORCA9ICcmJztcbiAgc3RhdGljIENIQVJfQU5HTEUgPSAn4oigJztcbiAgc3RhdGljIENIQVJfQVBQUk9YSU1BVEVMWSA9ICfiiYgnO1xuICBzdGF0aWMgQ0hBUl9BUlJPVyA9ICfihpInO1xuICBzdGF0aWMgQ0hBUl9BU1RFUklTSyA9ICcqJztcbiAgc3RhdGljIENIQVJfQkFDS1NMQVNIID0gJ1xcXFwnO1xuICBzdGF0aWMgQ0hBUl9DRUxTSVVTID0gJ+KEgyc7XG4gIHN0YXRpYyBDSEFSX0NJUkNMRSA9ICfiipknO1xuICBzdGF0aWMgQ0hBUl9DSVJDVU1GRVJFTkNFID0gJ+KXiyc7XG4gIHN0YXRpYyBDSEFSX0NMT1NFX0JSQUNFID0gJ30nO1xuICBzdGF0aWMgQ0hBUl9DTE9TRV9CUkFDS0VUID0gJ10nO1xuICBzdGF0aWMgQ0hBUl9DTE9TRV9QQVJFTlRIRVNJUyA9ICcpJztcbiAgc3RhdGljIENIQVJfQ09MT04gPSAnOic7XG4gIHN0YXRpYyBDSEFSX0NPTU1BID0gJywnO1xuICBzdGF0aWMgQ0hBUl9EQVNIID0gJy0nO1xuICBzdGF0aWMgQ0hBUl9ERUdSRUUgPSAnwrAnO1xuICBzdGF0aWMgQ0hBUl9ESVZJREUgPSAnw7cnO1xuICBzdGF0aWMgQ0hBUl9ET1QgPSAnLic7XG4gIHN0YXRpYyBDSEFSX0RPVUJMRV9RVU9UQVRJT04gPSAnXCInO1xuICBzdGF0aWMgQ0hBUl9FUVVBTCA9ICc9JztcbiAgc3RhdGljIENIQVJfRVFVQUxfQVBQUk9YSU1BVEVMWSA9ICfiiYwnO1xuICBzdGF0aWMgQ0hBUl9FUVVJVkFMRU5UID0gJ+KJoSc7XG4gIHN0YXRpYyBDSEFSX0VYQ0xBTUFUSU9OID0gJyEnO1xuICBzdGF0aWMgQ0hBUl9IRU5DRSA9ICfiiLQnO1xuICBzdGF0aWMgQ0hBUl9JTkZJTklUWSA9ICfiiJ4nO1xuICBzdGF0aWMgQ0hBUl9JTlRFR1JBTCA9ICfiiKsnO1xuICBzdGF0aWMgQ0hBUl9JTlRFUlNFQ1RJT04gPSAn4oipJztcbiAgc3RhdGljIENIQVJfTEVTUyA9ICc8JztcbiAgc3RhdGljIENIQVJfTEVTU19FUVVBTCA9ICfiiaQnO1xuICBzdGF0aWMgQ0hBUl9NSU5VUyA9ICctJztcbiAgc3RhdGljIENIQVJfTUlOVVRFID0gJ+KAsic7XG4gIHN0YXRpYyBDSEFSX01VTFRJUExZID0gJ8OXJztcbiAgc3RhdGljIENIQVJfTU9SRSA9ICc+JztcbiAgc3RhdGljIENIQVJfTU9SRV9FUVVBTCA9ICfiiaUnO1xuICBzdGF0aWMgQ0hBUl9OT1RfRVFVQUwgPSAn4omgJztcbiAgc3RhdGljIENIQVJfTk9UX0xFU1MgPSAn4omuJztcbiAgc3RhdGljIENIQVJfTk9UX01PUkUgPSAn4omvJztcbiAgc3RhdGljIENIQVJfT1BFTl9CUkFDRSA9ICd7JztcbiAgc3RhdGljIENIQVJfT1BFTl9CUkFDS0VUID0gJ1snO1xuICBzdGF0aWMgQ0hBUl9PUEVOX1BBUkVOVEhFU0lTID0gJygnO1xuICBzdGF0aWMgQ0hBUl9QQVJBTExFTCA9ICfigJYnO1xuICBzdGF0aWMgQ0hBUl9QRVJDRU5UID0gJyUnO1xuICBzdGF0aWMgQ0hBUl9QRVJNSUxMID0gJ+KAsCc7XG4gIHN0YXRpYyBDSEFSX1BFUlBFTkRJQ1VMQVIgPSAn4oqlJztcbiAgc3RhdGljIENIQVJfUEkgPSAnz4AnO1xuICBzdGF0aWMgQ0hBUl9QTFVTID0gJysnO1xuICBzdGF0aWMgQ0hBUl9QTFVTX01JTlVTID0gJ8KxJztcbiAgc3RhdGljIENIQVJfUE9VTkQgPSAnIyc7XG4gIHN0YXRpYyBDSEFSX1BST1BPUlRJT04gPSAn4oi3JztcbiAgc3RhdGljIENIQVJfUVVFU1RJT04gPSAnPyc7XG4gIHN0YXRpYyBDSEFSX1NFQ09ORCA9ICfjgIMnO1xuICBzdGF0aWMgQ0hBUl9TRUNUSU9OID0gJ8KnJztcbiAgc3RhdGljIENIQVJfU0VNSUNJUkNMRSA9ICfijJInO1xuICBzdGF0aWMgQ0hBUl9TRU1JQ09MT04gPSAnOyc7XG4gIHN0YXRpYyBDSEFSX1NJR01BID0gJ+KIkSc7XG4gIHN0YXRpYyBDSEFSX1NJTkNFID0gJ+KItSc7XG4gIHN0YXRpYyBDSEFSX1NJTkdMRV9RVU9UQVRJT04gPSAnXFwnJztcbiAgc3RhdGljIENIQVJfU0xBU0ggPSAnLyc7XG4gIHN0YXRpYyBDSEFSX1NRVUFSRSA9ICfiiJonO1xuICBzdGF0aWMgQ0hBUl9UUklBTkdMRSA9ICfilrMnO1xuICBzdGF0aWMgQ0hBUl9VTkRFUkxJTkUgPSAnXyc7XG4gIHN0YXRpYyBDSEFSX1VOSU9OID0gJ+KIqic7XG4gIHN0YXRpYyBDSEFSX1ZBUklFUyA9ICfiiJ0nO1xuICBzdGF0aWMgQ0hBUl9WRVJUSUNBTCA9ICd8JztcblxuICBzdGF0aWMgRklMRV9UWVBFX0hUTUwgPSAnaHRtbCc7XG4gIHN0YXRpYyBGSUxFX1RZUEVfSFRNTF9XSVRIX1BPSU5UID0gU0suQ0hBUl9ET1QgKyBTSy5GSUxFX1RZUEVfSFRNTDtcbiAgc3RhdGljIEZJTEVfVFlQRV9KU09OID0gJ2pzb24nO1xuICBzdGF0aWMgRklMRV9UWVBFX0pTT05fV0lUSF9QT0lOVCA9IFNLLkNIQVJfRE9UICsgU0suRklMRV9UWVBFX0pTT047XG5cbiAgc3RhdGljIFJFUVVFU1RfTUVUSE9EX1BPU1QgPSAnUE9TVCc7XG4gIHN0YXRpYyBSRVFVRVNUX01FVEhPRF9ERUxFVEUgPSAnREVMRVRFJztcbiAgc3RhdGljIFJFUVVFU1RfTUVUSE9EX1BVVCA9ICdQVVQnO1xuICBzdGF0aWMgUkVRVUVTVF9NRVRIT0RfR0VUID0gJ0dFVCc7XG5cbiAgc3RhdGljIEpTX0tFWVdPUkRfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuXG4gIHN0YXRpYyBFTVBUWSA9ICcnO1xuICBzdGF0aWMgU1RSX0RFRkFVTFQgPSAnZGVmYXVsdCc7XG4gIHN0YXRpYyBTVFJfRVJST1IgPSAnZXJyb3InO1xuICBzdGF0aWMgU1RSX0xBTkdVQUdFID0gJ2xhbmd1YWdlJztcblxuICBzdGF0aWMgRU5WX0RFViA9ICdERVYnO1xuICBzdGF0aWMgRU5WX1RFU1QgPSAnVEVTVCc7XG4gIHN0YXRpYyBFTlZfUFJPRCA9ICdQUk9EJztcblxuICBzdGF0aWMgQ09OVEVYVF9QQVRIID0gU0suRU1QVFk7XG4gIHN0YXRpYyBERUZBVUxUX0RPTUFJTiA9ICckc2snO1xuICBzdGF0aWMgREVGQVVMVF9FTlYgPSB7fTtcbiAgc3RhdGljIERFRkFVTFRfTEFOR1VBR0UgPSAnZW5fVVMnO1xuICBzdGF0aWMgREVGQVVMVF9NT01FTlRfREFURSA9ICdZWVlZLU1NLUREJztcbiAgc3RhdGljIERFRkFVTFRfTU9NRU5UX0RBVEVUSU1FID0gJ1lZWVktTU0tREQgSEg6bW06c3MnO1xuICBzdGF0aWMgREVGQVVMVF9NT01FTlRfVElNRSA9ICdISDptbTpzcyc7XG5cbiAgLyoqXG4gICAqIE5ldyBvciBnZXQgbmFtZXNwYWNlIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9ICQgbmFtZXNwYWNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpbml0VmFsIGluaXQgdmFsdWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGVudiB3aW5kb3coYnJvd3Nlcikgb3IgZ2xvYmFsKG5vZGVqcykgZXRjLlxuICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICAgKi9cbiAgc3RhdGljICQoJCA9IFNLLkRFRkFVTFRfRE9NQUlOLCBpbml0VmFsID0ge30sIGVudiA9IFNLLkRFRkFVTFRfRU5WKSB7XG4gICAgaWYgKCFlbnZbJF0pIHtcbiAgICAgIGVudlskXSA9IGluaXRWYWw7XG4gICAgfSBlbHNlIGlmICghXy5pc0VtcHR5KGluaXRWYWwpKSB7XG4gICAgICBlbnZbJF0gPSBpbml0VmFsO1xuICAgIH1cbiAgICByZXR1cm4gZW52WyRdO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlZmF1bHQgb2YgYXNzaWduV2l0aCdzIGN1c3RvbWl6ZXJcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMgeyp8dW5kZWZpbmVkfVxuICAgKiBAc2VlIF8uYXNzaWduV2l0aFxuICAgKi9cbiAgc3RhdGljIF9za0Fzc2lnbkN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgcmV0dXJuIFNLLmFyZVBsYWluT2JqZWN0KG9ialZhbHVlLCBzcmNWYWx1ZSwgb2JqZWN0LCBzb3VyY2UpID8gU0suYXNzaWduKG9ialZhbHVlLCBzcmNWYWx1ZSkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogeHh4LmNvbSxhLGIgPT4geHh4LmNvbT9hPWJcbiAgICogeHh4LmNvbT9hPWIsYSxjID0+IHh4eC5jb20/YT1jXG4gICAqIHh4eC5jb20/YT1iLGMsZCA9PiB4eHguY29tP2E9YiZjPWRcbiAgICpcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcGFyYW0gcGFyYW1cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgYXBwZW5kUGFyYW1ldGVyKHVybCwgcGFyYW0sIHZhbHVlKSB7XG4gICAgaWYgKHVybC5pbmRleE9mKFNLLkNIQVJfUVVFU1RJT04pID09IC0xKSB7XG4gICAgICByZXR1cm4gdXJsICsgU0suQ0hBUl9RVUVTVElPTiArIHBhcmFtICsgU0suQ0hBUl9FUVVBTCArIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY3VycmVudFZhbHVlID0gU0suZ2V0UmVxdWVzdFBhcmFtZXRlcihwYXJhbSwgdXJsLnNwbGl0KFNLLkNIQVJfUVVFU1RJT04pWzFdKTtcbiAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKHBhcmFtICsgU0suQ0hBUl9FUVVBTCArIGN1cnJlbnRWYWx1ZSwgcGFyYW0gKyBTSy5DSEFSX0VRVUFMICsgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVybCArIFNLLkNIQVJfQU1QRVJTQU5EICsgcGFyYW0gKyBTSy5DSEFSX0VRVUFMICsgdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB2YWx1ZXMgYXJlIHBsYWluIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBzZWUgXy5pc1BsYWluT2JqZWN0XG4gICAqL1xuICBzdGF0aWMgYXJlUGxhaW5PYmplY3QoLi4udmFsdWVzKSB7XG4gICAgbGV0IHJ0biA9IHRydWU7XG4gICAgdmFsdWVzLmZvckVhY2goKCRpdGVtKSA9PiB7XG4gICAgICBydG4gPSBydG4gJiYgXy5pc1BsYWluT2JqZWN0KCRpdGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcnRuO1xuICB9XG5cbiAgLyoqXG4gICAqIGxldCBvMSA9IHthOlt7J2InOjF9LCdjJywyXSwgZDp7ZTozfX07XG4gICAqIGxldCBvMiA9IHthOlt7J3gnOjEwfSwneScsMjBdLCBkOnt6OjMwfX07XG4gICAqIGxldCBvMyA9ICQuZXh0ZW5kKHRydWUsbzEsbzIpO1xuICAgKiBKU09OLnN0cmluZ2lmeShvMyk7Ly97XCJhXCI6W3tcImJcIjoxLFwieFwiOjEwfSxcInlcIiwyMF0sXCJkXCI6e1wiZVwiOjMsXCJ6XCI6MzB9fVxuICAgKiBvMSA9PSBvMzsvL3RydWVcbiAgICogbzEgPT09IG8zOy8vdHJ1ZVxuICAgKlxuICAgKiBsZXQgbzEgPSB7YTpbeydiJzoxfSwnYycsMl0sIGQ6e2U6M319O1xuICAgKiBsZXQgbzIgPSB7YTpbeyd4JzoxMH0sJ3knLDIwXSwgZDp7ejozMH19O1xuICAgKiBsZXQgbzMgPSBfLmFzc2lnbihvMSxvMik7XG4gICAqIEpTT04uc3RyaW5naWZ5KG8zKTsvL3tcImFcIjpbe1wieFwiOjEwfSxcInlcIiwyMF0sXCJkXCI6e1wielwiOjMwfX1cbiAgICogbzEgPT0gbzM7Ly90cnVlXG4gICAqIG8xID09PSBvMzsvL3RydWVcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBvYmplY3RzIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogbGV0IG8xID0ge2E6W3snYic6MX0sJ2MnLDJdLCBkOntlOjN9fTtcbiAgICogbGV0IG8yID0ge2E6W3sneCc6MTB9LCd5JywyMF0sIGQ6e3o6MzB9fTtcbiAgICogbGV0IG8zID0gU0suYXNzaWduKG8xLG8yKTtcbiAgICogSlNPTi5zdHJpbmdpZnkobzMpOy8ve1wiYVwiOlt7XCJ4XCI6MTB9LFwieVwiLDIwXSxcImRcIjp7XCJlXCI6MyxcInpcIjozMH19XG4gICAqIG8xID09IG8zOy8vdHJ1ZVxuICAgKiBvMSA9PT0gbzM7Ly90cnVlXG4gICAqL1xuICBzdGF0aWMgYXNzaWduKG9iamVjdCwgLi4ub2JqZWN0cykge1xuICAgIHJldHVybiBfLmFzc2lnbldpdGguYXBwbHkodGhpcywgXy5jb25jYXQob2JqZWN0LCBvYmplY3RzLCBTSy5fc2tBc3NpZ25DdXN0b21pemVyKSk7XG4gIH1cblxuICAvKipcbiAgICogY29va2llU3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBjb29raWVzKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIENvb2tpZXMucmVtb3ZlKGtleSk7XG4gICAgICByZXR1cm4gQ29va2llcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb29raWVzLmdldChrZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gYXJyYXlcbiAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGFub3RoZXJBcnJheVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29uY2F0XG4gICAqIEByZXR1cm5zIHtBcnJheXxzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGRlc2NhcnRlcyhbJ2FsZXJ0JywnYnRuJ10sWydzdWNjZXNzJywnaW5mbyddKTsvL1snYWxlcnQtc3VjY2VzcycsJ2FsZXJ0LWluZm8nLCdidG4tc3VjY2VzcycsJ2J0bi1pbmZvJ11cbiAgICogZGVzY2FydGVzKCdhbGVydCcsJ2xpbmsnLCctJyk7Ly8nYWxlcnQtbGluaydcbiAgICovXG4gIHN0YXRpYyBkZXNjYXJ0ZXMoYXJyYXkgPSBbXSwgYW5vdGhlckFycmF5ID0gW10sIGNvbmNhdCA9IFNLLkNIQVJfREFTSCkge1xuICAgIGxldCBhcnIxID0gQXJyYXkuaXNBcnJheShhcnJheSkgPyBhcnJheSA6IFthcnJheV07XG4gICAgbGV0IGFycjIgPSBBcnJheS5pc0FycmF5KGFub3RoZXJBcnJheSkgPyBhbm90aGVyQXJyYXkgOiBbYW5vdGhlckFycmF5XTtcbiAgICBsZXQgcnRuID0gW107XG4gICAgYXJyMS5mb3JFYWNoKCgkaXRlbSkgPT4ge1xuICAgICAgYXJyMi5mb3JFYWNoKCgkJGl0ZW0pID0+IHtcbiAgICAgICAgcnRuLnB1c2goJGl0ZW0gKyBjb25jYXQgKyAkJGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gcnRuLmxlbmd0aCA9PT0gMSA/IHJ0blswXSA6IHJ0bjtcbiAgfVxuXG4gIHN0YXRpYyBlbXB0eUZ1bmMoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiB0aGUgdXJsIG9mIHBhZ2Ugb3Igc3ViIGZyYW1lIHBhZ2VcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRDdXJyZW50SHJlZigpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIH1cblxuICAvKipcbiAgICogbGFuZ3VhZ2UgaW4gY29va2llcyBpZiBleGlzdCwgZWxzZSBkZWZhdXRsXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuICAgIGxldCBsYW5ndWFnZSA9IFNLLmNvb2tpZXMoU0suU1RSX0xBTkdVQUdFKTtcbiAgICByZXR1cm4gbGFuZ3VhZ2UgPyBsYW5ndWFnZSA6IFNLLkRFRkFVTFRfTEFOR1VBR0U7XG4gIH1cblxuICAvKipcbiAgICogd2luZG93LmxvY2F0aW9uLm9yaWdpblxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldEN1cnJlbnRPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gIH1cblxuICAvKipcbiAgICogL2EvYiAtPiAvYS9iXG4gICAqIC9hL2IvYy5odG1sIC0+IC9hL2IvY1xuICAgKiAvY29udGV4dC9hIC0+IC9hXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0Q3VycmVudFBhdGgoKSB7XG4gICAgdmFyIHBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgcGF0aCA9IHBhdGguc3Vic3RyaW5nKFNLLkNPTlRFWFRfUEFUSC5sZW5ndGgsIHBhdGgubGVuZ3RoKTtcbiAgICBwYXRoID0gXy5lbmRzV2l0aChwYXRoLCBTSy5GSUxFX1RZUEVfSFRNTF9XSVRIX1BPSU5UKSA/IHBhdGguc3Vic3RyaW5nKDAsIHBhdGgubGVuZ3RoIC0gNSkgOiBwYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqID9hPTEmYj0yXG4gICAqXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGdldEN1cnJlbnRTZWFyY2goKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIH1cblxuICAvKipcbiAgICogKGEsP2E9MSZiPTIpIC0+IDFcbiAgICpcbiAgICogQHBhcmFtIHBhcmFtXG4gICAqIEBwYXJhbSBzZWFyY2hcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgZ2V0UmVxdWVzdFBhcmFtZXRlcihwYXJhbSwgc2VhcmNoKSB7XG4gICAgc2VhcmNoID0gc2VhcmNoIHx8IFNLLmdldEN1cnJlbnRTZWFyY2goKTtcbiAgICBzZWFyY2ggPSBfLnN0YXJ0c1dpdGgoc2VhcmNoLCBTSy5DSEFSX1FVRVNUSU9OKSA/IHNlYXJjaC5zbGljZSgxKSA6IHNlYXJjaDtcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cCgnKF58JiknICsgcGFyYW0gKyAnPShbXiZdKikoJnwkKScpO1xuICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcbiAgICByZXR1cm4gciA/IGRlY29kZVVSSUNvbXBvbmVudChyWzJdKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiAvYS9iIC0+IFsnLycsJy9hLycsJy9hL2IvJ11cbiAgICpcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgc3RhdGljIGdldFN1YlBhdGhzKHBhdGgpIHtcbiAgICBsZXQgcnRuID0gW1NLLkNIQVJfU0xBU0hdO1xuICAgIHBhdGguc3BsaXQoU0suQ0hBUl9TTEFTSCkucmVkdWNlKCgkYWNjdW11bGF0b3IsICRpdGVtKSA9PiB7XG4gICAgICBpZiAoU0suczRzKCRpdGVtKSA9PT0gU0suRU1QVFkpIHtcbiAgICAgICAgcmV0dXJuICRhY2N1bXVsYXRvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0bXBWYWxpZFBhdGggPSBTSy5nZXRWYWxpZFBhdGgoJGFjY3VtdWxhdG9yICsgJGl0ZW0pO1xuICAgICAgICBydG4ucHVzaCh0bXBWYWxpZFBhdGgpO1xuICAgICAgICByZXR1cm4gdG1wVmFsaWRQYXRoO1xuICAgICAgfVxuICAgIH0sIFNLLkVNUFRZKTtcbiAgICByZXR1cm4gcnRuO1xuICB9XG5cbiAgLyoqXG4gICAqIGEvYi9jIC0+IC9hL2IvYy9cbiAgICpcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRWYWxpZFBhdGgocGF0aCkge1xuICAgIHJldHVybiAoXy5zdGFydHNXaXRoKHBhdGgsIFNLLkNIQVJfU0xBU0gpID8gU0suRU1QVFkgOiBTSy5DSEFSX1NMQVNIKSArIHBhdGggKyAoXy5lbmRzV2l0aChwYXRoLCBTSy5DSEFSX1NMQVNIKSA/IFNLLkVNUFRZIDogU0suQ0hBUl9TTEFTSCk7XG4gIH1cblxuICAvKipcbiAgICogbG9jYWxTdG9yYWdlXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgbG9jYWwoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogd2ViIHJlZGlyZWN0XG4gICAqXG4gICAqIEBwYXJhbSB1cmxcbiAgICovXG4gIHN0YXRpYyByZWRpcmVjdCh1cmwpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGFycmF5IGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHM0YSh2YWx1ZSwgZGVmYXVsdFZhbHVlID0gW10pIHtcbiAgICByZXR1cm4gXy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhZmUgYm9vbGVhbiBmb3IgdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtib29sZWFufSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgczRiKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSBmYWxzZSkge1xuICAgIHJldHVybiBfLmlzQm9vbGVhbih2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGRhdGUgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7RGF0ZX0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtEYXRlfVxuICAgKi9cbiAgc3RhdGljIHM0ZCh2YWx1ZSwgZGVmYXVsdFZhbHVlID0gbmV3IERhdGUoKSkge1xuICAgIHJldHVybiBfLmlzRGF0ZSh2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGZpbml0ZSBudW1iZXIgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIHN0YXRpYyBzNG4odmFsdWUsIGRlZmF1bHRWYWx1ZSA9IDApIHtcbiAgICByZXR1cm4gXy5pc0Zpbml0ZShfLnRvTnVtYmVyKHZhbHVlKSkgPyBfLnRvTnVtYmVyKHZhbHVlKSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIHBsYWluIG9iamVjdCBmb3IgdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRWYWx1ZVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBzdGF0aWMgczRvKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSB7fSkge1xuICAgIHJldHVybiBfLmlzUGxhaW5PYmplY3QodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBzdHJpbmcgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBzNHModmFsdWUsIGRlZmF1bHRWYWx1ZSA9IFNLLkVNUFRZKSB7XG4gICAgcmV0dXJuIChfLmlzQm9vbGVhbih2YWx1ZSkgfHwgXy5pc0Zpbml0ZSh2YWx1ZSkgfHwgXy5pc1N0cmluZyh2YWx1ZSkpID8gU3RyaW5nKHZhbHVlKSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXNzaW9uU3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNlc3Npb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwcGVyIGZpcnN0IGNoYXJcbiAgICpcbiAgICogQHBhcmFtIHdvcmRzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIHVwcGVyV29yZHNGaXJzdENoYXIoJ2xpc3QnKTsvL0xpc3RcbiAgICogdXBwZXJXb3Jkc0ZpcnN0Q2hhcigneGkgbkFuIHNoaSB5b3UgeFVlIHl1YW4gY2hpbmEgcGVvcGxlJyk7Ly9YaSBOQW4gU2hpIFlvdSBYVWUgWXVhbiBDaGluYSBQZW9wbGVcbiAgICovXG4gIHN0YXRpYyB1cHBlcldvcmRzRmlyc3RDaGFyKHdvcmRzKSB7XG4gICAgcmV0dXJuIF8udG9TdHJpbmcod29yZHMpLnJlcGxhY2UoL1xcc1thLXpdL2csICgkbm9uRmlyc3RXb3JkKSA9PiB7XG4gICAgICByZXR1cm4gJG5vbkZpcnN0V29yZC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pLnJlcGxhY2UoL15bYS16XS8sICgkZmlyc3RXb3JkKSA9PiB7XG4gICAgICByZXR1cm4gJGZpcnN0V29yZC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pXG4gIH1cbn1cbiJdfQ==