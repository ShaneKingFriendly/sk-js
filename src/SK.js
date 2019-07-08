import Proxy0 from './Proxy0';

const crypto = require('crypto');
const uuidByteToHex = [];
for (let i = 0; i < 256; ++i) {
  uuidByteToHex[i] = (i + 0x100).toString(16).substr(1);
}

export default class SK {
  static CHAR_AMPERSAND = '&';
  static CHAR_ANGLE = '∠';
  static CHAR_APPROXIMATELY = '≈';
  static CHAR_ARROW = '→';
  static CHAR_ASTERISK = '*';
  static CHAR_BACKSLASH = '\\';
  static CHAR_BLANK = ' ';
  static CHAR_CELSIUS = '℃';
  static CHAR_CIRCLE = '⊙';
  static CHAR_CIRCUMFERENCE = '○';
  static CHAR_CLOSE_BRACE = '}';
  static CHAR_CLOSE_BRACKET = ']';
  static CHAR_CLOSE_PARENTHESIS = ')';
  static CHAR_COLON = ':';
  static CHAR_COMMA = ',';
  static CHAR_DASH = '-';
  static CHAR_DEGREE = '°';
  static CHAR_DIVIDE = '÷';
  static CHAR_DOT = '.';
  static CHAR_DOUBLE_QUOTATION = '"';
  static CHAR_EMPTY = '';
  static CHAR_EQUAL = '=';
  static CHAR_EQUAL_APPROXIMATELY = '≌';
  static CHAR_EQUIVALENT = '≡';
  static CHAR_ESCAPE_N = '\n';
  static CHAR_ESCAPE_T = '\t';
  static CHAR_EXCLAMATION = '!';
  static CHAR_HENCE = '∴';
  static CHAR_INFINITY = '∞';
  static CHAR_INTEGRAL = '∫';
  static CHAR_INTERSECTION = '∩';
  static CHAR_LESS = '<';
  static CHAR_LESS_EQUAL = '≤';
  static CHAR_MINUS = '-';
  static CHAR_MINUTE = '′';
  static CHAR_MULTIPLY = '×';
  static CHAR_MORE = '>';
  static CHAR_MORE_EQUAL = '≥';
  static CHAR_NOT_EQUAL = '≠';
  static CHAR_NOT_LESS = '≮';
  static CHAR_NOT_MORE = '≯';
  static CHAR_OPEN_BRACE = '{';
  static CHAR_OPEN_BRACKET = '[';
  static CHAR_OPEN_PARENTHESIS = '(';
  static CHAR_PARALLEL = '‖';
  static CHAR_PERCENT = '%';
  static CHAR_PERMILL = '‰';
  static CHAR_PERPENDICULAR = '⊥';
  static CHAR_PI = 'π';
  static CHAR_PLUS = '+';
  static CHAR_PLUS_MINUS = '±';
  static CHAR_POUND = '#';
  static CHAR_PROPORTION = '∷';
  static CHAR_QUESTION = '?';
  static CHAR_SECOND = '〃';
  static CHAR_SECTION = '§';
  static CHAR_SEMICIRCLE = '⌒';
  static CHAR_SEMICOLON = ';';
  static CHAR_SIGMA = '∑';
  static CHAR_SINCE = '∵';
  static CHAR_SINGLE_QUOTATION = '\'';
  static CHAR_SLASH = '/';
  static CHAR_SQUARE = '√';
  static CHAR_TRIANGLE = '△';
  static CHAR_UNDERLINE = '_';
  static CHAR_UNDERLINE_DOUBLE = '__';
  static CHAR_UNION = '∪';
  static CHAR_VARIES = '∝';
  static CHAR_VERTICAL = '|';

  static CHAR_Y = 'Y';
  static CHAR_N = 'N';
  static CHAR_T = 'T';
  static CHAR_F = 'F';
  static CHAR_MALE = '♂';
  static CHAR_FEMALE = '♀';

  static FILE_TYPE_HTML = 'html';
  static FILE_TYPE_HTML_WITH_POINT = SK.CHAR_DOT + SK.FILE_TYPE_HTML;
  static FILE_TYPE_JSON = 'json';
  static FILE_TYPE_JSON_WITH_POINT = SK.CHAR_DOT + SK.FILE_TYPE_JSON;
  static JS_KEYWORD_BOOLEAN = 'boolean';
  static JS_KEYWORD_FUNCTION = 'function';
  static JS_KEYWORD_OBJECT = 'object';
  static LANGUAGE_en_US = 'en_US';
  static LANGUAGE_zh_CN = 'zh_CN';

