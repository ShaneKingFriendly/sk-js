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
      if (url.indexOf(SK.CHAR_QUESTION) === -1) {
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

      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
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
     * let o1 = {p1:1,f1:function(){console.log('f1');}}
     * let o2 = {p2:2,f2:function(){console.log('f2');},f1:function(){console.log('f1 in o2')}};
     * let o3 = {};
     * let o4 = _.assign(o3,o1,o2);
     * o4 === o3;//true
     * o2.f1 === o4.f1;//true
     * o4.f1();//f1 in o2
     *
     * @static
     * @param {Object} object The destination object.
     * @param {...Object} objects The source objects.
     */

  }, {
    key: 'assign',
    value: function assign(object) {
      for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        objects[_key2 - 1] = arguments[_key2];
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
      var r = search.match(reg);
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