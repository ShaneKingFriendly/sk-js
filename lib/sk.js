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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNrLmpzIl0sIm5hbWVzIjpbIl9za0tleUZ1bmMiLCJrZXkiLCJpdGVtIiwiY29udGV4dCIsImlzUGxhaW5PYmplY3QiLCJzdGFydHNXaXRoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJza0FyciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwidmFsdWUiLCJyZWN1cnNpdmUiLCJrZXlGdW5jIiwicnRuIiwiZm9yRWFjaCIsIiRpdGVtIiwicHVzaCIsImlzQXJyYXkiLCJza0ZpbHRlciIsImZpbHRlckZ1bmMiLCIkaW5kZXgiLCJpc0Z1bmN0aW9uIiwic2tPYmoiLCJza1JtdiIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJza1RvZ2dsZSIsIk51bWJlciIsInNrQ3VycmVuY3lGbXQiLCJmcmFjdGlvbiIsIlN0cmluZyIsInJ0bkFyciIsInJ0bk9iaiIsImtleXMiLCIka2V5IiwidG1wVmFsIiwibGVuZ3RoIiwic2tBc3NpZ24iLCJvYmplY3RzIiwiU0siLCJhc3NpZ24iLCJhcHBseSIsImNvbmNhdCIsInNrVmFsIiwic3RyIiwidmFsIiwiYXJyIiwic3BsaXQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJza1ZhbHMiLCJtYXAiLCJza0JsYW5rIiwidHJpbSIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwidG9GaXhlZCIsInNrRW1wdHkiLCJza0ZtdCIsIm8iLCIkcmVwbGFjZW1lbnQiLCJza0ZtdEFyciIsImFycmF5IiwiJG1hdGNoIiwiJHAxIiwiJCIsIkRFRkFVTFRfRE9NQUlOIiwiaW5pdFZhbCIsImVudiIsIkRFRkFVTFRfRU5WIiwiaXNFbXB0eSIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJvYmplY3QiLCJzb3VyY2UiLCJhcmVQbGFpbk9iamVjdCIsInVybCIsInBhcmFtIiwiQ0hBUl9RVUVTVElPTiIsIkNIQVJfRVFVQUwiLCJjdXJyZW50VmFsdWUiLCJnZXRSZXF1ZXN0UGFyYW1ldGVyIiwiQ0hBUl9BTVBFUlNBTkQiLCJ2YWx1ZXMiLCJhc3NpZ25XaXRoIiwiX3NrQXNzaWduQ3VzdG9taXplciIsInJlbW92ZSIsInNldCIsImdldCIsImFub3RoZXJBcnJheSIsIkNIQVJfREFTSCIsImFycjEiLCJhcnIyIiwiJCRpdGVtIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibGFuZ3VhZ2UiLCJjb29raWVzIiwiU1RSX0xBTkdVQUdFIiwiREVGQVVMVF9MQU5HVUFHRSIsIm9yaWdpbiIsInBhdGgiLCJwYXRobmFtZSIsInN1YnN0cmluZyIsIkNPTlRFWFRfUEFUSCIsImVuZHNXaXRoIiwiRklMRV9UWVBFX0hUTUxfV0lUSF9QT0lOVCIsInNlYXJjaCIsImdldEN1cnJlbnRTZWFyY2giLCJzbGljZSIsInJlZyIsIlJlZ0V4cCIsInIiLCJzdWJzdHIiLCJtYXRjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsIkNIQVJfU0xBU0giLCJyZWR1Y2UiLCIkYWNjdW11bGF0b3IiLCJzNHMiLCJFTVBUWSIsInRtcFZhbGlkUGF0aCIsImdldFZhbGlkUGF0aCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwiZGVmYXVsdFZhbHVlIiwiaXNCb29sZWFuIiwiRGF0ZSIsImlzRGF0ZSIsImlzRmluaXRlIiwidG9OdW1iZXIiLCJpc1N0cmluZyIsInNlc3Npb25TdG9yYWdlIiwid29yZHMiLCJ0b1N0cmluZyIsIiRub25GaXJzdFdvcmQiLCJ0b1VwcGVyQ2FzZSIsIiRmaXJzdFdvcmQiLCJDSEFSX0FOR0xFIiwiQ0hBUl9BUFBST1hJTUFURUxZIiwiQ0hBUl9BUlJPVyIsIkNIQVJfQVNURVJJU0siLCJDSEFSX0JBQ0tTTEFTSCIsIkNIQVJfQ0VMU0lVUyIsIkNIQVJfQ0lSQ0xFIiwiQ0hBUl9DSVJDVU1GRVJFTkNFIiwiQ0hBUl9DTE9TRV9CUkFDRSIsIkNIQVJfQ0xPU0VfQlJBQ0tFVCIsIkNIQVJfQ0xPU0VfUEFSRU5USEVTSVMiLCJDSEFSX0NPTE9OIiwiQ0hBUl9DT01NQSIsIkNIQVJfREVHUkVFIiwiQ0hBUl9ESVZJREUiLCJDSEFSX0RPVCIsIkNIQVJfRE9VQkxFX1FVT1RBVElPTiIsIkNIQVJfRVFVQUxfQVBQUk9YSU1BVEVMWSIsIkNIQVJfRVFVSVZBTEVOVCIsIkNIQVJfRVhDTEFNQVRJT04iLCJDSEFSX0hFTkNFIiwiQ0hBUl9JTkZJTklUWSIsIkNIQVJfSU5URUdSQUwiLCJDSEFSX0lOVEVSU0VDVElPTiIsIkNIQVJfTEVTUyIsIkNIQVJfTEVTU19FUVVBTCIsIkNIQVJfTUlOVVMiLCJDSEFSX01JTlVURSIsIkNIQVJfTVVMVElQTFkiLCJDSEFSX01PUkUiLCJDSEFSX01PUkVfRVFVQUwiLCJDSEFSX05PVF9FUVVBTCIsIkNIQVJfTk9UX0xFU1MiLCJDSEFSX05PVF9NT1JFIiwiQ0hBUl9PUEVOX0JSQUNFIiwiQ0hBUl9PUEVOX0JSQUNLRVQiLCJDSEFSX09QRU5fUEFSRU5USEVTSVMiLCJDSEFSX1BBUkFMTEVMIiwiQ0hBUl9QRVJDRU5UIiwiQ0hBUl9QRVJNSUxMIiwiQ0hBUl9QRVJQRU5ESUNVTEFSIiwiQ0hBUl9QSSIsIkNIQVJfUExVUyIsIkNIQVJfUExVU19NSU5VUyIsIkNIQVJfUE9VTkQiLCJDSEFSX1BST1BPUlRJT04iLCJDSEFSX1NFQ09ORCIsIkNIQVJfU0VDVElPTiIsIkNIQVJfU0VNSUNJUkNMRSIsIkNIQVJfU0VNSUNPTE9OIiwiQ0hBUl9TSUdNQSIsIkNIQVJfU0lOQ0UiLCJDSEFSX1NJTkdMRV9RVU9UQVRJT04iLCJDSEFSX1NRVUFSRSIsIkNIQVJfVFJJQU5HTEUiLCJDSEFSX1VOREVSTElORSIsIkNIQVJfVU5JT04iLCJDSEFSX1ZBUklFUyIsIkNIQVJfVkVSVElDQUwiLCJGSUxFX1RZUEVfSFRNTCIsIkZJTEVfVFlQRV9KU09OIiwiRklMRV9UWVBFX0pTT05fV0lUSF9QT0lOVCIsIlJFUVVFU1RfTUVUSE9EX1BPU1QiLCJSRVFVRVNUX01FVEhPRF9ERUxFVEUiLCJSRVFVRVNUX01FVEhPRF9QVVQiLCJSRVFVRVNUX01FVEhPRF9HRVQiLCJKU19LRVlXT1JEX0ZVTkNUSU9OIiwiU1RSX0RFRkFVTFQiLCJTVFJfRVJST1IiLCJFTlZfREVWIiwiRU5WX1RFU1QiLCJFTlZfUFJPRCIsIkRFRkFVTFRfTU9NRU5UX0RBVEUiLCJERUZBVUxUX01PTUVOVF9EQVRFVElNRSIsIkRFRkFVTFRfTU9NRU5UX1RJTUUiLCJERUZBVUxUX01PTUVOVF9USU1FWk9ORSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTQSxTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsSUFBekIsRUFBK0JDLE9BQS9CLEVBQXdDO0FBQ3RDLFNBQU8saUJBQUVDLGFBQUYsQ0FBZ0JELE9BQWhCLElBQTJCLGlCQUFFRSxVQUFGLENBQWFKLEdBQWIsRUFBa0IsT0FBbEIsQ0FBM0IsR0FBeUQsVUFBVUEsR0FBMUU7QUFDRDtBQUNEOzs7O0FBSUEsSUFBSSxDQUFDSyxNQUFNQyxTQUFOLENBQWdCQyxLQUFyQixFQUE0QjtBQUMxQkMsU0FBT0MsY0FBUCxDQUFzQkosTUFBTUMsU0FBNUIsRUFBdUMsT0FBdkMsRUFBZ0Q7QUFDOUNJLGNBQVUsSUFEb0M7QUFFOUNDLGdCQUFZLEtBRmtDO0FBRzlDQyxrQkFBYyxJQUhnQztBQUk5Q0MsV0FBTyxlQUFVQyxTQUFWLEVBQTJDO0FBQUEsVUFBdEJDLE9BQXNCLHVFQUFaaEIsVUFBWTs7QUFDaEQsVUFBSWlCLE1BQU0sRUFBVjtBQUNBLFdBQUtDLE9BQUwsQ0FBYSxVQUFDQyxLQUFELEVBQVc7QUFDdEJGLFlBQUlHLElBQUosQ0FBVUwsY0FBYyxpQkFBRU0sT0FBRixDQUFVRixLQUFWLEtBQW9CLGlCQUFFZixhQUFGLENBQWdCZSxLQUFoQixDQUFsQyxDQUFELEdBQThEQSxNQUFNWCxLQUFOLENBQVlPLFNBQVosRUFBdUJDLE9BQXZCLENBQTlELEdBQWdHRyxLQUF6RztBQUNELE9BRkQ7QUFHQSxhQUFPRixHQUFQO0FBQ0Q7QUFWNkMsR0FBaEQ7QUFZRDtBQUNELElBQUksQ0FBQ1gs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WSxHQUFlLEc7QUFQSDFHLEUsQ0FRWjJHLFcsR0FBYyxHO0FBUkYzRyxFLENBU1o0RyxrQixHQUFxQixHO0FBVFQ1RyxFLENBVVo2RyxnQixHQUFtQixHO0FBVlA3RyxFLENBV1o4RyxrQixHQUFxQixHO0FBWFQ5RyxFLENBWVorRyxzQixHQUF5QixHO0FBWmIvRyxFLENBYVpnSCxVLEdBQWEsRztBQWJEaEgsRSxDQWNaaUgsVSxHQUFhLEc7QUFkRGpILEUsQ0FlWm1ELFMsR0FBWSxHO0FBZkFuRCxFLENBZ0Jaa0gsVyxHQUFjLEc7QUFoQkZsSCxFLENBaUJabUgsVyxHQUFjLEc7QUFqQkZuSCxFLENBa0Jab0gsUSxHQUFXLEc7QUFsQkNwSCxFLENBbUJacUgscUIsR0FBd0IsRztBQW5CWnJILEUsQ0FvQlp3QyxVLEdBQWEsRztBQXBCRHhDLEUsQ0FxQlpzSCx3QixHQUEyQixHO0FBckJmdEgsRSxDQXNCWnVILGUsR0FBa0IsRztBQXRCTnZILEUsQ0F1Qlp3SCxnQixHQUFtQixHO0FBdkJQeEgsRSxDQXdCWnlILFUsR0FBYSxHO0FBeEJEekgsRSxDQXlCWjBILGEsR0FBZ0IsRztBQXpCSjFILEUsQ0EwQloySCxhLEdBQWdCLEc7QUExQkozSCxFLENBMkJaNEgsaUIsR0FBb0IsRztBQTNCUjVILEUsQ0E0Qlo2SCxTLEdBQVksRztBQTVCQTdILEUsQ0E2Qlo4SCxlLEdBQWtCLEc7QUE3Qk45SCxFLENBOEJaK0gsVSxHQUFhLEc7QUE5QkQvSCxFLENBK0JaZ0ksVyxHQUFjLEc7QUEvQkZoSSxFLENBZ0NaaUksYSxHQUFnQixHO0FBaENKakksRSxDQWlDWmtJLFMsR0FBWSxHO0FBakNBbEksRSxDQWtDWm1JLGUsR0FBa0IsRztBQWxDTm5JLEUsQ0FtQ1pvSSxjLEdBQWlCLEc7QUFuQ0xwSSxFLENBb0NacUksYSxHQUFnQixHO0FBcENKckksRSxDQXFDWnNJLGEsR0FBZ0IsRztBQXJDSnRJLEUsQ0FzQ1p1SSxlLEdBQWtCLEc7QUF0Q052SSxFLENBdUNad0ksaUIsR0FBb0IsRztBQXZDUnhJLEUsQ0F3Q1p5SSxxQixHQUF3QixHO0FBeENaekksRSxDQXlDWjBJLGEsR0FBZ0IsRztBQXpDSjFJLEUsQ0EwQ1oySSxZLEdBQWUsRztBQTFDSDNJLEUsQ0EyQ1o0SSxZLEdBQWUsRztBQTNDSDVJLEUsQ0E0Q1o2SSxrQixHQUFxQixHO0FBNUNUN0ksRSxDQTZDWjhJLE8sR0FBVSxHO0FBN0NFOUksRSxDQThDWitJLFMsR0FBWSxHO0FBOUNBL0ksRSxDQStDWmdKLGUsR0FBa0IsRztBQS9DTmhKLEUsQ0FnRFppSixVLEdBQWEsRztBQWhERGpKLEUsQ0FpRFprSixlLEdBQWtCLEc7QUFqRE5sSixFLENBa0RadUMsYSxHQUFnQixHO0FBbERKdkMsRSxDQW1EWm1KLFcsR0FBYyxHO0FBbkRGbkosRSxDQW9EWm9KLFksR0FBZSxHO0FBcERIcEosRSxDQXFEWnFKLGUsR0FBa0IsRztBQXJETnJKLEUsQ0FzRFpzSixjLEdBQWlCLEc7QUF0REx0SixFLENBdURadUosVSxHQUFhLEc7QUF2RER2SixFLENBd0Rad0osVSxHQUFhLEc7QUF4RER4SixFLENBeURaeUoscUIsR0FBd0IsSTtBQXpEWnpKLEUsQ0EwRFo4RSxVLEdBQWEsRztBQTFERDlFLEUsQ0EyRFowSixXLEdBQWMsRztBQTNERjFKLEUsQ0E0RFoySixhLEdBQWdCLEc7QUE1REozSixFLENBNkRaNEosYyxHQUFpQixHO0FBN0RMNUosRSxDQThEWjZKLFUsR0FBYSxHO0FBOUREN0osRSxDQStEWjhKLFcsR0FBYyxHO0FBL0RGOUosRSxDQWdFWitKLGEsR0FBZ0IsRztBQWhFSi9KLEUsQ0FrRVpnSyxjLEdBQWlCLE07QUFsRUxoSyxFLENBbUVab0UseUIsR0FBNEJwRSxHQUFHb0gsUUFBSCxHQUFjcEgsR0FBR2dLLGM7QUFuRWpDaEssRSxDQW9FWmlLLGMsR0FBaUIsTTtBQXBFTGpLLEUsQ0FxRVprSyx5QixHQUE0QmxLLEdBQUdvSCxRQUFILEdBQWNwSCxHQUFHaUssYztBQXJFakNqSyxFLENBdUVabUssbUIsR0FBc0IsTTtBQXZFVm5LLEUsQ0F3RVpvSyxxQixHQUF3QixRO0FBeEVacEssRSxDQXlFWnFLLGtCLEdBQXFCLEs7QUF6RVRySyxFLENBMEVac0ssa0IsR0FBcUIsSztBQTFFVHRLLEUsQ0E0RVp1SyxtQixHQUFzQixVO0FBNUVWdkssRSxDQThFWmtGLEssR0FBUSxFO0FBOUVJbEYsRSxDQStFWndLLFcsR0FBYyxTO0FBL0VGeEssRSxDQWdGWnlLLFMsR0FBWSxPO0FBaEZBekssRSxDQWlGWjRELFksR0FBZSxVO0FBakZINUQsRSxDQW1GWjBLLE8sR0FBVSxLO0FBbkZFMUssRSxDQW9GWjJLLFEsR0FBVyxNO0FBcEZDM0ssRSxDQXFGWjRLLFEsR0FBVyxNO0FBckZDNUssRSxDQXVGWmtFLFksR0FBZWxFLEdBQUdrRixLO0FBdkZObEYsRSxDQXdGWjJCLGMsR0FBaUIsSztBQXhGTDNCLEUsQ0F5Rlo4QixXLEdBQWMsRTtBQXpGRjlCLEUsQ0EwRlo2RCxnQixHQUFtQixPO0FBMUZQN0QsRSxDQTJGWjZLLG1CLEdBQXNCLFk7QUEzRlY3SyxFLENBNEZaOEssdUIsR0FBMEIscUI7QUE1RmQ5SyxFLENBNkZaK0ssbUIsR0FBc0IsVTtBQTdGVi9LLEUsQ0E4RlpnTCx1QixHQUEwQixHO2tCQTlGZGhMLEUiLCJmaWxlIjoic2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IENvb2tpZXMgZnJvbSAnanMtY29va2llJztcblxuLyoqXG4gKiBkZWZhdWx0IG9mIGtleSBmdW5jdGlvblxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ga2V5IGluZGV4IG9mIGFycmF5IG9yIHByb3BlcnR5IG5hbWUgb2Ygb2JqZWN0XG4gKiBAcGFyYW0gaXRlbSB2YWx1ZSBvZiBhcnJheSBieSBpbmRleCBvciB2YWx1ZSBvZiBvYmplY3QgYnkgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIGNvbnRleHQgYXJyYXkgb3Igb2JqZWN0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gX3NrS2V5RnVuYyhrZXksIGl0ZW0sIGNvbnRleHQpIHtcbiAgcmV0dXJuIF8uaXNQbGFpbk9iamVjdChjb250ZXh0KSA/IF8uc3RhcnRzV2l0aChrZXksICdza0lkeCcpIDogKCdza0lkeCcgKyBrZXkpO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzIse3NrSWR4MDozLHNrSWR4MTpbNCx7c2tJZHgwOjUsc2tJZHgxOltdfV19XSAtPiBbMixbMyxbNCxbNSxbXV1dXV1cbiAqL1xuaWYgKCFBcnJheS5wcm90b3R5cGUuc2tBcnIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3NrQXJyJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwga2V5RnVuYyA9IF9za0tleUZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSBbXTtcbiAgICAgIHRoaXMuZm9yRWFjaCgoJGl0ZW0pID0+IHtcbiAgICAgICAgcnRuLnB1c2goKHJlY3Vyc2l2ZSAmJiAoXy5pc0FycmF5KCRpdGVtKSB8fCBfLmlzUGxhaW5PYmplY3QoJGl0ZW0pKSkgPyAkaXRlbS5za0FycihyZWN1cnNpdmUsIGtleUZ1bmMpIDogJGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcnRuO1xuICAgIH1cbiAgfSk7XG59XG5pZiAoIUFycmF5LnByb3RvdHlwZS5za0ZpbHRlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tGaWx0ZXInLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAocmVjdXJzaXZlLCBmaWx0ZXJGdW5jKSB7XG4gICAgICBsZXQgcnRuID0gW107XG4gICAgICB0aGlzLmZvckVhY2goKCRpdGVtLCAkaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWx0ZXJGdW5jKSAmJiBmaWx0ZXJGdW5jKCRpbmRleCwgJGl0ZW0sIHRoaXMpKSB7XG4gICAgICAgICAgcnRuLnB1c2goKHJlY3Vyc2l2ZSAmJiAoXy5pc0FycmF5KCRpdGVtKSB8fCBfLmlzUGxhaW5PYmplY3QoJGl0ZW0pKSkgPyAkaXRlbS5za0ZpbHRlcihyZWN1cnNpdmUsIGZpbHRlckZ1bmMpIDogJGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzEse2E6MixiOlszLHtjOjQsZDpbNSx7fV19XX1dIC0+IHtza0lkeDA6MSxza0lkeDE6e2E6MixiOntza0lkeDA6Myxza0lkeDE6e2M6NCxkOntza0lkeDA6NSxza0lkeDE6e319fX19fVxuICovXG5pZiAoIUFycmF5LnByb3RvdHlwZS5za09iaikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tPYmonLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAocmVjdXJzaXZlLCBrZXlGdW5jID0gX3NrS2V5RnVuYykge1xuICAgICAgbGV0IHJ0biA9IHt9O1xuICAgICAgdGhpcy5mb3JFYWNoKCgkaXRlbSwgJGluZGV4KSA9PiB7XG4gICAgICAgIHJ0bltfLmlzRnVuY3Rpb24oa2V5RnVuYykgPyBrZXlGdW5jKCRpbmRleCwgJGl0ZW0sIHRoaXMpIDogJGluZGV4XSA9IChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSgkaXRlbSkgfHwgXy5pc1BsYWluT2JqZWN0KCRpdGVtKSkpID8gJGl0ZW0uc2tPYmoocmVjdXJzaXZlLCBrZXlGdW5jKSA6ICRpdGVtO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcnRuO1xuICAgIH1cbiAgfSk7XG59XG4vKipcbiAqIEBleGFtcGxlXG4gKiBbMSwyLDNdLnNrUm12KDIpIC0+IFsxLDNdXG4gKi9cbmlmICghQXJyYXkucHJvdG90eXBlLnNrUm12KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdza1JtdicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBsZXQgaWR4ID0gdGhpcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzEsMiwzXS5za1RvZ2dsZSgyKSAtPiBbMSwzXVxuICogWzEsM10uc2tUb2dnbGUoMikgLT4gWzEsMywyXVxuICovXG5pZiAoIUFycmF5LnByb3RvdHlwZS5za1RvZ2dsZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tUb2dnbGUnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbGV0IGlkeCA9IHRoaXMuaW5kZXhPZihpdGVtKTtcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqICg5ODc2NTQuMzIxKS5za0N1cnJlbmN5Rm10KDIpIC0+IDk4Nyw2NTQuMzJcbiAqL1xuaWYgKCFOdW1iZXIucHJvdG90eXBlLnNrQ3VycmVuY3lGbXQpIHtcbiAgTnVtYmVyLnByb3RvdHlwZS5za0N1cnJlbmN5Rm10ID0gZnVuY3Rpb24gKGZyYWN0aW9uKSB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzKS5za0N1cnJlbmN5Rm10KGZyYWN0aW9uKTtcbiAgfTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqIHtza0lkeDA6MSxza0lkeDE6WzIse3NrSWR4MDozLHNrSWR4MTpbNCx7c2tJZHgwOjUsc2tJZHgxOltdfV19XX0gLT4gWzEsWzIsWzMsWzQsWzUsW11dXV1dXVxuICovXG5pZiAoIU9iamVjdC5wcm90b3R5cGUuc2tBcnIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdza0FycicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChyZWN1cnNpdmUsIGtleUZ1bmMgPSBfc2tLZXlGdW5jKSB7XG4gICAgICBsZXQgcnRuQXJyID0gW107XG4gICAgICBsZXQgcnRuT2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKCgka2V5KSA9PiB7XG4gICAgICAgIGxldCB0bXBWYWwgPSB0aGlzWyRrZXldO1xuICAgICAgICBsZXQgcnRuID0gKHJlY3Vyc2l2ZSAmJiAoXy5pc1BsYWluT2JqZWN0KHRtcFZhbCkgfHwgXy5pc0FycmF5KHRtcFZhbCkpKSA/IHRtcFZhbC5za0FycihyZWN1cnNpdmUsIGtleUZ1bmMpIDogdG1wVmFsO1xuXG4gICAgICAgIHJ0bk9ialska2V5XSA9IHJ0bjtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihrZXlGdW5jKSAmJiBrZXlGdW5jKCRrZXksIHRtcFZhbCwgdGhpcykpIHtcbiAgICAgICAgICBydG5BcnIucHVzaChydG4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhydG5PYmopLmxlbmd0aCA9PT0gcnRuQXJyLmxlbmd0aCA/IHJ0bkFyciA6IHJ0bk9iajtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrQXNzaWduKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2tBc3NpZ24nLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoLi4ub2JqZWN0cykge1xuICAgICAgcmV0dXJuIFNLLmFzc2lnbi5hcHBseSh0aGlzLCBfLmNvbmNhdCh0aGlzLCBvYmplY3RzKSk7XG4gICAgfVxuICB9KTtcbn1cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za0ZpbHRlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrRmlsdGVyJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwgZmlsdGVyRnVuYykge1xuICAgICAgbGV0IHJ0biA9IHt9O1xuICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaCgoJGtleSkgPT4ge1xuICAgICAgICBsZXQgdG1wVmFsID0gdGhpc1ska2V5XTtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWx0ZXJGdW5jKSAmJiBmaWx0ZXJGdW5jKCRrZXksIHRtcFZhbCwgdGhpcykpIHtcbiAgICAgICAgICBydG5bJGtleV0gPSAocmVjdXJzaXZlICYmIChfLmlzQXJyYXkodG1wVmFsKSB8fCBfLmlzUGxhaW5PYmplY3QodG1wVmFsKSkpID8gdG1wVmFsLnNrRmlsdGVyKHJlY3Vyc2l2ZSwgZmlsdGVyRnVuYykgOiB0bXBWYWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICoge2E6MixiOlszLHtjOjQsZDpbNSx7fV19XX0gLT4ge2E6MixiOntza0lkeDA6Myxza0lkeDE6e2M6NCxkOntza0lkeDA6NSxza0lkeDE6e319fX19XG4gKi9cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za09iaikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrT2JqJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwga2V5RnVuYyA9IF9za0tleUZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goKCRrZXkpID0+IHtcbiAgICAgICAgbGV0IHRtcFZhbCA9IHRoaXNbJGtleV07XG4gICAgICAgIHJ0blska2V5XSA9IChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSh0bXBWYWwpIHx8IF8uaXNQbGFpbk9iamVjdCh0bXBWYWwpKSkgPyB0bXBWYWwuc2tPYmoocmVjdXJzaXZlLCBrZXlGdW5jKSA6IHRtcFZhbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrVmFsKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2tWYWwnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoc3RyLCB2YWwpIHtcbiAgICAgIGxldCBydG4gPSB0aGlzO1xuICAgICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnLicpO1xuICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICg7IGlkeCA8IGFyci5sZW5ndGggLSAxOyBpZHgrKykge1xuICAgICAgICAgIGlmIChydG5bYXJyW2lkeF1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJ0blthcnJbaWR4XV0gPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcnRuID0gcnRuW2FycltpZHhdXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnRuKSB7XG4gICAgICAgICAgcnRuW2FycltpZHhdXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGlkeCA8IGFyci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgcnRuID0gcnRuW2FycltpZHhdXTtcbiAgICAgICAgICBpZiAocnRuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrVmFscykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrVmFscycsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5tYXAoKCRrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXNbJGtleV07XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrQmxhbmspIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0JsYW5rID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRyaW0oKS5sZW5ndGggPT09IDA7XG4gIH07XG59XG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc2tDdXJyZW5jeUZtdCkge1xuICBTdHJpbmcucHJvdG90eXBlLnNrQ3VycmVuY3lGbXQgPSBmdW5jdGlvbiAoZnJhY3Rpb24pIHtcbiAgICBmcmFjdGlvbiA9IGZyYWN0aW9uID49IDAgJiYgZnJhY3Rpb24gPD0gMjAgPyBmcmFjdGlvbiA6IDI7XG4gICAgbGV0IGFyciA9IChwYXJzZUZsb2F0KHRoaXMucmVwbGFjZSgvW15cXGRcXC4tXS9nLCAnJykpLnRvRml4ZWQoZnJhY3Rpb24pICsgJycpLnNwbGl0KCcuJyk7XG4gICAgcmV0dXJuIGFyclswXS5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyg/IVxcZCkpL2csICckMSwnKSArIChmcmFjdGlvbiA9PSAwID8gJycgOiAoJy4nICsgYXJyWzFdKSk7XG4gIH07XG59XG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc2tFbXB0eSkge1xuICBTdHJpbmcucHJvdG90eXBlLnNrRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoID09PSAwO1xuICB9O1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrRm10KSB7XG4gIFN0cmluZy5wcm90b3R5cGUuc2tGbXQgPSBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyhcXCRcXHtcXHcrKFxcLlxcdyspKlxcfSkvZywgKCRyZXBsYWNlbWVudCkgPT4gey8vLyhcXHtcXHcrXFwuXFx9KS9nXG4gICAgICByZXR1cm4gby5za1ZhbCgkcmVwbGFjZW1lbnQucmVwbGFjZSgnJHsnLCAnJykucmVwbGFjZSgnfScsICcnKSk7XG4gICAgfSk7XG4gIH07XG59XG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc2tGbXRBcnIpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0ZtdEFyciA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL1xcJChcXGQrKS9nLCAoJG1hdGNoLCAkcDEpID0+IHtcbiAgICAgIHJldHVybiBhcnJheVstLSRwMV07XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNLIHtcbiAgc3RhdGljIENIQVJfQU1QRVJTQU5EID0gJyYnO1xuICBzdGF0aWMgQ0hBUl9BTkdMRSA9ICfiiKAnO1xuICBzdGF0aWMgQ0hBUl9BUFBST1hJTUFURUxZID0gJ+KJiCc7XG4gIHN0YXRpYyBDSEFSX0FSUk9XID0gJ+KGkic7XG4gIHN0YXRpYyBDSEFSX0FTVEVSSVNLID0gJyonO1xuICBzdGF0aWMgQ0hBUl9CQUNLU0xBU0ggPSAnXFxcXCc7XG4gIHN0YXRpYyBDSEFSX0NFTFNJVVMgPSAn4oSDJztcbiAgc3RhdGljIENIQVJfQ0lSQ0xFID0gJ+KKmSc7XG4gIHN0YXRpYyBDSEFSX0NJUkNVTUZFUkVOQ0UgPSAn4peLJztcbiAgc3RhdGljIENIQVJfQ0xPU0VfQlJBQ0UgPSAnfSc7XG4gIHN0YXRpYyBDSEFSX0NMT1NFX0JSQUNLRVQgPSAnXSc7XG4gIHN0YXRpYyBDSEFSX0NMT1NFX1BBUkVOVEhFU0lTID0gJyknO1xuICBzdGF0aWMgQ0hBUl9DT0xPTiA9ICc6JztcbiAgc3RhdGljIENIQVJfQ09NTUEgPSAnLCc7XG4gIHN0YXRpYyBDSEFSX0RBU0ggPSAnLSc7XG4gIHN0YXRpYyBDSEFSX0RFR1JFRSA9ICfCsCc7XG4gIHN0YXRpYyBDSEFSX0RJVklERSA9ICfDtyc7XG4gIHN0YXRpYyBDSEFSX0RPVCA9ICcuJztcbiAgc3RhdGljIENIQVJfRE9VQkxFX1FVT1RBVElPTiA9ICdcIic7XG4gIHN0YXRpYyBDSEFSX0VRVUFMID0gJz0nO1xuICBzdGF0aWMgQ0hBUl9FUVVBTF9BUFBST1hJTUFURUxZID0gJ+KJjCc7XG4gIHN0YXRpYyBDSEFSX0VRVUlWQUxFTlQgPSAn4omhJztcbiAgc3RhdGljIENIQVJfRVhDTEFNQVRJT04gPSAnISc7XG4gIHN0YXRpYyBDSEFSX0hFTkNFID0gJ+KItCc7XG4gIHN0YXRpYyBDSEFSX0lORklOSVRZID0gJ+KInic7XG4gIHN0YXRpYyBDSEFSX0lOVEVHUkFMID0gJ+KIqyc7XG4gIHN0YXRpYyBDSEFSX0lOVEVSU0VDVElPTiA9ICfiiKknO1xuICBzdGF0aWMgQ0hBUl9MRVNTID0gJzwnO1xuICBzdGF0aWMgQ0hBUl9MRVNTX0VRVUFMID0gJ+KJpCc7XG4gIHN0YXRpYyBDSEFSX01JTlVTID0gJy0nO1xuICBzdGF0aWMgQ0hBUl9NSU5VVEUgPSAn4oCyJztcbiAgc3RhdGljIENIQVJfTVVMVElQTFkgPSAnw5cnO1xuICBzdGF0aWMgQ0hBUl9NT1JFID0gJz4nO1xuICBzdGF0aWMgQ0hBUl9NT1JFX0VRVUFMID0gJ+KJpSc7XG4gIHN0YXRpYyBDSEFSX05PVF9FUVVBTCA9ICfiiaAnO1xuICBzdGF0aWMgQ0hBUl9OT1RfTEVTUyA9ICfiia4nO1xuICBzdGF0aWMgQ0hBUl9OT1RfTU9SRSA9ICfiia8nO1xuICBzdGF0aWMgQ0hBUl9PUEVOX0JSQUNFID0gJ3snO1xuICBzdGF0aWMgQ0hBUl9PUEVOX0JSQUNLRVQgPSAnWyc7XG4gIHN0YXRpYyBDSEFSX09QRU5fUEFSRU5USEVTSVMgPSAnKCc7XG4gIHN0YXRpYyBDSEFSX1BBUkFMTEVMID0gJ+KAlic7XG4gIHN0YXRpYyBDSEFSX1BFUkNFTlQgPSAnJSc7XG4gIHN0YXRpYyBDSEFSX1BFUk1JTEwgPSAn4oCwJztcbiAgc3RhdGljIENIQVJfUEVSUEVORElDVUxBUiA9ICfiiqUnO1xuICBzdGF0aWMgQ0hBUl9QSSA9ICfPgCc7XG4gIHN0YXRpYyBDSEFSX1BMVVMgPSAnKyc7XG4gIHN0YXRpYyBDSEFSX1BMVVNfTUlOVVMgPSAnwrEnO1xuICBzdGF0aWMgQ0hBUl9QT1VORCA9ICcjJztcbiAgc3RhdGljIENIQVJfUFJPUE9SVElPTiA9ICfiiLcnO1xuICBzdGF0aWMgQ0hBUl9RVUVTVElPTiA9ICc/JztcbiAgc3RhdGljIENIQVJfU0VDT05EID0gJ+OAgyc7XG4gIHN0YXRpYyBDSEFSX1NFQ1RJT04gPSAnwqcnO1xuICBzdGF0aWMgQ0hBUl9TRU1JQ0lSQ0xFID0gJ+KMkic7XG4gIHN0YXRpYyBDSEFSX1NFTUlDT0xPTiA9ICc7JztcbiAgc3RhdGljIENIQVJfU0lHTUEgPSAn4oiRJztcbiAgc3RhdGljIENIQVJfU0lOQ0UgPSAn4oi1JztcbiAgc3RhdGljIENIQVJfU0lOR0xFX1FVT1RBVElPTiA9ICdcXCcnO1xuICBzdGF0aWMgQ0hBUl9TTEFTSCA9ICcvJztcbiAgc3RhdGljIENIQVJfU1FVQVJFID0gJ+KImic7XG4gIHN0YXRpYyBDSEFSX1RSSUFOR0xFID0gJ+KWsyc7XG4gIHN0YXRpYyBDSEFSX1VOREVSTElORSA9ICdfJztcbiAgc3RhdGljIENIQVJfVU5JT04gPSAn4oiqJztcbiAgc3RhdGljIENIQVJfVkFSSUVTID0gJ+KInSc7XG4gIHN0YXRpYyBDSEFSX1ZFUlRJQ0FMID0gJ3wnO1xuXG4gIHN0YXRpYyBGSUxFX1RZUEVfSFRNTCA9ICdodG1sJztcbiAgc3RhdGljIEZJTEVfVFlQRV9IVE1MX1dJVEhfUE9JTlQgPSBTSy5DSEFSX0RPVCArIFNLLkZJTEVfVFlQRV9IVE1MO1xuICBzdGF0aWMgRklMRV9UWVBFX0pTT04gPSAnanNvbic7XG4gIHN0YXRpYyBGSUxFX1RZUEVfSlNPTl9XSVRIX1BPSU5UID0gU0suQ0hBUl9ET1QgKyBTSy5GSUxFX1RZUEVfSlNPTjtcblxuICBzdGF0aWMgUkVRVUVTVF9NRVRIT0RfUE9TVCA9ICdQT1NUJztcbiAgc3RhdGljIFJFUVVFU1RfTUVUSE9EX0RFTEVURSA9ICdERUxFVEUnO1xuICBzdGF0aWMgUkVRVUVTVF9NRVRIT0RfUFVUID0gJ1BVVCc7XG4gIHN0YXRpYyBSRVFVRVNUX01FVEhPRF9HRVQgPSAnR0VUJztcblxuICBzdGF0aWMgSlNfS0VZV09SRF9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG5cbiAgc3RhdGljIEVNUFRZID0gJyc7XG4gIHN0YXRpYyBTVFJfREVGQVVMVCA9ICdkZWZhdWx0JztcbiAgc3RhdGljIFNUUl9FUlJPUiA9ICdlcnJvcic7XG4gIHN0YXRpYyBTVFJfTEFOR1VBR0UgPSAnbGFuZ3VhZ2UnO1xuXG4gIHN0YXRpYyBFTlZfREVWID0gJ0RFVic7XG4gIHN0YXRpYyBFTlZfVEVTVCA9ICdURVNUJztcbiAgc3RhdGljIEVOVl9QUk9EID0gJ1BST0QnO1xuXG4gIHN0YXRpYyBDT05URVhUX1BBVEggPSBTSy5FTVBUWTtcbiAgc3RhdGljIERFRkFVTFRfRE9NQUlOID0gJyRzayc7XG4gIHN0YXRpYyBERUZBVUxUX0VOViA9IHt9O1xuICBzdGF0aWMgREVGQVVMVF9MQU5HVUFHRSA9ICdlbl9VUyc7XG4gIHN0YXRpYyBERUZBVUxUX01PTUVOVF9EQVRFID0gJ1lZWVktTU0tREQnO1xuICBzdGF0aWMgREVGQVVMVF9NT01FTlRfREFURVRJTUUgPSAnWVlZWS1NTS1ERCBISDptbTpzcyc7XG4gIHN0YXRpYyBERUZBVUxUX01PTUVOVF9USU1FID0gJ0hIOm1tOnNzJztcbiAgc3RhdGljIERFRkFVTFRfTU9NRU5UX1RJTUVaT05FID0gJ1onO1xuXG4gIC8qKlxuICAgKiBOZXcgb3IgZ2V0IG5hbWVzcGFjZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAkIG5hbWVzcGFjZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaW5pdFZhbCBpbml0IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnYgd2luZG93KGJyb3dzZXIpIG9yIGdsb2JhbChub2RlanMpIGV0Yy5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAgICovXG4gIHN0YXRpYyAkKCQgPSBTSy5ERUZBVUxUX0RPTUFJTiwgaW5pdFZhbCA9IHt9LCBlbnYgPSBTSy5ERUZBVUxUX0VOVikge1xuICAgIGlmICghZW52WyRdKSB7XG4gICAgICBlbnZbJF0gPSBpbml0VmFsO1xuICAgIH0gZWxzZSBpZiAoIV8uaXNFbXB0eShpbml0VmFsKSkge1xuICAgICAgZW52WyRdID0gaW5pdFZhbDtcbiAgICB9XG4gICAgcmV0dXJuIGVudlskXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZWZhdWx0IG9mIGFzc2lnbldpdGgncyBjdXN0b21pemVyXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHsqfHVuZGVmaW5lZH1cbiAgICogQHNlZSBfLmFzc2lnbldpdGhcbiAgICovXG4gIHN0YXRpYyBfc2tBc3NpZ25DdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgIHJldHVybiBTSy5hcmVQbGFpbk9iamVjdChvYmpWYWx1ZSwgc3JjVmFsdWUsIG9iamVjdCwgc291cmNlKSA/IFNLLmFzc2lnbihvYmpWYWx1ZSwgc3JjVmFsdWUpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIHh4eC5jb20sYSxiID0+IHh4eC5jb20/YT1iXG4gICAqIHh4eC5jb20/YT1iLGEsYyA9PiB4eHguY29tP2E9Y1xuICAgKiB4eHguY29tP2E9YixjLGQgPT4geHh4LmNvbT9hPWImYz1kXG4gICAqXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIHBhcmFtXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGFwcGVuZFBhcmFtZXRlcih1cmwsIHBhcmFtLCB2YWx1ZSkge1xuICAgIGlmICh1cmwuaW5kZXhPZihTSy5DSEFSX1FVRVNUSU9OKSA9PSAtMSkge1xuICAgICAgcmV0dXJuIHVybCArIFNLLkNIQVJfUVVFU1RJT04gKyBwYXJhbSArIFNLLkNIQVJfRVFVQUwgKyB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IFNLLmdldFJlcXVlc3RQYXJhbWV0ZXIocGFyYW0sIHVybC5zcGxpdChTSy5DSEFSX1FVRVNUSU9OKVsxXSk7XG4gICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB1cmwucmVwbGFjZShwYXJhbSArIFNLLkNIQVJfRVFVQUwgKyBjdXJyZW50VmFsdWUsIHBhcmFtICsgU0suQ0hBUl9FUVVBTCArIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB1cmwgKyBTSy5DSEFSX0FNUEVSU0FORCArIHBhcmFtICsgU0suQ0hBUl9FUVVBTCArIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdmFsdWVzIGFyZSBwbGFpbiBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKiBAc2VlIF8uaXNQbGFpbk9iamVjdFxuICAgKi9cbiAgc3RhdGljIGFyZVBsYWluT2JqZWN0KC4uLnZhbHVlcykge1xuICAgIGxldCBydG4gPSB0cnVlO1xuICAgIHZhbHVlcy5mb3JFYWNoKCgkaXRlbSkgPT4ge1xuICAgICAgcnRuID0gcnRuICYmIF8uaXNQbGFpbk9iamVjdCgkaXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJ0bjtcbiAgfVxuXG4gIC8qKlxuICAgKiBsZXQgbzEgPSB7YTpbeydiJzoxfSwnYycsMl0sIGQ6e2U6M319O1xuICAgKiBsZXQgbzIgPSB7YTpbeyd4JzoxMH0sJ3knLDIwXSwgZDp7ejozMH19O1xuICAgKiBsZXQgbzMgPSAkLmV4dGVuZCh0cnVlLG8xLG8yKTtcbiAgICogSlNPTi5zdHJpbmdpZnkobzMpOy8ve1wiYVwiOlt7XCJiXCI6MSxcInhcIjoxMH0sXCJ5XCIsMjBdLFwiZFwiOntcImVcIjozLFwielwiOjMwfX1cbiAgICogbzEgPT0gbzM7Ly90cnVlXG4gICAqIG8xID09PSBvMzsvL3RydWVcbiAgICpcbiAgICogbGV0IG8xID0ge2E6W3snYic6MX0sJ2MnLDJdLCBkOntlOjN9fTtcbiAgICogbGV0IG8yID0ge2E6W3sneCc6MTB9LCd5JywyMF0sIGQ6e3o6MzB9fTtcbiAgICogbGV0IG8zID0gXy5hc3NpZ24obzEsbzIpO1xuICAgKiBKU09OLnN0cmluZ2lmeShvMyk7Ly97XCJhXCI6W3tcInhcIjoxMH0sXCJ5XCIsMjBdLFwiZFwiOntcInpcIjozMH19XG4gICAqIG8xID09IG8zOy8vdHJ1ZVxuICAgKiBvMSA9PT0gbzM7Ly90cnVlXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgKiBAcGFyYW0gey4uLk9iamVjdH0gb2JqZWN0cyBUaGUgc291cmNlIG9iamVjdHMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGxldCBvMSA9IHthOlt7J2InOjF9LCdjJywyXSwgZDp7ZTozfX07XG4gICAqIGxldCBvMiA9IHthOlt7J3gnOjEwfSwneScsMjBdLCBkOnt6OjMwfX07XG4gICAqIGxldCBvMyA9IFNLLmFzc2lnbihvMSxvMik7XG4gICAqIEpTT04uc3RyaW5naWZ5KG8zKTsvL3tcImFcIjpbe1wieFwiOjEwfSxcInlcIiwyMF0sXCJkXCI6e1wiZVwiOjMsXCJ6XCI6MzB9fVxuICAgKiBvMSA9PSBvMzsvL3RydWVcbiAgICogbzEgPT09IG8zOy8vdHJ1ZVxuICAgKi9cbiAgc3RhdGljIGFzc2lnbihvYmplY3QsIC4uLm9iamVjdHMpIHtcbiAgICByZXR1cm4gXy5hc3NpZ25XaXRoLmFwcGx5KHRoaXMsIF8uY29uY2F0KG9iamVjdCwgb2JqZWN0cywgU0suX3NrQXNzaWduQ3VzdG9taXplcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvb2tpZVN0b3JhZ2VcbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgY29va2llcyhrZXksIHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBDb29raWVzLnJlbW92ZShrZXkpO1xuICAgICAgcmV0dXJuIENvb2tpZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29va2llcy5nZXQoa2V5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGFycmF5XG4gICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhbm90aGVyQXJyYXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmNhdFxuICAgKiBAcmV0dXJucyB7QXJyYXl8c3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBkZXNjYXJ0ZXMoWydhbGVydCcsJ2J0biddLFsnc3VjY2VzcycsJ2luZm8nXSk7Ly9bJ2FsZXJ0LXN1Y2Nlc3MnLCdhbGVydC1pbmZvJywnYnRuLXN1Y2Nlc3MnLCdidG4taW5mbyddXG4gICAqIGRlc2NhcnRlcygnYWxlcnQnLCdsaW5rJywnLScpOy8vJ2FsZXJ0LWxpbmsnXG4gICAqL1xuICBzdGF0aWMgZGVzY2FydGVzKGFycmF5ID0gW10sIGFub3RoZXJBcnJheSA9IFtdLCBjb25jYXQgPSBTSy5DSEFSX0RBU0gpIHtcbiAgICBsZXQgYXJyMSA9IEFycmF5LmlzQXJyYXkoYXJyYXkpID8gYXJyYXkgOiBbYXJyYXldO1xuICAgIGxldCBhcnIyID0gQXJyYXkuaXNBcnJheShhbm90aGVyQXJyYXkpID8gYW5vdGhlckFycmF5IDogW2Fub3RoZXJBcnJheV07XG4gICAgbGV0IHJ0biA9IFtdO1xuICAgIGFycjEuZm9yRWFjaCgoJGl0ZW0pID0+IHtcbiAgICAgIGFycjIuZm9yRWFjaCgoJCRpdGVtKSA9PiB7XG4gICAgICAgIHJ0bi5wdXNoKCRpdGVtICsgY29uY2F0ICsgJCRpdGVtKTtcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIHJ0bi5sZW5ndGggPT09IDEgPyBydG5bMF0gOiBydG47XG4gIH1cblxuICBzdGF0aWMgZW1wdHlGdW5jKCkge1xuXG4gIH1cblxuICAvKipcbiAgICogdGhlIHVybCBvZiBwYWdlIG9yIHN1YiBmcmFtZSBwYWdlXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0Q3VycmVudEhyZWYoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIGxhbmd1YWdlIGluIGNvb2tpZXMgaWYgZXhpc3QsIGVsc2UgZGVmYXV0bFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldEN1cnJlbnRMYW5ndWFnZSgpIHtcbiAgICBsZXQgbGFuZ3VhZ2UgPSBTSy5jb29raWVzKFNLLlNUUl9MQU5HVUFHRSk7XG4gICAgcmV0dXJuIGxhbmd1YWdlID8gbGFuZ3VhZ2UgOiBTSy5ERUZBVUxUX0xBTkdVQUdFO1xuICB9XG5cbiAgLyoqXG4gICAqIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW5cbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRDdXJyZW50T3JpZ2luKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICB9XG5cbiAgLyoqXG4gICAqIC9hL2IgLT4gL2EvYlxuICAgKiAvYS9iL2MuaHRtbCAtPiAvYS9iL2NcbiAgICogL2NvbnRleHQvYSAtPiAvYVxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldEN1cnJlbnRQYXRoKCkge1xuICAgIHZhciBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZyhTSy5DT05URVhUX1BBVEgubGVuZ3RoLCBwYXRoLmxlbmd0aCk7XG4gICAgcGF0aCA9IF8uZW5kc1dpdGgocGF0aCwgU0suRklMRV9UWVBFX0hUTUxfV0lUSF9QT0lOVCkgPyBwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxlbmd0aCAtIDUpIDogcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiA/YT0xJmI9MlxuICAgKlxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBnZXRDdXJyZW50U2VhcmNoKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICB9XG5cbiAgLyoqXG4gICAqIChhLD9hPTEmYj0yKSAtPiAxXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbVxuICAgKiBAcGFyYW0gc2VhcmNoXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGdldFJlcXVlc3RQYXJhbWV0ZXIocGFyYW0sIHNlYXJjaCkge1xuICAgIHNlYXJjaCA9IHNlYXJjaCB8fCBTSy5nZXRDdXJyZW50U2VhcmNoKCk7XG4gICAgc2VhcmNoID0gXy5zdGFydHNXaXRoKHNlYXJjaCwgU0suQ0hBUl9RVUVTVElPTikgPyBzZWFyY2guc2xpY2UoMSkgOiBzZWFyY2g7XG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoJyhefCYpJyArIHBhcmFtICsgJz0oW14mXSopKCZ8JCknKTtcbiAgICB2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XG4gICAgcmV0dXJuIHIgPyBkZWNvZGVVUklDb21wb25lbnQoclsyXSkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogL2EvYiAtPiBbJy8nLCcvYS8nLCcvYS9iLyddXG4gICAqXG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG4gIHN0YXRpYyBnZXRTdWJQYXRocyhwYXRoKSB7XG4gICAgbGV0IHJ0biA9IFtTSy5DSEFSX1NMQVNIXTtcbiAgICBwYXRoLnNwbGl0KFNLLkNIQVJfU0xBU0gpLnJlZHVjZSgoJGFjY3VtdWxhdG9yLCAkaXRlbSkgPT4ge1xuICAgICAgaWYgKFNLLnM0cygkaXRlbSkgPT09IFNLLkVNUFRZKSB7XG4gICAgICAgIHJldHVybiAkYWNjdW11bGF0b3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdG1wVmFsaWRQYXRoID0gU0suZ2V0VmFsaWRQYXRoKCRhY2N1bXVsYXRvciArICRpdGVtKTtcbiAgICAgICAgcnRuLnB1c2godG1wVmFsaWRQYXRoKTtcbiAgICAgICAgcmV0dXJuIHRtcFZhbGlkUGF0aDtcbiAgICAgIH1cbiAgICB9LCBTSy5FTVBUWSk7XG4gICAgcmV0dXJuIHJ0bjtcbiAgfVxuXG4gIC8qKlxuICAgKiBhL2IvYyAtPiAvYS9iL2MvXG4gICAqXG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0VmFsaWRQYXRoKHBhdGgpIHtcbiAgICByZXR1cm4gKF8uc3RhcnRzV2l0aChwYXRoLCBTSy5DSEFSX1NMQVNIKSA/IFNLLkVNUFRZIDogU0suQ0hBUl9TTEFTSCkgKyBwYXRoICsgKF8uZW5kc1dpdGgocGF0aCwgU0suQ0hBUl9TTEFTSCkgPyBTSy5FTVBUWSA6IFNLLkNIQVJfU0xBU0gpO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvY2FsU3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIGxvY2FsKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHdlYiByZWRpcmVjdFxuICAgKlxuICAgKiBAcGFyYW0gdXJsXG4gICAqL1xuICBzdGF0aWMgcmVkaXJlY3QodXJsKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBhcnJheSBmb3IgdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtBcnJheX0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyBzNGEodmFsdWUsIGRlZmF1bHRWYWx1ZSA9IFtdKSB7XG4gICAgcmV0dXJuIF8uaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGJvb2xlYW4gZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIHM0Yih2YWx1ZSwgZGVmYXVsdFZhbHVlID0gZmFsc2UpIHtcbiAgICByZXR1cm4gXy5pc0Jvb2xlYW4odmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBkYXRlIGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge0RhdGV9IGRlZmF1bHRWYWx1ZVxuICAgKiBAcmV0dXJucyB7RGF0ZX1cbiAgICovXG4gIHN0YXRpYyBzNGQodmFsdWUsIGRlZmF1bHRWYWx1ZSA9IG5ldyBEYXRlKCkpIHtcbiAgICByZXR1cm4gXy5pc0RhdGUodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBmaW5pdGUgbnVtYmVyIGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgczRuKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSAwKSB7XG4gICAgcmV0dXJuIF8uaXNGaW5pdGUoXy50b051bWJlcih2YWx1ZSkpID8gXy50b051bWJlcih2YWx1ZSkgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBwbGFpbiBvYmplY3QgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgc3RhdGljIHM0byh2YWx1ZSwgZGVmYXVsdFZhbHVlID0ge30pIHtcbiAgICByZXR1cm4gXy5pc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhZmUgc3RyaW5nIGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgczRzKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSBTSy5FTVBUWSkge1xuICAgIHJldHVybiAoXy5pc0Jvb2xlYW4odmFsdWUpIHx8IF8uaXNGaW5pdGUodmFsdWUpIHx8IF8uaXNTdHJpbmcodmFsdWUpKSA/IFN0cmluZyh2YWx1ZSkgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogc2Vzc2lvblN0b3JhZ2VcbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHN0YXRpYyBzZXNzaW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1cHBlciBmaXJzdCBjaGFyXG4gICAqXG4gICAqIEBwYXJhbSB3b3Jkc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiB1cHBlcldvcmRzRmlyc3RDaGFyKCdsaXN0Jyk7Ly9MaXN0XG4gICAqIHVwcGVyV29yZHNGaXJzdENoYXIoJ3hpIG5BbiBzaGkgeW91IHhVZSB5dWFuIGNoaW5hIHBlb3BsZScpOy8vWGkgTkFuIFNoaSBZb3UgWFVlIFl1YW4gQ2hpbmEgUGVvcGxlXG4gICAqL1xuICBzdGF0aWMgdXBwZXJXb3Jkc0ZpcnN0Q2hhcih3b3Jkcykge1xuICAgIHJldHVybiBfLnRvU3RyaW5nKHdvcmRzKS5yZXBsYWNlKC9cXHNbYS16XS9nLCAoJG5vbkZpcnN0V29yZCkgPT4ge1xuICAgICAgcmV0dXJuICRub25GaXJzdFdvcmQudG9VcHBlckNhc2UoKTtcbiAgICB9KS5yZXBsYWNlKC9eW2Etel0vLCAoJGZpcnN0V29yZCkgPT4ge1xuICAgICAgcmV0dXJuICRmaXJzdFdvcmQudG9VcHBlckNhc2UoKTtcbiAgICB9KVxuICB9XG59XG4iXX0=