  static REQUEST_METHOD_POST = 'POST';
  static REQUEST_METHOD_DELETE = 'DELETE';
  static REQUEST_METHOD_PUT = 'PUT';
  static REQUEST_METHOD_GET = 'GET';

  static SET_ARY_BIN = '01';
  static SET_ARY_OCT = '01234567';
  static SET_ARY_DEC = '0123456789';
  static SET_ARY_HEX = '0123456789abcdef';
  static SET_ARY_L62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static STR_DEFAULT = 'default';
  static STR_ERROR = 'error';
  static STR_LANGUAGE = 'language';

  static DEFAULT_CONTEXT_PATH = SK.CHAR_EMPTY;
  static DEFAULT_DOMAIN = '$sk';
  static DEFAULT_ENV = {};
  static DEFAULT_LANGUAGE = SK.LANGUAGE_en_US;
  static DEFAULT_MOMENT_DATE = 'YYYY-MM-DD';
  static DEFAULT_MOMENT_DATETIME = 'YYYY-MM-DD HH:mm:ss';
  static DEFAULT_MOMENT_TIME = 'HH:mm:ss';
  static DEFAULT_MOMENT_TIMEZONE = 'Z';

  /**
   * New or get namespace object.
   *
   * @param {string} $ namespace
   * @param {Object} initVal init value
   * @param {Object} env window(browser) or global(nodejs) etc.
   * @returns {*} Returns the new assigner function.
   */
  static $($ = SK.DEFAULT_DOMAIN, initVal = {}, env = SK.DEFAULT_ENV) {
    if (!env[$]) {
      env[$] = initVal;
    } else if (!Proxy0._.isEmpty(initVal)) {
      env[$] = initVal;
    }
    return env[$];
  }

