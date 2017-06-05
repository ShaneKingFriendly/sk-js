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
 * [1,2,3].skToggle(2) -> [1,3]
 * [1,3].skToggle(2) -> [1,3,2]
 */
if (!Array.prototype.skToggle) {
  Object.defineProperty(Array.prototype, 'skToggle', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function value(item) {
      var tmpIdx = this.indexOf(item);
      if (tmpIdx > -1) {
        this.splice(tmpIdx, 1);
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
     * Append parameter to url
     * @param url
     * @param param
     * @param value
     * @returns {string}
     */

  }, {
    key: 'appendParameter',
    value: function appendParameter(url, param, value) {
      return url + ((url.indexOf(SK.CHAR_QUESTION) == -1 ? SK.CHAR_QUESTION : SK.CHAR_AMPERSAND) + param + SK.CHAR_EQUAL + value);
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
      var concat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SK.CHAR_DASH;

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
     *
     * @returns {string}
     */

  }, {
    key: 'getCurrentHref',
    value: function getCurrentHref() {
      return window.location.href;
    }
  }, {
    key: 'getCurrentLanguage',
    value: function getCurrentLanguage() {
      var language = SK.cookies(SK.COOKIE_LANGUAGE);
      return language ? language : SK.DEFAULT_LANGUAGE;
    }

    /**
     *
     * @returns {string}
     */

  }, {
    key: 'getCurrentPath',
    value: function getCurrentPath() {
      var path = window.location.pathname;
      path = path.substring(SK.CONTEXT_PATH.length, path.length);
      path = _lodash2.default.endsWith(path, '.html') ? path.substring(0, path.length - 5) : path;
      return path;
    }

    /**
     *
     * @returns {*}
     */

  }, {
    key: 'getCurrentSearch',
    value: function getCurrentSearch() {
      return window.location.search;
    }

    /**
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
     *
     * @param path
     * @returns {string[]}
     */

  }, {
    key: 'getSubPaths',
    value: function getSubPaths(path) {
      var rtn = ['/'];
      path.split(SK.CHAR_SLASH).reduce(function (pre, cur) {
        if (SK.s4s(cur) === '') {
          return pre;
        } else {
          var validPath = SK.getValidPath(pre + cur);
          rtn.push(validPath);
          return validPath;
        }
      }, '');
      return rtn;
    }

    /**
     *
     * @param path
     * @returns {string}
     */

  }, {
    key: 'getValidPath',
    value: function getValidPath(path) {
      return (_lodash2.default.startsWith(path, SK.CHAR_SLASH) ? '' : SK.CHAR_SLASH) + path + (_lodash2.default.endsWith(path, SK.CHAR_SLASH) ? '' : SK.CHAR_SLASH);
    }

    /**
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
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return _lodash2.default.isBoolean(value) || _lodash2.default.isFinite(value) || _lodash2.default.isString(value) ? String(value) : defaultValue;
    }

    /**
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
SK.DEFAULT_DOMAIN = '$sk';
SK.DEFAULT_ENV = {};
SK.COOKIE_LANGUAGE = 'language';
SK.DEFAULT_LANGUAGE = 'en_US';
SK.CONTEXT_PATH = '';
exports.default = SK;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNrLmpzIl0sIm5hbWVzIjpbIl9za0tleUZ1bmMiLCJrZXkiLCJpdGVtIiwiY29udGV4dCIsImlzUGxhaW5PYmplY3QiLCJzdGFydHNXaXRoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJza0FyciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwidmFsdWUiLCJyZWN1cnNpdmUiLCJrZXlGdW5jIiwicnRuIiwiZm9yRWFjaCIsIiRpdGVtIiwicHVzaCIsImlzQXJyYXkiLCJza0ZpbHRlciIsImZpbHRlckZ1bmMiLCIkaW5kZXgiLCJpc0Z1bmN0aW9uIiwic2tPYmoiLCJza1JtdiIsInRtcElkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJza1RvZ2dsZSIsIk51bWJlciIsInNrQ3VycmVuY3lGbXQiLCJmcmFjdGlvbiIsIlN0cmluZyIsInJ0bkFyciIsInJ0bk9iaiIsImtleXMiLCIka2V5IiwidG1wVmFsIiwibGVuZ3RoIiwic2tBc3NpZ24iLCJvYmplY3RzIiwiU0siLCJhc3NpZ24iLCJhcHBseSIsImNvbmNhdCIsInNrVmFsIiwic3RyIiwidmFsIiwidG1wQXJyIiwic3BsaXQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJza1ZhbHMiLCJtYXAiLCJza0JsYW5rIiwidHJpbSIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwidG9GaXhlZCIsInNrRW1wdHkiLCJza0ZtdCIsIm8iLCIkbWF0Y2hlZCIsInNrRm10QXJyIiwiYSIsIiRfIiwiJG0iLCIkIiwiREVGQVVMVF9ET01BSU4iLCJpbml0VmFsIiwiZW52IiwiREVGQVVMVF9FTlYiLCJpc0VtcHR5Iiwib2JqVmFsdWUiLCJzcmNWYWx1ZSIsIm9iamVjdCIsInNvdXJjZSIsImFyZVBsYWluT2JqZWN0IiwidXJsIiwicGFyYW0iLCJDSEFSX1FVRVNUSU9OIiwiQ0hBUl9BTVBFUlNBTkQiLCJDSEFSX0VRVUFMIiwidmFsdWVzIiwiYXNzaWduV2l0aCIsIl9za0Fzc2lnbkN1c3RvbWl6ZXIiLCJyZW1vdmUiLCJzZXQiLCJnZXQiLCJhcnIxIiwiYXJyMiIsIkNIQVJfREFTSCIsInRtcEFycjEiLCJ0bXBBcnIyIiwiJGVsZTEiLCIkZWxlMiIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImxhbmd1YWdlIiwiY29va2llcyIsIkNPT0tJRV9MQU5HVUFHRSIsIkRFRkFVTFRfTEFOR1VBR0UiLCJwYXRoIiwicGF0aG5hbWUiLCJzdWJzdHJpbmciLCJDT05URVhUX1BBVEgiLCJlbmRzV2l0aCIsInNlYXJjaCIsImdldEN1cnJlbnRTZWFyY2giLCJzbGljZSIsInJlZyIsIlJlZ0V4cCIsInIiLCJzdWJzdHIiLCJtYXRjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsIkNIQVJfU0xBU0giLCJyZWR1Y2UiLCJwcmUiLCJjdXIiLCJzNHMiLCJ2YWxpZFBhdGgiLCJnZXRWYWxpZFBhdGgiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsImRlZmF1bHRWYWx1ZSIsImlzQm9vbGVhbiIsIkRhdGUiLCJpc0RhdGUiLCJpc0Zpbml0ZSIsInRvTnVtYmVyIiwiaXNTdHJpbmciLCJzZXNzaW9uU3RvcmFnZSIsIndvcmQiLCJ0b1N0cmluZyIsIiQxIiwidG9VcHBlckNhc2UiLCJ3b3JkcyIsIiQxMSIsIiQyMSIsIkNIQVJfQU5HTEUiLCJDSEFSX0FQUFJPWElNQVRFTFkiLCJDSEFSX0FSUk9XIiwiQ0hBUl9BU1RFUklTSyIsIkNIQVJfQkFDS1NMQVNIIiwiQ0hBUl9DRUxTSVVTIiwiQ0hBUl9DSVJDTEUiLCJDSEFSX0NJUkNVTUZFUkVOQ0UiLCJDSEFSX0NMT1NFX0JSQUNFIiwiQ0hBUl9DTE9TRV9CUkFDS0VUIiwiQ0hBUl9DTE9TRV9QQVJFTlRIRVNJUyIsIkNIQVJfQ09MT04iLCJDSEFSX0NPTU1BIiwiQ0hBUl9ERUdSRUUiLCJDSEFSX0RJVklERSIsIkNIQVJfRE9UIiwiQ0hBUl9ET1VCTEVfUVVPVEFUSU9OIiwiQ0hBUl9FUVVBTF9BUFBST1hJTUFURUxZIiwiQ0hBUl9FUVVJVkFMRU5UIiwiQ0hBUl9FWENMQU1BVElPTiIsIkNIQVJfSEVOQ0UiLCJDSEFSX0lORklOSVRZIiwiQ0hBUl9JTlRFR1JBTCIsIkNIQVJfSU5URVJTRUNUSU9OIiwiQ0hBUl9MRVNTIiwiQ0hBUl9MRVNTX0VRVUFMIiwiQ0hBUl9NSU5VUyIsIkNIQVJfTUlOVVRFIiwiQ0hBUl9NVUxUSVBMWSIsIkNIQVJfTU9SRSIsIkNIQVJfTU9SRV9FUVVBTCIsIkNIQVJfTk9UX0VRVUFMIiwiQ0hBUl9OT1RfTEVTUyIsIkNIQVJfTk9UX01PUkUiLCJDSEFSX09QRU5fQlJBQ0UiLCJDSEFSX09QRU5fQlJBQ0tFVCIsIkNIQVJfT1BFTl9QQVJFTlRIRVNJUyIsIkNIQVJfUEFSQUxMRUwiLCJDSEFSX1BFUkNFTlQiLCJDSEFSX1BFUk1JTEwiLCJDSEFSX1BFUlBFTkRJQ1VMQVIiLCJDSEFSX1BJIiwiQ0hBUl9QTFVTIiwiQ0hBUl9QTFVTX01JTlVTIiwiQ0hBUl9QT1VORCIsIkNIQVJfUFJPUE9SVElPTiIsIkNIQVJfU0VDT05EIiwiQ0hBUl9TRUNUSU9OIiwiQ0hBUl9TRU1JQ0lSQ0xFIiwiQ0hBUl9TRU1JQ09MT04iLCJDSEFSX1NJR01BIiwiQ0hBUl9TSU5DRSIsIkNIQVJfU0lOR0xFX1FVT1RBVElPTiIsIkNIQVJfU1FVQVJFIiwiQ0hBUl9UUklBTkdMRSIsIkNIQVJfVU5ERVJMSU5FIiwiQ0hBUl9VTklPTiIsIkNIQVJfVkFSSUVTIiwiQ0hBUl9WRVJUSUNBTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTQSxTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsSUFBekIsRUFBK0JDLE9BQS9CLEVBQXdDO0FBQ3RDLFNBQU8saUJBQUVDLGFBQUYsQ0FBZ0JELE9BQWhCLElBQTJCLGlCQUFFRSxVQUFGLENBQWFKLEdBQWIsRUFBa0IsT0FBbEIsQ0FBM0IsR0FBeUQsVUFBVUEsR0FBMUU7QUFDRDtBQUNEOzs7O0FBSUEsSUFB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ckcsRSxDQUdac0csa0IsR0FBcUIsRztBQUhUdEcsRSxDQUladUcsVSxHQUFhLEc7QUFKRHZHLEUsQ0FLWndHLGEsR0FBZ0IsRztBQUxKeEcsRSxDQU1aeUcsYyxHQUFpQixJO0FBTkx6RyxFLENBT1owRyxZLEdBQWUsRztBQVBIMUcsRSxDQVFaMkcsVyxHQUFjLEc7QUFSRjNHLEUsQ0FTWjRHLGtCLEdBQXFCLEc7QUFUVDVHLEUsQ0FVWjZHLGdCLEdBQW1CLEc7QUFWUDdHLEUsQ0FXWjhHLGtCLEdBQXFCLEc7QUFYVDlHLEUsQ0FZWitHLHNCLEdBQXlCLEc7QUFaYi9HLEUsQ0FhWmdILFUsR0FBYSxHO0FBYkRoSCxFLENBY1ppSCxVLEdBQWEsRztBQWREakgsRSxDQWVaa0QsUyxHQUFZLEc7QUFmQWxELEUsQ0FnQlprSCxXLEdBQWMsRztBQWhCRmxILEUsQ0FpQlptSCxXLEdBQWMsRztBQWpCRm5ILEUsQ0FrQlpvSCxRLEdBQVcsRztBQWxCQ3BILEUsQ0FtQlpxSCxxQixHQUF3QixHO0FBbkJackgsRSxDQW9CWnlDLFUsR0FBYSxHO0FBcEJEekMsRSxDQXFCWnNILHdCLEdBQTJCLEc7QUFyQmZ0SCxFLENBc0JadUgsZSxHQUFrQixHO0FBdEJOdkgsRSxDQXVCWndILGdCLEdBQW1CLEc7QUF2QlB4SCxFLENBd0JaeUgsVSxHQUFhLEc7QUF4QkR6SCxFLENBeUJaMEgsYSxHQUFnQixHO0FBekJKMUgsRSxDQTBCWjJILGEsR0FBZ0IsRztBQTFCSjNILEUsQ0EyQlo0SCxpQixHQUFvQixHO0FBM0JSNUgsRSxDQTRCWjZILFMsR0FBWSxHO0FBNUJBN0gsRSxDQTZCWjhILGUsR0FBa0IsRztBQTdCTjlILEUsQ0E4QlorSCxVLEdBQWEsRztBQTlCRC9ILEUsQ0ErQlpnSSxXLEdBQWMsRztBQS9CRmhJLEUsQ0FnQ1ppSSxhLEdBQWdCLEc7QUFoQ0pqSSxFLENBaUNaa0ksUyxHQUFZLEc7QUFqQ0FsSSxFLENBa0NabUksZSxHQUFrQixHO0FBbENObkksRSxDQW1DWm9JLGMsR0FBaUIsRztBQW5DTHBJLEUsQ0FvQ1pxSSxhLEdBQWdCLEc7QUFwQ0pySSxFLENBcUNac0ksYSxHQUFnQixHO0FBckNKdEksRSxDQXNDWnVJLGUsR0FBa0IsRztBQXRDTnZJLEUsQ0F1Q1p3SSxpQixHQUFvQixHO0FBdkNSeEksRSxDQXdDWnlJLHFCLEdBQXdCLEc7QUF4Q1p6SSxFLENBeUNaMEksYSxHQUFnQixHO0FBekNKMUksRSxDQTBDWjJJLFksR0FBZSxHO0FBMUNIM0ksRSxDQTJDWjRJLFksR0FBZSxHO0FBM0NINUksRSxDQTRDWjZJLGtCLEdBQXFCLEc7QUE1Q1Q3SSxFLENBNkNaOEksTyxHQUFVLEc7QUE3Q0U5SSxFLENBOENaK0ksUyxHQUFZLEc7QUE5Q0EvSSxFLENBK0NaZ0osZSxHQUFrQixHO0FBL0NOaEosRSxDQWdEWmlKLFUsR0FBYSxHO0FBaEREakosRSxDQWlEWmtKLGUsR0FBa0IsRztBQWpETmxKLEUsQ0FrRFp1QyxhLEdBQWdCLEc7QUFsREp2QyxFLENBbURabUosVyxHQUFjLEc7QUFuREZuSixFLENBb0Rab0osWSxHQUFlLEc7QUFwREhwSixFLENBcURacUosZSxHQUFrQixHO0FBckROckosRSxDQXNEWnNKLGMsR0FBaUIsRztBQXRETHRKLEUsQ0F1RFp1SixVLEdBQWEsRztBQXZERHZKLEUsQ0F3RFp3SixVLEdBQWEsRztBQXhERHhKLEUsQ0F5RFp5SixxQixHQUF3QixJO0FBekRaekosRSxDQTBEWjRFLFUsR0FBYSxHO0FBMURENUUsRSxDQTJEWjBKLFcsR0FBYyxHO0FBM0RGMUosRSxDQTREWjJKLGEsR0FBZ0IsRztBQTVESjNKLEUsQ0E2RFo0SixjLEdBQWlCLEc7QUE3REw1SixFLENBOERaNkosVSxHQUFhLEc7QUE5REQ3SixFLENBK0RaOEosVyxHQUFjLEc7QUEvREY5SixFLENBZ0VaK0osYSxHQUFnQixHO0FBaEVKL0osRSxDQWtFWjJCLGMsR0FBaUIsSztBQWxFTDNCLEUsQ0FtRVo4QixXLEdBQWMsRTtBQW5FRjlCLEUsQ0FxRVo0RCxlLEdBQWtCLFU7QUFyRU41RCxFLENBc0VaNkQsZ0IsR0FBbUIsTztBQXRFUDdELEUsQ0F1RVppRSxZLEdBQWUsRTtrQkF2RUhqRSxFIiwiZmlsZSI6InNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSc7XG5cbi8qKlxuICogZGVmYXVsdCBvZiBrZXkgZnVuY3Rpb25cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGtleSBpbmRleCBvZiBhcnJheSBvciBwcm9wZXJ0eSBuYW1lIG9mIG9iamVjdFxuICogQHBhcmFtIGl0ZW0gdmFsdWUgb2YgYXJyYXkgYnkgaW5kZXggb3IgdmFsdWUgb2Ygb2JqZWN0IGJ5IHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSBjb250ZXh0IGFycmF5IG9yIG9iamVjdFxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIF9za0tleUZ1bmMoa2V5LCBpdGVtLCBjb250ZXh0KSB7XG4gIHJldHVybiBfLmlzUGxhaW5PYmplY3QoY29udGV4dCkgPyBfLnN0YXJ0c1dpdGgoa2V5LCAnc2tJZHgnKSA6ICgnc2tJZHgnICsga2V5KTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqIFsyLHtza0lkeDA6Myxza0lkeDE6WzQse3NrSWR4MDo1LHNrSWR4MTpbXX1dfV0gLT4gWzIsWzMsWzQsWzUsW11dXV1dXG4gKi9cbmlmICghQXJyYXkucHJvdG90eXBlLnNrQXJyKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdza0FycicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChyZWN1cnNpdmUsIGtleUZ1bmMgPSBfc2tLZXlGdW5jKSB7XG4gICAgICBsZXQgcnRuID0gW107XG4gICAgICB0aGlzLmZvckVhY2goKCRpdGVtKSA9PiB7XG4gICAgICAgIHJ0bi5wdXNoKChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSgkaXRlbSkgfHwgXy5pc1BsYWluT2JqZWN0KCRpdGVtKSkpID8gJGl0ZW0uc2tBcnIocmVjdXJzaXZlLCBrZXlGdW5jKSA6ICRpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFBcnJheS5wcm90b3R5cGUuc2tGaWx0ZXIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3NrRmlsdGVyJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwgZmlsdGVyRnVuYykge1xuICAgICAgbGV0IHJ0biA9IFtdO1xuICAgICAgdGhpcy5mb3JFYWNoKCgkaXRlbSwgJGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oZmlsdGVyRnVuYykgJiYgZmlsdGVyRnVuYygkaW5kZXgsICRpdGVtLCB0aGlzKSkge1xuICAgICAgICAgIHJ0bi5wdXNoKChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSgkaXRlbSkgfHwgXy5pc1BsYWluT2JqZWN0KCRpdGVtKSkpID8gJGl0ZW0uc2tGaWx0ZXIocmVjdXJzaXZlLCBmaWx0ZXJGdW5jKSA6ICRpdGVtKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBydG47XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqIFsxLHthOjIsYjpbMyx7Yzo0LGQ6WzUse31dfV19XSAtPiB7c2tJZHgwOjEsc2tJZHgxOnthOjIsYjp7c2tJZHgwOjMsc2tJZHgxOntjOjQsZDp7c2tJZHgwOjUsc2tJZHgxOnt9fX19fX1cbiAqL1xuaWYgKCFBcnJheS5wcm90b3R5cGUuc2tPYmopIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3NrT2JqJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwga2V5RnVuYyA9IF9za0tleUZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSB7fTtcbiAgICAgIHRoaXMuZm9yRWFjaCgoJGl0ZW0sICRpbmRleCkgPT4ge1xuICAgICAgICBydG5bXy5pc0Z1bmN0aW9uKGtleUZ1bmMpID8ga2V5RnVuYygkaW5kZXgsICRpdGVtLCB0aGlzKSA6ICRpbmRleF0gPSAocmVjdXJzaXZlICYmIChfLmlzQXJyYXkoJGl0ZW0pIHx8IF8uaXNQbGFpbk9iamVjdCgkaXRlbSkpKSA/ICRpdGVtLnNrT2JqKHJlY3Vyc2l2ZSwga2V5RnVuYykgOiAkaXRlbTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzEsMiwzXS5za1JtdigyKSAtPiBbMSwzXVxuICovXG5pZiAoIUFycmF5LnByb3RvdHlwZS5za1Jtdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tSbXYnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbGV0IHRtcElkeCA9IHRoaXMuaW5kZXhPZihpdGVtKTtcbiAgICAgIGlmICh0bXBJZHggPiAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZSh0bXBJZHgsIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqIFsxLDIsM10uc2tUb2dnbGUoMikgLT4gWzEsM11cbiAqIFsxLDNdLnNrVG9nZ2xlKDIpIC0+IFsxLDMsMl1cbiAqL1xuaWYgKCFBcnJheS5wcm90b3R5cGUuc2tUb2dnbGUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3NrVG9nZ2xlJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIGxldCB0bXBJZHggPSB0aGlzLmluZGV4T2YoaXRlbSk7XG4gICAgICBpZiAodG1wSWR4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5zcGxpY2UodG1wSWR4LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG59XG4vKipcbiAqIEBleGFtcGxlXG4gKiAoOTg3NjU0LjMyMSkuc2tDdXJyZW5jeUZtdCgyKSAtPiA5ODcsNjU0LjMyXG4gKi9cbmlmICghTnVtYmVyLnByb3RvdHlwZS5za0N1cnJlbmN5Rm10KSB7XG4gIE51bWJlci5wcm90b3R5cGUuc2tDdXJyZW5jeUZtdCA9IGZ1bmN0aW9uIChmcmFjdGlvbikge1xuICAgIHJldHVybiBTdHJpbmcodGhpcykuc2tDdXJyZW5jeUZtdChmcmFjdGlvbik7XG4gIH07XG59XG4vKipcbiAqIEBleGFtcGxlXG4gKiB7c2tJZHgwOjEsc2tJZHgxOlsyLHtza0lkeDA6Myxza0lkeDE6WzQse3NrSWR4MDo1LHNrSWR4MTpbXX1dfV19IC0+IFsxLFsyLFszLFs0LFs1LFtdXV1dXV1cbiAqL1xuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrQXJyKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2tBcnInLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAocmVjdXJzaXZlLCBrZXlGdW5jID0gX3NrS2V5RnVuYykge1xuICAgICAgbGV0IHJ0bkFyciA9IFtdO1xuICAgICAgbGV0IHJ0bk9iaiA9IHt9O1xuICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaCgoJGtleSkgPT4ge1xuICAgICAgICBsZXQgdG1wVmFsID0gdGhpc1ska2V5XTtcbiAgICAgICAgbGV0IHJ0biA9IChyZWN1cnNpdmUgJiYgKF8uaXNQbGFpbk9iamVjdCh0bXBWYWwpIHx8IF8uaXNBcnJheSh0bXBWYWwpKSkgPyB0bXBWYWwuc2tBcnIocmVjdXJzaXZlLCBrZXlGdW5jKSA6IHRtcFZhbDtcblxuICAgICAgICBydG5PYmpbJGtleV0gPSBydG47XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oa2V5RnVuYykgJiYga2V5RnVuYygka2V5LCB0bXBWYWwsIHRoaXMpKSB7XG4gICAgICAgICAgcnRuQXJyLnB1c2gocnRuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMocnRuT2JqKS5sZW5ndGggPT09IHJ0bkFyci5sZW5ndGggPyBydG5BcnIgOiBydG5PYmo7XG4gICAgfVxuICB9KTtcbn1cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za0Fzc2lnbikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrQXNzaWduJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKC4uLm9iamVjdHMpIHtcbiAgICAgIHJldHVybiBTSy5hc3NpZ24uYXBwbHkodGhpcywgXy5jb25jYXQodGhpcywgb2JqZWN0cykpO1xuICAgIH1cbiAgfSk7XG59XG5pZiAoIU9iamVjdC5wcm90b3R5cGUuc2tGaWx0ZXIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdza0ZpbHRlcicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChyZWN1cnNpdmUsIGZpbHRlckZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goKCRrZXkpID0+IHtcbiAgICAgICAgbGV0IHRtcFZhbCA9IHRoaXNbJGtleV07XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oZmlsdGVyRnVuYykgJiYgZmlsdGVyRnVuYygka2V5LCB0bXBWYWwsIHRoaXMpKSB7XG4gICAgICAgICAgcnRuWyRrZXldID0gKHJlY3Vyc2l2ZSAmJiAoXy5pc0FycmF5KHRtcFZhbCkgfHwgXy5pc1BsYWluT2JqZWN0KHRtcFZhbCkpKSA/IHRtcFZhbC5za0ZpbHRlcihyZWN1cnNpdmUsIGZpbHRlckZ1bmMpIDogdG1wVmFsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBydG47XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqIHthOjIsYjpbMyx7Yzo0LGQ6WzUse31dfV19IC0+IHthOjIsYjp7c2tJZHgwOjMsc2tJZHgxOntjOjQsZDp7c2tJZHgwOjUsc2tJZHgxOnt9fX19fVxuICovXG5pZiAoIU9iamVjdC5wcm90b3R5cGUuc2tPYmopIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdza09iaicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChyZWN1cnNpdmUsIGtleUZ1bmMgPSBfc2tLZXlGdW5jKSB7XG4gICAgICBsZXQgcnRuID0ge307XG4gICAgICBPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKCgka2V5KSA9PiB7XG4gICAgICAgIGxldCB0bXBWYWwgPSB0aGlzWyRrZXldO1xuICAgICAgICBydG5bJGtleV0gPSAocmVjdXJzaXZlICYmIChfLmlzQXJyYXkodG1wVmFsKSB8fCBfLmlzUGxhaW5PYmplY3QodG1wVmFsKSkpID8gdG1wVmFsLnNrT2JqKHJlY3Vyc2l2ZSwga2V5RnVuYykgOiB0bXBWYWw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBydG47XG4gICAgfVxuICB9KTtcbn1cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za1ZhbCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrVmFsJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHN0ciwgdmFsKSB7XG4gICAgICBsZXQgcnRuID0gdGhpcztcbiAgICAgIGxldCB0bXBBcnIgPSBzdHIuc3BsaXQoJy4nKTtcbiAgICAgIGxldCB0bXBJZHggPSAwO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAoOyB0bXBJZHggPCB0bXBBcnIubGVuZ3RoIC0gMTsgdG1wSWR4KyspIHtcbiAgICAgICAgICBpZiAocnRuW3RtcEFyclt0bXBJZHhdXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBydG5bdG1wQXJyW3RtcElkeF1dID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHJ0biA9IHJ0blt0bXBBcnJbdG1wSWR4XV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ0bikge1xuICAgICAgICAgIHJ0blt0bXBBcnJbdG1wSWR4XV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoOyB0bXBJZHggPCB0bXBBcnIubGVuZ3RoOyB0bXBJZHgrKykge1xuICAgICAgICAgIHJ0biA9IHJ0blt0bXBBcnJbdG1wSWR4XV07XG4gICAgICAgICAgaWYgKHJ0biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBydG47XG4gICAgfVxuICB9KTtcbn1cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za1ZhbHMpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdza1ZhbHMnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcykubWFwKCgka2V5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzWyRrZXldO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cbmlmICghU3RyaW5nLnByb3RvdHlwZS5za0JsYW5rKSB7XG4gIFN0cmluZy5wcm90b3R5cGUuc2tCbGFuayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50cmltKCkubGVuZ3RoID09PSAwO1xuICB9O1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrQ3VycmVuY3lGbXQpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0N1cnJlbmN5Rm10ID0gZnVuY3Rpb24gKGZyYWN0aW9uKSB7XG4gICAgZnJhY3Rpb24gPSBmcmFjdGlvbiA+IDAgJiYgZnJhY3Rpb24gPD0gMjAgPyBmcmFjdGlvbiA6IDI7XG4gICAgbGV0IHRtcEFyciA9IChwYXJzZUZsb2F0KHRoaXMucmVwbGFjZSgvW15cXGRcXC4tXS9nLCAnJykpLnRvRml4ZWQoZnJhY3Rpb24pICsgJycpLnNwbGl0KCcuJyk7XG4gICAgcmV0dXJuIHRtcEFyclswXS5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyg/IVxcZCkpL2csICckMSwnKSArICcuJyArIHRtcEFyclsxXTtcbiAgfTtcbn1cbmlmICghU3RyaW5nLnByb3RvdHlwZS5za0VtcHR5KSB7XG4gIFN0cmluZy5wcm90b3R5cGUuc2tFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPT09IDA7XG4gIH07XG59XG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc2tGbXQpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0ZtdCA9IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKFxcJFxce1xcdysoXFwuXFx3KykqXFx9KS9nLCAoJG1hdGNoZWQpID0+IHsvLy8oXFx7XFx3K1xcLlxcfSkvZ1xuICAgICAgcmV0dXJuIG8uc2tWYWwoJG1hdGNoZWQucmVwbGFjZSgnJHsnLCAnJykucmVwbGFjZSgnfScsICcnKSk7XG4gICAgfSk7XG4gIH07XG59XG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc2tGbXRBcnIpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0ZtdEFyciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXFwkKFxcZCspL2csICgkXywgJG0pID0+IHtcbiAgICAgIHJldHVybiBhWy0tJG1dO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTSyB7XG4gIHN0YXRpYyBDSEFSX0FNUEVSU0FORCA9ICcmJztcbiAgc3RhdGljIENIQVJfQU5HTEUgPSAn4oigJztcbiAgc3RhdGljIENIQVJfQVBQUk9YSU1BVEVMWSA9ICfiiYgnO1xuICBzdGF0aWMgQ0hBUl9BUlJPVyA9ICfihpInO1xuICBzdGF0aWMgQ0hBUl9BU1RFUklTSyA9ICcqJztcbiAgc3RhdGljIENIQVJfQkFDS1NMQVNIID0gJ1xcXFwnO1xuICBzdGF0aWMgQ0hBUl9DRUxTSVVTID0gJ+KEgyc7XG4gIHN0YXRpYyBDSEFSX0NJUkNMRSA9ICfiipknO1xuICBzdGF0aWMgQ0hBUl9DSVJDVU1GRVJFTkNFID0gJ+KXiyc7XG4gIHN0YXRpYyBDSEFSX0NMT1NFX0JSQUNFID0gJ30nO1xuICBzdGF0aWMgQ0hBUl9DTE9TRV9CUkFDS0VUID0gJ10nO1xuICBzdGF0aWMgQ0hBUl9DTE9TRV9QQVJFTlRIRVNJUyA9ICcpJztcbiAgc3RhdGljIENIQVJfQ09MT04gPSAnOic7XG4gIHN0YXRpYyBDSEFSX0NPTU1BID0gJywnO1xuICBzdGF0aWMgQ0hBUl9EQVNIID0gJy0nO1xuICBzdGF0aWMgQ0hBUl9ERUdSRUUgPSAnwrAnO1xuICBzdGF0aWMgQ0hBUl9ESVZJREUgPSAnw7cnO1xuICBzdGF0aWMgQ0hBUl9ET1QgPSAnLic7XG4gIHN0YXRpYyBDSEFSX0RPVUJMRV9RVU9UQVRJT04gPSAnXCInO1xuICBzdGF0aWMgQ0hBUl9FUVVBTCA9ICc9JztcbiAgc3RhdGljIENIQVJfRVFVQUxfQVBQUk9YSU1BVEVMWSA9ICfiiYwnO1xuICBzdGF0aWMgQ0hBUl9FUVVJVkFMRU5UID0gJ+KJoSc7XG4gIHN0YXRpYyBDSEFSX0VYQ0xBTUFUSU9OID0gJyEnO1xuICBzdGF0aWMgQ0hBUl9IRU5DRSA9ICfiiLQnO1xuICBzdGF0aWMgQ0hBUl9JTkZJTklUWSA9ICfiiJ4nO1xuICBzdGF0aWMgQ0hBUl9JTlRFR1JBTCA9ICfiiKsnO1xuICBzdGF0aWMgQ0hBUl9JTlRFUlNFQ1RJT04gPSAn4oipJztcbiAgc3RhdGljIENIQVJfTEVTUyA9ICc8JztcbiAgc3RhdGljIENIQVJfTEVTU19FUVVBTCA9ICfiiaQnO1xuICBzdGF0aWMgQ0hBUl9NSU5VUyA9ICctJztcbiAgc3RhdGljIENIQVJfTUlOVVRFID0gJ+KAsic7XG4gIHN0YXRpYyBDSEFSX01VTFRJUExZID0gJ8OXJztcbiAgc3RhdGljIENIQVJfTU9SRSA9ICc+JztcbiAgc3RhdGljIENIQVJfTU9SRV9FUVVBTCA9ICfiiaUnO1xuICBzdGF0aWMgQ0hBUl9OT1RfRVFVQUwgPSAn4omgJztcbiAgc3RhdGljIENIQVJfTk9UX0xFU1MgPSAn4omuJztcbiAgc3RhdGljIENIQVJfTk9UX01PUkUgPSAn4omvJztcbiAgc3RhdGljIENIQVJfT1BFTl9CUkFDRSA9ICd7JztcbiAgc3RhdGljIENIQVJfT1BFTl9CUkFDS0VUID0gJ1snO1xuICBzdGF0aWMgQ0hBUl9PUEVOX1BBUkVOVEhFU0lTID0gJygnO1xuICBzdGF0aWMgQ0hBUl9QQVJBTExFTCA9ICfigJYnO1xuICBzdGF0aWMgQ0hBUl9QRVJDRU5UID0gJyUnO1xuICBzdGF0aWMgQ0hBUl9QRVJNSUxMID0gJ+KAsCc7XG4gIHN0YXRpYyBDSEFSX1BFUlBFTkRJQ1VMQVIgPSAn4oqlJztcbiAgc3RhdGljIENIQVJfUEkgPSAnz4AnO1xuICBzdGF0aWMgQ0hBUl9QTFVTID0gJysnO1xuICBzdGF0aWMgQ0hBUl9QTFVTX01JTlVTID0gJ8KxJztcbiAgc3RhdGljIENIQVJfUE9VTkQgPSAnIyc7XG4gIHN0YXRpYyBDSEFSX1BST1BPUlRJT04gPSAn4oi3JztcbiAgc3RhdGljIENIQVJfUVVFU1RJT04gPSAnPyc7XG4gIHN0YXRpYyBDSEFSX1NFQ09ORCA9ICfjgIMnO1xuICBzdGF0aWMgQ0hBUl9TRUNUSU9OID0gJ8KnJztcbiAgc3RhdGljIENIQVJfU0VNSUNJUkNMRSA9ICfijJInO1xuICBzdGF0aWMgQ0hBUl9TRU1JQ09MT04gPSAnOyc7XG4gIHN0YXRpYyBDSEFSX1NJR01BID0gJ+KIkSc7XG4gIHN0YXRpYyBDSEFSX1NJTkNFID0gJ+KItSc7XG4gIHN0YXRpYyBDSEFSX1NJTkdMRV9RVU9UQVRJT04gPSAnXFwnJztcbiAgc3RhdGljIENIQVJfU0xBU0ggPSAnLyc7XG4gIHN0YXRpYyBDSEFSX1NRVUFSRSA9ICfiiJonO1xuICBzdGF0aWMgQ0hBUl9UUklBTkdMRSA9ICfilrMnO1xuICBzdGF0aWMgQ0hBUl9VTkRFUkxJTkUgPSAnXyc7XG4gIHN0YXRpYyBDSEFSX1VOSU9OID0gJ+KIqic7XG4gIHN0YXRpYyBDSEFSX1ZBUklFUyA9ICfiiJ0nO1xuICBzdGF0aWMgQ0hBUl9WRVJUSUNBTCA9ICd8JztcblxuICBzdGF0aWMgREVGQVVMVF9ET01BSU4gPSAnJHNrJztcbiAgc3RhdGljIERFRkFVTFRfRU5WID0ge307XG5cbiAgc3RhdGljIENPT0tJRV9MQU5HVUFHRSA9ICdsYW5ndWFnZSc7XG4gIHN0YXRpYyBERUZBVUxUX0xBTkdVQUdFID0gJ2VuX1VTJztcbiAgc3RhdGljIENPTlRFWFRfUEFUSCA9ICcnO1xuXG4gIC8qKlxuICAgKiBOZXcgb3IgZ2V0IG5hbWVzcGFjZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAkIG5hbWVzcGFjZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaW5pdFZhbCBpbml0IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnYgd2luZG93KGJyb3dzZXIpIG9yIGdsb2JhbChub2RlanMpIGV0Yy5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAgICovXG4gIHN0YXRpYyAkKCQgPSBTSy5ERUZBVUxUX0RPTUFJTiwgaW5pdFZhbCA9IHt9LCBlbnYgPSBTSy5ERUZBVUxUX0VOVikge1xuICAgIGlmICghZW52WyRdKSB7XG4gICAgICBlbnZbJF0gPSBpbml0VmFsO1xuICAgIH0gZWxzZSBpZiAoIV8uaXNFbXB0eShpbml0VmFsKSkge1xuICAgICAgZW52WyRdID0gaW5pdFZhbDtcbiAgICB9XG4gICAgcmV0dXJuIGVudlskXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZWZhdWx0IG9mIGFzc2lnbldpdGgncyBjdXN0b21pemVyXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHsqfHVuZGVmaW5lZH1cbiAgICogQHNlZSBfLmFzc2lnbldpdGhcbiAgICovXG4gIHN0YXRpYyBfc2tBc3NpZ25DdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgIHJldHVybiBTSy5hcmVQbGFpbk9iamVjdChvYmpWYWx1ZSwgc3JjVmFsdWUsIG9iamVjdCwgc291cmNlKSA/IFNLLmFzc2lnbihvYmpWYWx1ZSwgc3JjVmFsdWUpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZCBwYXJhbWV0ZXIgdG8gdXJsXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIHBhcmFtXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGFwcGVuZFBhcmFtZXRlcih1cmwsIHBhcmFtLCB2YWx1ZSkge1xuICAgIHJldHVybiB1cmwgKyAoKHVybC5pbmRleE9mKFNLLkNIQVJfUVVFU1RJT04pID09IC0xID8gU0suQ0hBUl9RVUVTVElPTiA6IFNLLkNIQVJfQU1QRVJTQU5EKSArIHBhcmFtICsgU0suQ0hBUl9FUVVBTCArIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdmFsdWVzIGFyZSBwbGFpbiBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKiBAc2VlIF8uaXNQbGFpbk9iamVjdFxuICAgKi9cbiAgc3RhdGljIGFyZVBsYWluT2JqZWN0KC4uLnZhbHVlcykge1xuICAgIGxldCBydG4gPSB0cnVlO1xuICAgIHZhbHVlcy5mb3JFYWNoKCgkaXRlbSkgPT4ge1xuICAgICAgcnRuID0gcnRuICYmIF8uaXNQbGFpbk9iamVjdCgkaXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJ0bjtcbiAgfVxuXG4gIC8qKlxuICAgKiBsZXQgbzEgPSB7YTpbeydiJzoxfSwnYycsMl0sIGQ6e2U6M319O1xuICAgKiBsZXQgbzIgPSB7YTpbeyd4JzoxMH0sJ3knLDIwXSwgZDp7ejozMH19O1xuICAgKiBsZXQgbzMgPSAkLmV4dGVuZCh0cnVlLG8xLG8yKTtcbiAgICogSlNPTi5zdHJpbmdpZnkobzMpOy8ve1wiYVwiOlt7XCJiXCI6MSxcInhcIjoxMH0sXCJ5XCIsMjBdLFwiZFwiOntcImVcIjozLFwielwiOjMwfX1cbiAgICogbzEgPT0gbzM7Ly90cnVlXG4gICAqIG8xID09PSBvMzsvL3RydWVcbiAgICpcbiAgICogbGV0IG8xID0ge2E6W3snYic6MX0sJ2MnLDJdLCBkOntlOjN9fTtcbiAgICogbGV0IG8yID0ge2E6W3sneCc6MTB9LCd5JywyMF0sIGQ6e3o6MzB9fTtcbiAgICogbGV0IG8zID0gXy5hc3NpZ24obzEsbzIpO1xuICAgKiBKU09OLnN0cmluZ2lmeShvMyk7Ly97XCJhXCI6W3tcInhcIjoxMH0sXCJ5XCIsMjBdLFwiZFwiOntcInpcIjozMH19XG4gICAqIG8xID09IG8zOy8vdHJ1ZVxuICAgKiBvMSA9PT0gbzM7Ly90cnVlXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgKiBAcGFyYW0gey4uLk9iamVjdH0gb2JqZWN0cyBUaGUgc291cmNlIG9iamVjdHMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGxldCBvMSA9IHthOlt7J2InOjF9LCdjJywyXSwgZDp7ZTozfX07XG4gICAqIGxldCBvMiA9IHthOlt7J3gnOjEwfSwneScsMjBdLCBkOnt6OjMwfX07XG4gICAqIGxldCBvMyA9IFNLLmFzc2lnbihvMSxvMik7XG4gICAqIEpTT04uc3RyaW5naWZ5KG8zKTsvL3tcImFcIjpbe1wieFwiOjEwfSxcInlcIiwyMF0sXCJkXCI6e1wiZVwiOjMsXCJ6XCI6MzB9fVxuICAgKiBvMSA9PSBvMzsvL3RydWVcbiAgICogbzEgPT09IG8zOy8vdHJ1ZVxuICAgKi9cbiAgc3RhdGljIGFzc2lnbihvYmplY3QsIC4uLm9iamVjdHMpIHtcbiAgICByZXR1cm4gXy5hc3NpZ25XaXRoLmFwcGx5KHRoaXMsIF8uY29uY2F0KG9iamVjdCwgb2JqZWN0cywgU0suX3NrQXNzaWduQ3VzdG9taXplcikpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGNvb2tpZXMoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgQ29va2llcy5yZW1vdmUoa2V5KTtcbiAgICAgIHJldHVybiBDb29raWVzLnNldChrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvb2tpZXMuZ2V0KGtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhcnIxXG4gICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhcnIyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb25jYXRcbiAgICogQHJldHVybnMge0FycmF5fHN0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogZGVzY2FydGVzKFsnYWxlcnQnLCdidG4nXSxbJ3N1Y2Nlc3MnLCdpbmZvJ10pOy8vWydhbGVydC1zdWNjZXNzJywnYWxlcnQtaW5mbycsJ2J0bi1zdWNjZXNzJywnYnRuLWluZm8nXVxuICAgKiBkZXNjYXJ0ZXMoJ2FsZXJ0JywnbGluaycsJy0nKTsvLydhbGVydC1saW5rJ1xuICAgKi9cbiAgc3RhdGljIGRlc2NhcnRlcyhhcnIxID0gW10sIGFycjIgPSBbXSwgY29uY2F0ID0gU0suQ0hBUl9EQVNIKSB7XG4gICAgbGV0IHRtcEFycjEgPSBBcnJheS5pc0FycmF5KGFycjEpID8gYXJyMSA6IFthcnIxXTtcbiAgICBsZXQgdG1wQXJyMiA9IEFycmF5LmlzQXJyYXkoYXJyMikgPyBhcnIyIDogW2FycjJdO1xuICAgIGxldCBydG4gPSBbXTtcbiAgICB0bXBBcnIxLmZvckVhY2goKCRlbGUxKSA9PiB7XG4gICAgICB0bXBBcnIyLmZvckVhY2goKCRlbGUyKSA9PiB7XG4gICAgICAgIHJ0bi5wdXNoKCRlbGUxICsgY29uY2F0ICsgJGVsZTIpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gcnRuLmxlbmd0aCA9PT0gMSA/IHJ0blswXSA6IHJ0bjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldEN1cnJlbnRIcmVmKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDdXJyZW50TGFuZ3VhZ2UoKSB7XG4gICAgbGV0IGxhbmd1YWdlID0gU0suY29va2llcyhTSy5DT09LSUVfTEFOR1VBR0UpO1xuICAgIHJldHVybiBsYW5ndWFnZSA/IGxhbmd1YWdlIDogU0suREVGQVVMVF9MQU5HVUFHRTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldEN1cnJlbnRQYXRoKCkge1xuICAgIHZhciBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZyhTSy5DT05URVhUX1BBVEgubGVuZ3RoLCBwYXRoLmxlbmd0aCk7XG4gICAgcGF0aCA9IF8uZW5kc1dpdGgocGF0aCwgJy5odG1sJykgPyBwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxlbmd0aCAtIDUpIDogcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBnZXRDdXJyZW50U2VhcmNoKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbVxuICAgKiBAcGFyYW0gc2VhcmNoXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGdldFJlcXVlc3RQYXJhbWV0ZXIocGFyYW0sIHNlYXJjaCkge1xuICAgIHNlYXJjaCA9IHNlYXJjaCB8fCBTSy5nZXRDdXJyZW50U2VhcmNoKCk7XG4gICAgc2VhcmNoID0gXy5zdGFydHNXaXRoKHNlYXJjaCwgU0suQ0hBUl9RVUVTVElPTikgPyBzZWFyY2guc2xpY2UoMSkgOiBzZWFyY2g7XG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoJyhefCYpJyArIHBhcmFtICsgJz0oW14mXSopKCZ8JCknKTtcbiAgICB2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XG4gICAgcmV0dXJuIHIgPyBkZWNvZGVVUklDb21wb25lbnQoclsyXSkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgc3RhdGljIGdldFN1YlBhdGhzKHBhdGgpIHtcbiAgICBsZXQgcnRuID0gWycvJ107XG4gICAgcGF0aC5zcGxpdChTSy5DSEFSX1NMQVNIKS5yZWR1Y2UoKHByZSwgY3VyKSA9PiB7XG4gICAgICBpZiAoU0suczRzKGN1cikgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiBwcmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdmFsaWRQYXRoID0gU0suZ2V0VmFsaWRQYXRoKHByZSArIGN1cik7XG4gICAgICAgIHJ0bi5wdXNoKHZhbGlkUGF0aCk7XG4gICAgICAgIHJldHVybiB2YWxpZFBhdGg7XG4gICAgICB9XG4gICAgfSwgJycpO1xuICAgIHJldHVybiBydG47XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRWYWxpZFBhdGgocGF0aCkge1xuICAgIHJldHVybiAoXy5zdGFydHNXaXRoKHBhdGgsIFNLLkNIQVJfU0xBU0gpID8gJycgOiBTSy5DSEFSX1NMQVNIKSArIHBhdGggKyAoXy5lbmRzV2l0aChwYXRoLCBTSy5DSEFSX1NMQVNIKSA/ICcnIDogU0suQ0hBUl9TTEFTSCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHN0YXRpYyBsb2NhbChrZXksIHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdXJsXG4gICAqL1xuICBzdGF0aWMgcmVkaXJlY3QodXJsKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBhcnJheSBmb3IgdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtBcnJheX0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyBzNGEodmFsdWUsIGRlZmF1bHRWYWx1ZSA9IFtdKSB7XG4gICAgcmV0dXJuIF8uaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGJvb2xlYW4gZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIHM0Yih2YWx1ZSwgZGVmYXVsdFZhbHVlID0gZmFsc2UpIHtcbiAgICByZXR1cm4gXy5pc0Jvb2xlYW4odmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBkYXRlIGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge0RhdGV9IGRlZmF1bHRWYWx1ZVxuICAgKiBAcmV0dXJucyB7RGF0ZX1cbiAgICovXG4gIHN0YXRpYyBzNGQodmFsdWUsIGRlZmF1bHRWYWx1ZSA9IG5ldyBEYXRlKCkpIHtcbiAgICByZXR1cm4gXy5pc0RhdGUodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBmaW5pdGUgbnVtYmVyIGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgczRuKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSAwKSB7XG4gICAgcmV0dXJuIF8uaXNGaW5pdGUoXy50b051bWJlcih2YWx1ZSkpID8gXy50b051bWJlcih2YWx1ZSkgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBwbGFpbiBvYmplY3QgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgc3RhdGljIHM0byh2YWx1ZSwgZGVmYXVsdFZhbHVlID0ge30pIHtcbiAgICByZXR1cm4gXy5pc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhZmUgc3RyaW5nIGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgczRzKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSAnJykge1xuICAgIHJldHVybiAoXy5pc0Jvb2xlYW4odmFsdWUpIHx8IF8uaXNGaW5pdGUodmFsdWUpIHx8IF8uaXNTdHJpbmcodmFsdWUpKSA/IFN0cmluZyh2YWx1ZSkgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHN0YXRpYyBzZXNzaW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gd29yZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiB1cHBlcldvcmRGaXJzdENoYXIoJ3BhdGgnKTsvL1BhdGhcbiAgICogdXBwZXJXb3JkRmlyc3RDaGFyKCdsaXN0Jyk7Ly9MaXN0XG4gICAqL1xuICBzdGF0aWMgdXBwZXJXb3JkRmlyc3RDaGFyKHdvcmQpIHtcbiAgICByZXR1cm4gXy50b1N0cmluZyh3b3JkKS5yZXBsYWNlKC8oXFx3KS8sICgkMSkgPT4ge1xuICAgICAgcmV0dXJuICQxLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHdvcmRzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIHVwcGVyV29yZHNGaXJzdENoYXIoJ3hpIG5BbiBzaGkgeW91IHhVZSB5dWFuIGNoaW5hIHBlb3BsZScpOy8vWGkgTkFuIFNoaSBZb3UgWFVlIFl1YW4gQ2hpbmEgUGVvcGxlXG4gICAqL1xuICBzdGF0aWMgdXBwZXJXb3Jkc0ZpcnN0Q2hhcih3b3Jkcykge1xuICAgIHJldHVybiBfLnRvU3RyaW5nKHdvcmRzKS5yZXBsYWNlKC9cXHNbYS16XS9nLCAoJDExKSA9PiB7XG4gICAgICByZXR1cm4gJDExLnRvVXBwZXJDYXNlKCk7XG4gICAgfSkucmVwbGFjZSgvXlthLXpdLywgKCQyMSkgPT4ge1xuICAgICAgcmV0dXJuICQyMS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pXG4gIH1cbn1cbiJdfQ==