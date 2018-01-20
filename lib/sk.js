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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNLLmpzIl0sIm5hbWVzIjpbIlNLIiwiJCIsIkRFRkFVTFRfRE9NQUlOIiwiaW5pdFZhbCIsImVudiIsIkRFRkFVTFRfRU5WIiwiaXNFbXB0eSIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJrZXkiLCJvYmplY3QiLCJzb3VyY2UiLCJhcmVQbGFpbk9iamVjdCIsImFzc2lnbiIsInVuZGVmaW5lZCIsInVybCIsInBhcmFtIiwidmFsdWUiLCJpbmRleE9mIiwiQ0hBUl9RVUVTVElPTiIsIkNIQVJfRVFVQUwiLCJjdXJyZW50VmFsdWUiLCJnZXRSZXF1ZXN0UGFyYW1ldGVyIiwic3BsaXQiLCJyZXBsYWNlIiwiQ0hBUl9BTVBFUlNBTkQiLCJydG4iLCJ2YWx1ZXMiLCJmb3JFYWNoIiwiJGl0ZW0iLCJpc1BsYWluT2JqZWN0Iiwib2JqZWN0cyIsImFzc2lnbldpdGgiLCJhcHBseSIsImNvbmNhdCIsIl9za0Fzc2lnbkN1c3RvbWl6ZXIiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyZW1vdmUiLCJzZXQiLCJnZXQiLCJhcnJheSIsImFub3RoZXJBcnJheSIsIkNIQVJfREFTSCIsImFycjEiLCJBcnJheSIsImlzQXJyYXkiLCJhcnIyIiwiJCRpdGVtIiwicHVzaCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImxhbmd1YWdlIiwiY29va2llcyIsIlNUUl9MQU5HVUFHRSIsIkRFRkFVTFRfTEFOR1VBR0UiLCJvcmlnaW4iLCJwYXRoIiwicGF0aG5hbWUiLCJzdWJzdHJpbmciLCJDT05URVhUX1BBVEgiLCJlbmRzV2l0aCIsIkZJTEVfVFlQRV9IVE1MX1dJVEhfUE9JTlQiLCJzZWFyY2giLCJnZXRDdXJyZW50U2VhcmNoIiwic3RhcnRzV2l0aCIsInNsaWNlIiwicmVnIiwiUmVnRXhwIiwiciIsIm1hdGNoIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiQ0hBUl9TTEFTSCIsInJlZHVjZSIsIiRhY2N1bXVsYXRvciIsInM0cyIsIkVNUFRZIiwidG1wVmFsaWRQYXRoIiwiZ2V0VmFsaWRQYXRoIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJkZWZhdWx0VmFsdWUiLCJpc0Jvb2xlYW4iLCJEYXRlIiwiaXNEYXRlIiwiaXNGaW5pdGUiLCJ0b051bWJlciIsImlzU3RyaW5nIiwiU3RyaW5nIiwic2Vzc2lvblN0b3JhZ2UiLCJ3b3JkcyIsInRvU3RyaW5nIiwiJG5vbkZpcnN0V29yZCIsInRvVXBwZXJDYXNlIiwiJGZpcnN0V29yZCIsIkNIQVJfQU5HTEUiLCJDSEFSX0FQUFJPWElNQVRFTFkiLCJDSEFSX0FSUk9XIiwiQ0hBUl9BU1RFUklTSyIsIkNIQVJfQkFDS1NMQVNIIiwiQ0hBUl9DRUxTSVVTIiwiQ0hBUl9DSVJDTEUiLCJDSEFSX0NJUkNVTUZFUkVOQ0UiLCJDSEFSX0NMT1NFX0JSQUNFIiwiQ0hBUl9DTE9TRV9CUkFDS0VUIiwiQ0hBUl9DTE9TRV9QQVJFTlRIRVNJUyIsIkNIQVJfQ09MT04iLCJDSEFSX0NPTU1BIiwiQ0hBUl9ERUdSRUUiLCJDSEFSX0RJVklERSIsIkNIQVJfRE9UIiwiQ0hBUl9ET1VCTEVfUVVPVEFUSU9OIiwiQ0hBUl9FUVVBTF9BUFBST1hJTUFURUxZIiwiQ0hBUl9FUVVJVkFMRU5UIiwiQ0hBUl9FWENMQU1BVElPTiIsIkNIQVJfSEVOQ0UiLCJDSEFSX0lORklOSVRZIiwiQ0hBUl9JTlRFR1JBTCIsIkNIQVJfSU5URVJTRUNUSU9OIiwiQ0hBUl9MRVNTIiwiQ0hBUl9MRVNTX0VRVUFMIiwiQ0hBUl9NSU5VUyIsIkNIQVJfTUlOVVRFIiwiQ0hBUl9NVUxUSVBMWSIsIkNIQVJfTU9SRSIsIkNIQVJfTU9SRV9FUVVBTCIsIkNIQVJfTk9UX0VRVUFMIiwiQ0hBUl9OT1RfTEVTUyIsIkNIQVJfTk9UX01PUkUiLCJDSEFSX09QRU5fQlJBQ0UiLCJDSEFSX09QRU5fQlJBQ0tFVCIsIkNIQVJfT1BFTl9QQVJFTlRIRVNJUyIsIkNIQVJfUEFSQUxMRUwiLCJDSEFSX1BFUkNFTlQiLCJDSEFSX1BFUk1JTEwiLCJDSEFSX1BFUlBFTkRJQ1VMQVIiLCJDSEFSX1BJIiwiQ0hBUl9QTFVTIiwiQ0hBUl9QTFVTX01JTlVTIiwiQ0hBUl9QT1VORCIsIkNIQVJfUFJPUE9SVElPTiIsIkNIQVJfU0VDT05EIiwiQ0hBUl9TRUNUSU9OIiwiQ0hBUl9TRU1JQ0lSQ0xFIiwiQ0hBUl9TRU1JQ09MT04iLCJDSEFSX1NJR01BIiwiQ0hBUl9TSU5DRSIsIkNIQVJfU0lOR0xFX1FVT1RBVElPTiIsIkNIQVJfU1FVQVJFIiwiQ0hBUl9UUklBTkdMRSIsIkNIQVJfVU5ERVJMSU5FIiwiQ0hBUl9VTklPTiIsIkNIQVJfVkFSSUVTIiwiQ0hBUl9WRVJUSUNBTCIsIkZJTEVfVFlQRV9IVE1MIiwiRklMRV9UWVBFX0pTT04iLCJGSUxFX1RZUEVfSlNPTl9XSVRIX1BPSU5UIiwiUkVRVUVTVF9NRVRIT0RfUE9TVCIsIlJFUVVFU1RfTUVUSE9EX0RFTEVURSIsIlJFUVVFU1RfTUVUSE9EX1BVVCIsIlJFUVVFU1RfTUVUSE9EX0dFVCIsIkpTX0tFWVdPUkRfRlVOQ1RJT04iLCJTVFJfREVGQVVMVCIsIlNUUl9FUlJPUiIsIkVOVl9ERVYiLCJFTlZfVEVTVCIsIkVOVl9QUk9EIiwiREVGQVVMVF9NT01FTlRfREFURSIsIkRFRkFVTFRfTU9NRU5UX0RBVEVUSU1FIiwiREVGQVVMVF9NT01FTlRfVElNRSIsIkRFRkFVTFRfTU9NRU5UX1RJTUVaT05FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxFOzs7Ozs7Ozs7QUFnR25COzs7Ozs7Ozt3QkFRb0U7QUFBQSxVQUEzREMsRUFBMkQsdUVBQXZERCxHQUFHRSxjQUFvRDs7QUFBQSxVQUFwQ0MsT0FBb0MsdUVBQTFCLEVBQTBCO0FBQUEsVUFBdEJDLEdBQXNCLHVFQUFoQkosR0FBR0ssV0FBYTs7QUFDbEUsVUFBSSxDQUFDRCxJQUFJSCxFQUFKLENBQUwsRUFBYTtBQUNYRyxZQUFJSCxFQUFKLElBQVNFLE9BQVQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLGlCQUFFRyxPQUFGLENB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LEc7QUFKRG5HLEUsQ0FLWm9HLGEsR0FBZ0IsRztBQUxKcEcsRSxDQU1acUcsYyxHQUFpQixJO0FBTkxyRyxFLENBT1pzRyxZLEdBQWUsRztBQVBIdEcsRSxDQVFadUcsVyxHQUFjLEc7QUFSRnZHLEUsQ0FTWndHLGtCLEdBQXFCLEc7QUFUVHhHLEUsQ0FVWnlHLGdCLEdBQW1CLEc7QUFWUHpHLEUsQ0FXWjBHLGtCLEdBQXFCLEc7QUFYVDFHLEUsQ0FZWjJHLHNCLEdBQXlCLEc7QUFaYjNHLEUsQ0FhWjRHLFUsR0FBYSxHO0FBYkQ1RyxFLENBY1o2RyxVLEdBQWEsRztBQWREN0csRSxDQWVaMkMsUyxHQUFZLEc7QUFmQTNDLEUsQ0FnQlo4RyxXLEdBQWMsRztBQWhCRjlHLEUsQ0FpQlorRyxXLEdBQWMsRztBQWpCRi9HLEUsQ0FrQlpnSCxRLEdBQVcsRztBQWxCQ2hILEUsQ0FtQlppSCxxQixHQUF3QixHO0FBbkJaakgsRSxDQW9CWm9CLFUsR0FBYSxHO0FBcEJEcEIsRSxDQXFCWmtILHdCLEdBQTJCLEc7QUFyQmZsSCxFLENBc0JabUgsZSxHQUFrQixHO0FBdEJObkgsRSxDQXVCWm9ILGdCLEdBQW1CLEc7QUF2QlBwSCxFLENBd0JacUgsVSxHQUFhLEc7QUF4QkRySCxFLENBeUJac0gsYSxHQUFnQixHO0FBekJKdEgsRSxDQTBCWnVILGEsR0FBZ0IsRztBQTFCSnZILEUsQ0EyQlp3SCxpQixHQUFvQixHO0FBM0JSeEgsRSxDQTRCWnlILFMsR0FBWSxHO0FBNUJBekgsRSxDQTZCWjBILGUsR0FBa0IsRztBQTdCTjFILEUsQ0E4QloySCxVLEdBQWEsRztBQTlCRDNILEUsQ0ErQlo0SCxXLEdBQWMsRztBQS9CRjVILEUsQ0FnQ1o2SCxhLEdBQWdCLEc7QUFoQ0o3SCxFLENBaUNaOEgsUyxHQUFZLEc7QUFqQ0E5SCxFLENBa0NaK0gsZSxHQUFrQixHO0FBbENOL0gsRSxDQW1DWmdJLGMsR0FBaUIsRztBQW5DTGhJLEUsQ0FvQ1ppSSxhLEdBQWdCLEc7QUFwQ0pqSSxFLENBcUNaa0ksYSxHQUFnQixHO0FBckNKbEksRSxDQXNDWm1JLGUsR0FBa0IsRztBQXRDTm5JLEUsQ0F1Q1pvSSxpQixHQUFvQixHO0FBdkNScEksRSxDQXdDWnFJLHFCLEdBQXdCLEc7QUF4Q1pySSxFLENBeUNac0ksYSxHQUFnQixHO0FBekNKdEksRSxDQTBDWnVJLFksR0FBZSxHO0FBMUNIdkksRSxDQTJDWndJLFksR0FBZSxHO0FBM0NIeEksRSxDQTRDWnlJLGtCLEdBQXFCLEc7QUE1Q1R6SSxFLENBNkNaMEksTyxHQUFVLEc7QUE3Q0UxSSxFLENBOENaMkksUyxHQUFZLEc7QUE5Q0EzSSxFLENBK0NaNEksZSxHQUFrQixHO0FBL0NONUksRSxDQWdEWjZJLFUsR0FBYSxHO0FBaEREN0ksRSxDQWlEWjhJLGUsR0FBa0IsRztBQWpETjlJLEUsQ0FrRFptQixhLEdBQWdCLEc7QUFsREpuQixFLENBbURaK0ksVyxHQUFjLEc7QUFuREYvSSxFLENBb0RaZ0osWSxHQUFlLEc7QUFwREhoSixFLENBcURaaUosZSxHQUFrQixHO0FBckROakosRSxDQXNEWmtKLGMsR0FBaUIsRztBQXRETGxKLEUsQ0F1RFptSixVLEdBQWEsRztBQXZERG5KLEUsQ0F3RFpvSixVLEdBQWEsRztBQXhERHBKLEUsQ0F5RFpxSixxQixHQUF3QixJO0FBekRackosRSxDQTBEWnlFLFUsR0FBYSxHO0FBMUREekUsRSxDQTJEWnNKLFcsR0FBYyxHO0FBM0RGdEosRSxDQTREWnVKLGEsR0FBZ0IsRztBQTVESnZKLEUsQ0E2RFp3SixjLEdBQWlCLEc7QUE3REx4SixFLENBOERaeUosVSxHQUFhLEc7QUE5RER6SixFLENBK0RaMEosVyxHQUFjLEc7QUEvREYxSixFLENBZ0VaMkosYSxHQUFnQixHO0FBaEVKM0osRSxDQWtFWjRKLGMsR0FBaUIsTTtBQWxFTDVKLEUsQ0FtRVorRCx5QixHQUE0Qi9ELEdBQUdnSCxRQUFILEdBQWNoSCxHQUFHNEosYztBQW5FakM1SixFLENBb0VaNkosYyxHQUFpQixNO0FBcEVMN0osRSxDQXFFWjhKLHlCLEdBQTRCOUosR0FBR2dILFFBQUgsR0FBY2hILEdBQUc2SixjO0FBckVqQzdKLEUsQ0F1RVorSixtQixHQUFzQixNO0FBdkVWL0osRSxDQXdFWmdLLHFCLEdBQXdCLFE7QUF4RVpoSyxFLENBeUVaaUssa0IsR0FBcUIsSztBQXpFVGpLLEUsQ0EwRVprSyxrQixHQUFxQixLO0FBMUVUbEssRSxDQTRFWm1LLG1CLEdBQXNCLFU7QUE1RVZuSyxFLENBOEVaNkUsSyxHQUFRLEU7QUE5RUk3RSxFLENBK0Vab0ssVyxHQUFjLFM7QUEvRUZwSyxFLENBZ0ZacUssUyxHQUFZLE87QUFoRkFySyxFLENBaUZadUQsWSxHQUFlLFU7QUFqRkh2RCxFLENBbUZac0ssTyxHQUFVLEs7QUFuRkV0SyxFLENBb0ZadUssUSxHQUFXLE07QUFwRkN2SyxFLENBcUZad0ssUSxHQUFXLE07QUFyRkN4SyxFLENBdUZaNkQsWSxHQUFlN0QsR0FBRzZFLEs7QUF2Rk43RSxFLENBd0ZaRSxjLEdBQWlCLEs7QUF4RkxGLEUsQ0F5RlpLLFcsR0FBYyxFO0FBekZGTCxFLENBMEZad0QsZ0IsR0FBbUIsTztBQTFGUHhELEUsQ0EyRlp5SyxtQixHQUFzQixZO0FBM0ZWekssRSxDQTRGWjBLLHVCLEdBQTBCLHFCO0FBNUZkMUssRSxDQTZGWjJLLG1CLEdBQXNCLFU7QUE3RlYzSyxFLENBOEZaNEssdUIsR0FBMEIsRztrQkE5RmQ1SyxFIiwiZmlsZSI6IlNLLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNLIHtcbiAgc3RhdGljIENIQVJfQU1QRVJTQU5EID0gJyYnO1xuICBzdGF0aWMgQ0hBUl9BTkdMRSA9ICfiiKAnO1xuICBzdGF0aWMgQ0hBUl9BUFBST1hJTUFURUxZID0gJ+KJiCc7XG4gIHN0YXRpYyBDSEFSX0FSUk9XID0gJ+KGkic7XG4gIHN0YXRpYyBDSEFSX0FTVEVSSVNLID0gJyonO1xuICBzdGF0aWMgQ0hBUl9CQUNLU0xBU0ggPSAnXFxcXCc7XG4gIHN0YXRpYyBDSEFSX0NFTFNJVVMgPSAn4oSDJztcbiAgc3RhdGljIENIQVJfQ0lSQ0xFID0gJ+KKmSc7XG4gIHN0YXRpYyBDSEFSX0NJUkNVTUZFUkVOQ0UgPSAn4peLJztcbiAgc3RhdGljIENIQVJfQ0xPU0VfQlJBQ0UgPSAnfSc7XG4gIHN0YXRpYyBDSEFSX0NMT1NFX0JSQUNLRVQgPSAnXSc7XG4gIHN0YXRpYyBDSEFSX0NMT1NFX1BBUkVOVEhFU0lTID0gJyknO1xuICBzdGF0aWMgQ0hBUl9DT0xPTiA9ICc6JztcbiAgc3RhdGljIENIQVJfQ09NTUEgPSAnLCc7XG4gIHN0YXRpYyBDSEFSX0RBU0ggPSAnLSc7XG4gIHN0YXRpYyBDSEFSX0RFR1JFRSA9ICfCsCc7XG4gIHN0YXRpYyBDSEFSX0RJVklERSA9ICfDtyc7XG4gIHN0YXRpYyBDSEFSX0RPVCA9ICcuJztcbiAgc3RhdGljIENIQVJfRE9VQkxFX1FVT1RBVElPTiA9ICdcIic7XG4gIHN0YXRpYyBDSEFSX0VRVUFMID0gJz0nO1xuICBzdGF0aWMgQ0hBUl9FUVVBTF9BUFBST1hJTUFURUxZID0gJ+KJjCc7XG4gIHN0YXRpYyBDSEFSX0VRVUlWQUxFTlQgPSAn4omhJztcbiAgc3RhdGljIENIQVJfRVhDTEFNQVRJT04gPSAnISc7XG4gIHN0YXRpYyBDSEFSX0hFTkNFID0gJ+KItCc7XG4gIHN0YXRpYyBDSEFSX0lORklOSVRZID0gJ+KInic7XG4gIHN0YXRpYyBDSEFSX0lOVEVHUkFMID0gJ+KIqyc7XG4gIHN0YXRpYyBDSEFSX0lOVEVSU0VDVElPTiA9ICfiiKknO1xuICBzdGF0aWMgQ0hBUl9MRVNTID0gJzwnO1xuICBzdGF0aWMgQ0hBUl9MRVNTX0VRVUFMID0gJ+KJpCc7XG4gIHN0YXRpYyBDSEFSX01JTlVTID0gJy0nO1xuICBzdGF0aWMgQ0hBUl9NSU5VVEUgPSAn4oCyJztcbiAgc3RhdGljIENIQVJfTVVMVElQTFkgPSAnw5cnO1xuICBzdGF0aWMgQ0hBUl9NT1JFID0gJz4nO1xuICBzdGF0aWMgQ0hBUl9NT1JFX0VRVUFMID0gJ+KJpSc7XG4gIHN0YXRpYyBDSEFSX05PVF9FUVVBTCA9ICfiiaAnO1xuICBzdGF0aWMgQ0hBUl9OT1RfTEVTUyA9ICfiia4nO1xuICBzdGF0aWMgQ0hBUl9OT1RfTU9SRSA9ICfiia8nO1xuICBzdGF0aWMgQ0hBUl9PUEVOX0JSQUNFID0gJ3snO1xuICBzdGF0aWMgQ0hBUl9PUEVOX0JSQUNLRVQgPSAnWyc7XG4gIHN0YXRpYyBDSEFSX09QRU5fUEFSRU5USEVTSVMgPSAnKCc7XG4gIHN0YXRpYyBDSEFSX1BBUkFMTEVMID0gJ+KAlic7XG4gIHN0YXRpYyBDSEFSX1BFUkNFTlQgPSAnJSc7XG4gIHN0YXRpYyBDSEFSX1BFUk1JTEwgPSAn4oCwJztcbiAgc3RhdGljIENIQVJfUEVSUEVORElDVUxBUiA9ICfiiqUnO1xuICBzdGF0aWMgQ0hBUl9QSSA9ICfPgCc7XG4gIHN0YXRpYyBDSEFSX1BMVVMgPSAnKyc7XG4gIHN0YXRpYyBDSEFSX1BMVVNfTUlOVVMgPSAnwrEnO1xuICBzdGF0aWMgQ0hBUl9QT1VORCA9ICcjJztcbiAgc3RhdGljIENIQVJfUFJPUE9SVElPTiA9ICfiiLcnO1xuICBzdGF0aWMgQ0hBUl9RVUVTVElPTiA9ICc/JztcbiAgc3RhdGljIENIQVJfU0VDT05EID0gJ+OAgyc7XG4gIHN0YXRpYyBDSEFSX1NFQ1RJT04gPSAnwqcnO1xuICBzdGF0aWMgQ0hBUl9TRU1JQ0lSQ0xFID0gJ+KMkic7XG4gIHN0YXRpYyBDSEFSX1NFTUlDT0xPTiA9ICc7JztcbiAgc3RhdGljIENIQVJfU0lHTUEgPSAn4oiRJztcbiAgc3RhdGljIENIQVJfU0lOQ0UgPSAn4oi1JztcbiAgc3RhdGljIENIQVJfU0lOR0xFX1FVT1RBVElPTiA9ICdcXCcnO1xuICBzdGF0aWMgQ0hBUl9TTEFTSCA9ICcvJztcbiAgc3RhdGljIENIQVJfU1FVQVJFID0gJ+KImic7XG4gIHN0YXRpYyBDSEFSX1RSSUFOR0xFID0gJ+KWsyc7XG4gIHN0YXRpYyBDSEFSX1VOREVSTElORSA9ICdfJztcbiAgc3RhdGljIENIQVJfVU5JT04gPSAn4oiqJztcbiAgc3RhdGljIENIQVJfVkFSSUVTID0gJ+KInSc7XG4gIHN0YXRpYyBDSEFSX1ZFUlRJQ0FMID0gJ3wnO1xuXG4gIHN0YXRpYyBGSUxFX1RZUEVfSFRNTCA9ICdodG1sJztcbiAgc3RhdGljIEZJTEVfVFlQRV9IVE1MX1dJVEhfUE9JTlQgPSBTSy5DSEFSX0RPVCArIFNLLkZJTEVfVFlQRV9IVE1MO1xuICBzdGF0aWMgRklMRV9UWVBFX0pTT04gPSAnanNvbic7XG4gIHN0YXRpYyBGSUxFX1RZUEVfSlNPTl9XSVRIX1BPSU5UID0gU0suQ0hBUl9ET1QgKyBTSy5GSUxFX1RZUEVfSlNPTjtcblxuICBzdGF0aWMgUkVRVUVTVF9NRVRIT0RfUE9TVCA9ICdQT1NUJztcbiAgc3RhdGljIFJFUVVFU1RfTUVUSE9EX0RFTEVURSA9ICdERUxFVEUnO1xuICBzdGF0aWMgUkVRVUVTVF9NRVRIT0RfUFVUID0gJ1BVVCc7XG4gIHN0YXRpYyBSRVFVRVNUX01FVEhPRF9HRVQgPSAnR0VUJztcblxuICBzdGF0aWMgSlNfS0VZV09SRF9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG5cbiAgc3RhdGljIEVNUFRZID0gJyc7XG4gIHN0YXRpYyBTVFJfREVGQVVMVCA9ICdkZWZhdWx0JztcbiAgc3RhdGljIFNUUl9FUlJPUiA9ICdlcnJvcic7XG4gIHN0YXRpYyBTVFJfTEFOR1VBR0UgPSAnbGFuZ3VhZ2UnO1xuXG4gIHN0YXRpYyBFTlZfREVWID0gJ0RFVic7XG4gIHN0YXRpYyBFTlZfVEVTVCA9ICdURVNUJztcbiAgc3RhdGljIEVOVl9QUk9EID0gJ1BST0QnO1xuXG4gIHN0YXRpYyBDT05URVhUX1BBVEggPSBTSy5FTVBUWTtcbiAgc3RhdGljIERFRkFVTFRfRE9NQUlOID0gJyRzayc7XG4gIHN0YXRpYyBERUZBVUxUX0VOViA9IHt9O1xuICBzdGF0aWMgREVGQVVMVF9MQU5HVUFHRSA9ICdlbl9VUyc7XG4gIHN0YXRpYyBERUZBVUxUX01PTUVOVF9EQVRFID0gJ1lZWVktTU0tREQnO1xuICBzdGF0aWMgREVGQVVMVF9NT01FTlRfREFURVRJTUUgPSAnWVlZWS1NTS1ERCBISDptbTpzcyc7XG4gIHN0YXRpYyBERUZBVUxUX01PTUVOVF9USU1FID0gJ0hIOm1tOnNzJztcbiAgc3RhdGljIERFRkFVTFRfTU9NRU5UX1RJTUVaT05FID0gJ1onO1xuXG4gIC8qKlxuICAgKiBOZXcgb3IgZ2V0IG5hbWVzcGFjZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAkIG5hbWVzcGFjZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaW5pdFZhbCBpbml0IHZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnYgd2luZG93KGJyb3dzZXIpIG9yIGdsb2JhbChub2RlanMpIGV0Yy5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAgICovXG4gIHN0YXRpYyAkKCQgPSBTSy5ERUZBVUxUX0RPTUFJTiwgaW5pdFZhbCA9IHt9LCBlbnYgPSBTSy5ERUZBVUxUX0VOVikge1xuICAgIGlmICghZW52WyRdKSB7XG4gICAgICBlbnZbJF0gPSBpbml0VmFsO1xuICAgIH0gZWxzZSBpZiAoIV8uaXNFbXB0eShpbml0VmFsKSkge1xuICAgICAgZW52WyRdID0gaW5pdFZhbDtcbiAgICB9XG4gICAgcmV0dXJuIGVudlskXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZWZhdWx0IG9mIGFzc2lnbldpdGgncyBjdXN0b21pemVyXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHsqfHVuZGVmaW5lZH1cbiAgICogQHNlZSBfLmFzc2lnbldpdGhcbiAgICovXG4gIHN0YXRpYyBfc2tBc3NpZ25DdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgIHJldHVybiBTSy5hcmVQbGFpbk9iamVjdChvYmpWYWx1ZSwgc3JjVmFsdWUsIG9iamVjdCwgc291cmNlKSA/IFNLLmFzc2lnbihvYmpWYWx1ZSwgc3JjVmFsdWUpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIHh4eC5jb20sYSxiID0+IHh4eC5jb20/YT1iXG4gICAqIHh4eC5jb20/YT1iLGEsYyA9PiB4eHguY29tP2E9Y1xuICAgKiB4eHguY29tP2E9YixjLGQgPT4geHh4LmNvbT9hPWImYz1kXG4gICAqXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIHBhcmFtXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGFwcGVuZFBhcmFtZXRlcih1cmwsIHBhcmFtLCB2YWx1ZSkge1xuICAgIGlmICh1cmwuaW5kZXhPZihTSy5DSEFSX1FVRVNUSU9OKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiB1cmwgKyBTSy5DSEFSX1FVRVNUSU9OICsgcGFyYW0gKyBTSy5DSEFSX0VRVUFMICsgdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBTSy5nZXRSZXF1ZXN0UGFyYW1ldGVyKHBhcmFtLCB1cmwuc3BsaXQoU0suQ0hBUl9RVUVTVElPTilbMV0pO1xuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UocGFyYW0gKyBTSy5DSEFSX0VRVUFMICsgY3VycmVudFZhbHVlLCBwYXJhbSArIFNLLkNIQVJfRVFVQUwgKyB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdXJsICsgU0suQ0hBUl9BTVBFUlNBTkQgKyBwYXJhbSArIFNLLkNIQVJfRVFVQUwgKyB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHZhbHVlcyBhcmUgcGxhaW4gb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICogQHNlZSBfLmlzUGxhaW5PYmplY3RcbiAgICovXG4gIHN0YXRpYyBhcmVQbGFpbk9iamVjdCguLi52YWx1ZXMpIHtcbiAgICBsZXQgcnRuID0gdHJ1ZTtcbiAgICB2YWx1ZXMuZm9yRWFjaCgoJGl0ZW0pID0+IHtcbiAgICAgIHJ0biA9IHJ0biAmJiBfLmlzUGxhaW5PYmplY3QoJGl0ZW0pO1xuICAgIH0pO1xuICAgIHJldHVybiBydG47XG4gIH1cblxuICAvKipcbiAgICogbGV0IG8xID0ge2E6W3snYic6MX0sJ2MnLDJdLCBkOntlOjN9fTtcbiAgICogbGV0IG8yID0ge2E6W3sneCc6MTB9LCd5JywyMF0sIGQ6e3o6MzB9fTtcbiAgICogbGV0IG8zID0gJC5leHRlbmQodHJ1ZSxvMSxvMik7XG4gICAqIEpTT04uc3RyaW5naWZ5KG8zKTsvL3tcImFcIjpbe1wiYlwiOjEsXCJ4XCI6MTB9LFwieVwiLDIwXSxcImRcIjp7XCJlXCI6MyxcInpcIjozMH19XG4gICAqIG8xID09IG8zOy8vdHJ1ZVxuICAgKiBvMSA9PT0gbzM7Ly90cnVlXG4gICAqXG4gICAqIGxldCBvMSA9IHthOlt7J2InOjF9LCdjJywyXSwgZDp7ZTozfX07XG4gICAqIGxldCBvMiA9IHthOlt7J3gnOjEwfSwneScsMjBdLCBkOnt6OjMwfX07XG4gICAqIGxldCBvMyA9IF8uYXNzaWduKG8xLG8yKTtcbiAgICogSlNPTi5zdHJpbmdpZnkobzMpOy8ve1wiYVwiOlt7XCJ4XCI6MTB9LFwieVwiLDIwXSxcImRcIjp7XCJ6XCI6MzB9fVxuICAgKiBvMSA9PSBvMzsvL3RydWVcbiAgICogbzEgPT09IG8zOy8vdHJ1ZVxuICAgKlxuICAgKiBsZXQgbzEgPSB7cDE6MSxmMTpmdW5jdGlvbigpe2NvbnNvbGUubG9nKCdmMScpO319XG4gICAqIGxldCBvMiA9IHtwMjoyLGYyOmZ1bmN0aW9uKCl7Y29uc29sZS5sb2coJ2YyJyk7fSxmMTpmdW5jdGlvbigpe2NvbnNvbGUubG9nKCdmMSBpbiBvMicpfX07XG4gICAqIGxldCBvMyA9IHt9O1xuICAgKiBsZXQgbzQgPSBfLmFzc2lnbihvMyxvMSxvMik7XG4gICAqIG80ID09PSBvMzsvL3RydWVcbiAgICogbzIuZjEgPT09IG80LmYxOy8vdHJ1ZVxuICAgKiBvNC5mMSgpOy8vZjEgaW4gbzJcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBvYmplY3RzIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAgICovXG4gIHN0YXRpYyBhc3NpZ24ob2JqZWN0LCAuLi5vYmplY3RzKSB7XG4gICAgcmV0dXJuIF8uYXNzaWduV2l0aC5hcHBseSh0aGlzLCBfLmNvbmNhdChvYmplY3QsIG9iamVjdHMsIFNLLl9za0Fzc2lnbkN1c3RvbWl6ZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb29raWVTdG9yYWdlXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGNvb2tpZXMoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgQ29va2llcy5yZW1vdmUoa2V5KTtcbiAgICAgIHJldHVybiBDb29raWVzLnNldChrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvb2tpZXMuZ2V0KGtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhcnJheVxuICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gYW5vdGhlckFycmF5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb25jYXRcbiAgICogQHJldHVybnMge0FycmF5fHN0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogZGVzY2FydGVzKFsnYWxlcnQnLCdidG4nXSxbJ3N1Y2Nlc3MnLCdpbmZvJ10pOy8vWydhbGVydC1zdWNjZXNzJywnYWxlcnQtaW5mbycsJ2J0bi1zdWNjZXNzJywnYnRuLWluZm8nXVxuICAgKiBkZXNjYXJ0ZXMoJ2FsZXJ0JywnbGluaycsJy0nKTsvLydhbGVydC1saW5rJ1xuICAgKi9cbiAgc3RhdGljIGRlc2NhcnRlcyhhcnJheSA9IFtdLCBhbm90aGVyQXJyYXkgPSBbXSwgY29uY2F0ID0gU0suQ0hBUl9EQVNIKSB7XG4gICAgbGV0IGFycjEgPSBBcnJheS5pc0FycmF5KGFycmF5KSA/IGFycmF5IDogW2FycmF5XTtcbiAgICBsZXQgYXJyMiA9IEFycmF5LmlzQXJyYXkoYW5vdGhlckFycmF5KSA/IGFub3RoZXJBcnJheSA6IFthbm90aGVyQXJyYXldO1xuICAgIGxldCBydG4gPSBbXTtcbiAgICBhcnIxLmZvckVhY2goKCRpdGVtKSA9PiB7XG4gICAgICBhcnIyLmZvckVhY2goKCQkaXRlbSkgPT4ge1xuICAgICAgICBydG4ucHVzaCgkaXRlbSArIGNvbmNhdCArICQkaXRlbSk7XG4gICAgICB9KVxuICAgIH0pO1xuICAgIHJldHVybiBydG4ubGVuZ3RoID09PSAxID8gcnRuWzBdIDogcnRuO1xuICB9XG5cbiAgc3RhdGljIGVtcHR5RnVuYygpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIHRoZSB1cmwgb2YgcGFnZSBvciBzdWIgZnJhbWUgcGFnZVxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldEN1cnJlbnRIcmVmKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBsYW5ndWFnZSBpbiBjb29raWVzIGlmIGV4aXN0LCBlbHNlIGRlZmF1dGxcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRDdXJyZW50TGFuZ3VhZ2UoKSB7XG4gICAgbGV0IGxhbmd1YWdlID0gU0suY29va2llcyhTSy5TVFJfTEFOR1VBR0UpO1xuICAgIHJldHVybiBsYW5ndWFnZSA/IGxhbmd1YWdlIDogU0suREVGQVVMVF9MQU5HVUFHRTtcbiAgfVxuXG4gIC8qKlxuICAgKiB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0Q3VycmVudE9yaWdpbigpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiAvYS9iIC0+IC9hL2JcbiAgICogL2EvYi9jLmh0bWwgLT4gL2EvYi9jXG4gICAqIC9jb250ZXh0L2EgLT4gL2FcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRDdXJyZW50UGF0aCgpIHtcbiAgICBsZXQgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoU0suQ09OVEVYVF9QQVRILmxlbmd0aCwgcGF0aC5sZW5ndGgpO1xuICAgIHBhdGggPSBfLmVuZHNXaXRoKHBhdGgsIFNLLkZJTEVfVFlQRV9IVE1MX1dJVEhfUE9JTlQpID8gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sZW5ndGggLSA1KSA6IHBhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICAvKipcbiAgICogP2E9MSZiPTJcbiAgICpcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgZ2V0Q3VycmVudFNlYXJjaCgpIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgfVxuXG4gIC8qKlxuICAgKiAoYSw/YT0xJmI9MikgLT4gMVxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1cbiAgICogQHBhcmFtIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBnZXRSZXF1ZXN0UGFyYW1ldGVyKHBhcmFtLCBzZWFyY2gpIHtcbiAgICBzZWFyY2ggPSBzZWFyY2ggfHwgU0suZ2V0Q3VycmVudFNlYXJjaCgpO1xuICAgIHNlYXJjaCA9IF8uc3RhcnRzV2l0aChzZWFyY2gsIFNLLkNIQVJfUVVFU1RJT04pID8gc2VhcmNoLnNsaWNlKDEpIDogc2VhcmNoO1xuICAgIGxldCByZWcgPSBuZXcgUmVnRXhwKCcoXnwmKScgKyBwYXJhbSArICc9KFteJl0qKSgmfCQpJyk7XG4gICAgbGV0IHIgPSBzZWFyY2gubWF0Y2gocmVnKTtcbiAgICByZXR1cm4gciA/IGRlY29kZVVSSUNvbXBvbmVudChyWzJdKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiAvYS9iIC0+IFsnLycsJy9hLycsJy9hL2IvJ11cbiAgICpcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgc3RhdGljIGdldFN1YlBhdGhzKHBhdGgpIHtcbiAgICBsZXQgcnRuID0gW1NLLkNIQVJfU0xBU0hdO1xuICAgIHBhdGguc3BsaXQoU0suQ0hBUl9TTEFTSCkucmVkdWNlKCgkYWNjdW11bGF0b3IsICRpdGVtKSA9PiB7XG4gICAgICBpZiAoU0suczRzKCRpdGVtKSA9PT0gU0suRU1QVFkpIHtcbiAgICAgICAgcmV0dXJuICRhY2N1bXVsYXRvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0bXBWYWxpZFBhdGggPSBTSy5nZXRWYWxpZFBhdGgoJGFjY3VtdWxhdG9yICsgJGl0ZW0pO1xuICAgICAgICBydG4ucHVzaCh0bXBWYWxpZFBhdGgpO1xuICAgICAgICByZXR1cm4gdG1wVmFsaWRQYXRoO1xuICAgICAgfVxuICAgIH0sIFNLLkVNUFRZKTtcbiAgICByZXR1cm4gcnRuO1xuICB9XG5cbiAgLyoqXG4gICAqIGEvYi9jIC0+IC9hL2IvYy9cbiAgICpcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRWYWxpZFBhdGgocGF0aCkge1xuICAgIHJldHVybiAoXy5zdGFydHNXaXRoKHBhdGgsIFNLLkNIQVJfU0xBU0gpID8gU0suRU1QVFkgOiBTSy5DSEFSX1NMQVNIKSArIHBhdGggKyAoXy5lbmRzV2l0aChwYXRoLCBTSy5DSEFSX1NMQVNIKSA/IFNLLkVNUFRZIDogU0suQ0hBUl9TTEFTSCk7XG4gIH1cblxuICAvKipcbiAgICogbG9jYWxTdG9yYWdlXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgbG9jYWwoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogd2ViIHJlZGlyZWN0XG4gICAqXG4gICAqIEBwYXJhbSB1cmxcbiAgICovXG4gIHN0YXRpYyByZWRpcmVjdCh1cmwpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGFycmF5IGZvciB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHM0YSh2YWx1ZSwgZGVmYXVsdFZhbHVlID0gW10pIHtcbiAgICByZXR1cm4gXy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhZmUgYm9vbGVhbiBmb3IgdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtib29sZWFufSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgczRiKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSBmYWxzZSkge1xuICAgIHJldHVybiBfLmlzQm9vbGVhbih2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGRhdGUgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7RGF0ZX0gZGVmYXVsdFZhbHVlXG4gICAqIEByZXR1cm5zIHtEYXRlfVxuICAgKi9cbiAgc3RhdGljIHM0ZCh2YWx1ZSwgZGVmYXVsdFZhbHVlID0gbmV3IERhdGUoKSkge1xuICAgIHJldHVybiBfLmlzRGF0ZSh2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIGZpbml0ZSBudW1iZXIgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIHN0YXRpYyBzNG4odmFsdWUsIGRlZmF1bHRWYWx1ZSA9IDApIHtcbiAgICByZXR1cm4gXy5pc0Zpbml0ZShfLnRvTnVtYmVyKHZhbHVlKSkgPyBfLnRvTnVtYmVyKHZhbHVlKSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIHBsYWluIG9iamVjdCBmb3IgdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRWYWx1ZVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBzdGF0aWMgczRvKHZhbHVlLCBkZWZhdWx0VmFsdWUgPSB7fSkge1xuICAgIHJldHVybiBfLmlzUGxhaW5PYmplY3QodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSBzdHJpbmcgZm9yIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0VmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBzNHModmFsdWUsIGRlZmF1bHRWYWx1ZSA9IFNLLkVNUFRZKSB7XG4gICAgcmV0dXJuIChfLmlzQm9vbGVhbih2YWx1ZSkgfHwgXy5pc0Zpbml0ZSh2YWx1ZSkgfHwgXy5pc1N0cmluZyh2YWx1ZSkpID8gU3RyaW5nKHZhbHVlKSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXNzaW9uU3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNlc3Npb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwcGVyIGZpcnN0IGNoYXJcbiAgICpcbiAgICogQHBhcmFtIHdvcmRzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIHVwcGVyV29yZHNGaXJzdENoYXIoJ2xpc3QnKTsvL0xpc3RcbiAgICogdXBwZXJXb3Jkc0ZpcnN0Q2hhcigneGkgbkFuIHNoaSB5b3UgeFVlIHl1YW4gY2hpbmEgcGVvcGxlJyk7Ly9YaSBOQW4gU2hpIFlvdSBYVWUgWXVhbiBDaGluYSBQZW9wbGVcbiAgICovXG4gIHN0YXRpYyB1cHBlcldvcmRzRmlyc3RDaGFyKHdvcmRzKSB7XG4gICAgcmV0dXJuIF8udG9TdHJpbmcod29yZHMpLnJlcGxhY2UoL1xcc1thLXpdL2csICgkbm9uRmlyc3RXb3JkKSA9PiB7XG4gICAgICByZXR1cm4gJG5vbkZpcnN0V29yZC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pLnJlcGxhY2UoL15bYS16XS8sICgkZmlyc3RXb3JkKSA9PiB7XG4gICAgICByZXR1cm4gJGZpcnN0V29yZC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pXG4gIH1cbn1cbiJdfQ==