  /**
   * default of assignWith's customizer
   *
   * @private
   * @returns {*|undefined}
   * @see Proxy0._.assignWith
   */
  static _skAssignCustomizer(objValue, srcValue, key, object, source) {
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
  static appendParameter(url, param, value) {
    if (url.indexOf(SK.CHAR_QUESTION) === -1) {
      return url + SK.CHAR_QUESTION + param + SK.CHAR_EQUAL + value;
    } else {
      const currentValue = SK.getRequestParameter(param, url.split(SK.CHAR_QUESTION)[1]);
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
   * @see Proxy0._.isPlainObject
   */
  static arePlainObject(...values) {
    let rtn = true;
    values.forEach((item) => {
      rtn = rtn && Proxy0._.isPlainObject(item);
    });
    return rtn;
  }

  /**
   * overwrite assign of lodash
   *
   * @static
   * @param {Object} object The destination object.
   * @param {...Object} objects The source objects.
   */
  static assign(object, ...objects) {
    return Proxy0._.assignWith(object, ...objects, SK._skAssignCustomizer);
  }

  /**
   * cookieStorage
   *
   * @param key
   * @param value
   * @returns {*}
   */
  static cookies(key, value) {
    if (arguments.length > 1) {
      Proxy0.Cookies.remove(key);
      if (!Proxy0._.isNil(value)) {
        return Proxy0.Cookies.set(key, value);
      }
    } else {
      return Proxy0.Cookies.get(key);
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
  static descartes(array = [], anotherArray = [], concat = SK.CHAR_DASH) {
    const arr1 = Array.isArray(array) ? array : [array];
    const arr2 = Array.isArray(anotherArray) ? anotherArray : [anotherArray];
    const rtn = [];
    arr1.forEach((item1) => {
      arr2.forEach((item2) => {
        rtn.push(item1 + concat + item2);
      });
    });
    return rtn.length === 1 ? rtn[0] : rtn;
  }

  static ellipsis(str, len = 8) {
    let safeStr = SK.s4s(str);
    return safeStr.length > len ? `${safeStr.split(SK.CHAR_ESCAPE_N)[0].split(SK.CHAR_LESS)[0].substring(0, len)}...` : str;
  }

  static emptyFunc() {

  }

  //overwrite extend of jquery
  static extend() {
    let options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === SK.JS_KEYWORD_BOOLEAN) {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== SK.JS_KEYWORD_OBJECT && !Proxy0._.isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {

      // Only deal with non-null/undefined values
      if ((options = arguments[i]) !== null) {

        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (Proxy0._.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

            if (copyIsArray) {
              copyIsArray = false;
              clone = [];//src && Array.isArray(src) ? src : [];//SK modify jquery behaviour

            } else {
              clone = src && Proxy0._.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = SK.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  }

  //overwrite extend of jquery
  static extends() {
    let options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== SK.JS_KEYWORD_OBJECT && !Proxy0._.isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {

      // Only deal with non-null/undefined values
      if ((options = arguments[i]) !== null) {

        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (Proxy0._.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

            if (copyIsArray) {
              copyIsArray = false;
              clone = [];//src && Array.isArray(src) ? src : [];//SK modify jquery behaviour

            } else {
              clone = src && Proxy0._.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = SK.extends(deep, clone, copy);

            // Don't bring in undefined values
          } else {//if (copy !== undefined) {//SK modify jquery behaviour
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  }

  /**
   * the url of page or sub frame page
   *
   * @returns {string}
   */
  static getCurrentHref() {
    return window.location.href;
  }

  /**
   * language in cookies if exist, else defautl
   *
   * @returns {string}
   */
  static getCurrentLanguage() {
    let language = SK.cookies(SK.STR_LANGUAGE);
    if (!language) {
      SK.cookies(SK.STR_LANGUAGE, SK.DEFAULT_LANGUAGE);
      language = SK.cookies(SK.STR_LANGUAGE);
    }
    return language;
  }

  /**
   * window.location.origin
   *
   * @returns {string}
   */
  static getCurrentOrigin() {
    return window.location.origin;
  }

  /**
   * /a/b -> /a/b
   * /a/b/c.html -> /a/b/c
   * /context/a -> /a
   *
   * @returns {string}
   */
  static getCurrentPath() {
    let path = window.location.pathname;
    path = path.substring(SK.DEFAULT_CONTEXT_PATH.length, path.length);
    path = Proxy0._.endsWith(path, SK.FILE_TYPE_HTML_WITH_POINT) ? path.substring(0, path.length - 5) : path;
    return path;
  }

  /**
   * ?a=1&b=2
   *
   * @returns {*}
   */
  static getCurrentSearch() {
    return window.location.search;
  }

  /**
   * (a,?a=1&b=2) -> 1
   *
   * @param param
   * @param search
   * @returns {*}
   */
  static getRequestParameter(param, search = SK.getCurrentSearch()) {
    search = Proxy0._.startsWith(search, SK.CHAR_QUESTION) ? search.slice(1) : search;
    const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`);
    const r = search.match(reg);
    return r ? decodeURIComponent(r[2]) : undefined;
  }

  /**
   * /a/b -> ['/','/a/','/a/b/']
   *
   * @param path
   * @returns {string[]}
   */
  static getSubPaths(path) {
    const rtn = [SK.CHAR_SLASH];
    path.split(SK.CHAR_SLASH).reduce((sum, item) => {
      if (SK.s4s(item) === SK.CHAR_EMPTY) {
        return sum;
      } else {
        const tmpValidPath = SK.getValidPath(sum + item);
        rtn.push(tmpValidPath);
        return tmpValidPath;
      }
    }, SK.CHAR_EMPTY);
    return rtn;
  }

  /**
   * a/b/c -> /a/b/c/
   *
   * @param path
   * @returns {string}
   */
  static getValidPath(path) {
    return (Proxy0._.startsWith(path, SK.CHAR_SLASH) ? SK.CHAR_EMPTY : SK.CHAR_SLASH) + path + (Proxy0._.endsWith(path, SK.CHAR_SLASH) ? SK.CHAR_EMPTY : SK.CHAR_SLASH);
  }

  /**
   * localStorage
   *
   * @param key
   * @param value
   */
  static local(key, value) {
    if (arguments.length > 1) {
      localStorage.removeItem(key);
      if (!Proxy0._.isNil(value)) {
        return localStorage.setItem(key, value);
      }
    } else {
      return localStorage.getItem(key);
    }
  }

  /**
   * web redirect
   *
   * @param url
   */
  static redirect(url) {
    window.location.href = url;
  }

  /**
   * Safe array for value.
   * @param {*} value
   * @param {Array} defaultValue
   * @returns {Array}
   */
  static s4a(value, defaultValue = []) {
    return Proxy0._.isArray(value) ? value : defaultValue;
  }

  /**
   * Safe boolean for value.
   * @param {*} value
   * @param {boolean} defaultValue
   * @returns {boolean}
   */
  static s4b(value, defaultValue = false) {
    return Proxy0._.isBoolean(value) ? value : defaultValue;
  }

  /**
   * Safe date for value.
   * @param {*} value
   * @param {Date} defaultValue
   * @returns {Date}
   */
  static s4d(value, defaultValue = new Date()) {
    return Proxy0._.isDate(value) ? value : defaultValue;
  }

  /**
   * Safe finite number for value.
   * @param {*} value
   * @param {number} defaultValue
   * @returns {number}
   */
  static s4n(value, defaultValue = 0) {
    return Proxy0._.isFinite(Proxy0._.toNumber(value)) ? Proxy0._.toNumber(value) : defaultValue;
  }

  /**
   * Safe plain object for value.
   * @param {*} value
   * @param {Object} defaultValue
   * @returns {{}}
   */
  static s4o(value, defaultValue = {}) {
    return Proxy0._.isPlainObject(value) ? value : defaultValue;
  }

  /**
   * Safe string for value.
   * @param {*} value
   * @param {string} defaultValue
   * @returns {string}
   */
  static s4s(value, defaultValue = SK.CHAR_EMPTY) {
    return (Proxy0._.isBoolean(value) || Proxy0._.isFinite(value) || Proxy0._.isString(value)) ? String(value) : defaultValue;
  }

  /**
   * sessionStorage
   *
   * @param key
   * @param value
   */
  static session(key, value) {
    if (arguments.length > 1) {
      sessionStorage.removeItem(key);
      if (!Proxy0._.isNil(value)) {
        return sessionStorage.setItem(key, value);
      }
    } else {
      return sessionStorage.getItem(key);
    }
  }

  static strMapping(str = SK.uuid().toLowerCase().replace(/-/g, SK.CHAR_EMPTY), dstSet = SK.SET_ARY_L62, srcSet = SK.SET_ARY_HEX) {
    let i, divide, newlen,
      numberMap = {},
      fromBase = srcSet.length,
      toBase = dstSet.length,
      length = str.length,
      result = SK.CHAR_EMPTY;

    if (srcSet === dstSet) {
      return str;
    }

    for (i = 0; i < length; i++) {
      numberMap[i] = srcSet.indexOf(str[i]);
    }
    do {
      divide = 0;
      newlen = 0;
      for (i = 0; i < length; i++) {
        divide = divide * fromBase + numberMap[i];
        if (divide >= toBase) {
          numberMap[newlen++] = parseInt(divide / toBase, 10);
          divide = divide % toBase;
        } else if (newlen > 0) {
          numberMap[newlen++] = 0;
        }
      }
      length = newlen;
      result = dstSet.slice(divide, divide + 1).concat(result);
    } while (newlen !== 0);

    return result;
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
  static upperWordsFirstChar(words) {
    return Proxy0._.toString(words).replace(/\s[a-z]/g, (nonFirstWord) => {
      return nonFirstWord.toUpperCase();
    }).replace(/^[a-z]/, (firstWord) => {
      return firstWord.toUpperCase();
    });
  }

  //XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
  static uuid() {
    let rnds = crypto.randomBytes(16);
    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    let i = 0;
    return ([uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]],
      uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]], SK.CHAR_MINUS,
      uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]], SK.CHAR_MINUS,
      uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]], SK.CHAR_MINUS,
      uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]], SK.CHAR_MINUS,
      uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]],
      uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]],
      uuidByteToHex[rnds[i++]], uuidByteToHex[rnds[i++]]]).join('');
  }

  static uuidShort(uuid = SK.uuid(), dstSet = SK.SET_ARY_L62) {
    return SK.strMapping(uuid.toLowerCase().replace(/-/g, SK.CHAR_EMPTY), dstSet, SK.SET_ARY_HEX);
  }
}
