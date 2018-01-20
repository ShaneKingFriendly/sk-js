'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (fraction === 0 ? '' : '.' + arr[1]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBvbHlmaWxsLmpzIl0sIm5hbWVzIjpbIl9za0tleUZ1bmMiLCJrZXkiLCJpdGVtIiwiY29udGV4dCIsImlzUGxhaW5PYmplY3QiLCJzdGFydHNXaXRoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJza0FyciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwidmFsdWUiLCJyZWN1cnNpdmUiLCJrZXlGdW5jIiwicnRuIiwiZm9yRWFjaCIsIiRpdGVtIiwicHVzaCIsImlzQXJyYXkiLCJza0ZpbHRlciIsImZpbHRlckZ1bmMiLCIkaW5kZXgiLCJpc0Z1bmN0aW9uIiwic2tPYmoiLCJza1JtdiIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJza1RvZ2dsZSIsIk51bWJlciIsInNrQ3VycmVuY3lGbXQiLCJmcmFjdGlvbiIsIlN0cmluZyIsInJ0bkFyciIsInJ0bk9iaiIsImtleXMiLCIka2V5IiwidG1wVmFsIiwibGVuZ3RoIiwic2tBc3NpZ24iLCJvYmplY3RzIiwiU0siLCJhc3NpZ24iLCJhcHBseSIsImNvbmNhdCIsInNrVmFsIiwic3RyIiwidmFsIiwiYXJyIiwic3BsaXQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJza1ZhbHMiLCJtYXAiLCJza0JsYW5rIiwidHJpbSIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwidG9GaXhlZCIsInNrRW1wdHkiLCJza0ZtdCIsIm8iLCIkcmVwbGFjZW1lbnQiLCJza0ZtdEFyciIsImFycmF5IiwiJG1hdGNoIiwiJHAxIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFFQTs7Ozs7Ozs7O0FBU0EsU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLElBQXpCLEVBQStCQyxPQUEvQixFQUF3QztBQUN0QyxTQUFPLGlCQUFFQyxhQUFGLENBQWdCRCxPQUFoQixJQUEyQixpQkFBRUUsVUFBRixDQUFhSixHQUFiLEVBQWtCLE9BQWxCLENBQTNCLEdB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TCxDQUFhLFVBQWIsRUFBeUIsVUFBQ1EsTUFBRCxFQUFTQyxHQUFULEVBQWlCO0FBQy9DLGFBQU9GLE1BQU0sRUFBRUUsR0FBUixDQUFQO0FBQ0QsS0FGTSxDQUFQO0FBR0QsR0FKRDtBQUtEIiwiZmlsZSI6IlBvbHlmaWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBkZWZhdWx0IG9mIGtleSBmdW5jdGlvblxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ga2V5IGluZGV4IG9mIGFycmF5IG9yIHByb3BlcnR5IG5hbWUgb2Ygb2JqZWN0XG4gKiBAcGFyYW0gaXRlbSB2YWx1ZSBvZiBhcnJheSBieSBpbmRleCBvciB2YWx1ZSBvZiBvYmplY3QgYnkgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIGNvbnRleHQgYXJyYXkgb3Igb2JqZWN0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gX3NrS2V5RnVuYyhrZXksIGl0ZW0sIGNvbnRleHQpIHtcbiAgcmV0dXJuIF8uaXNQbGFpbk9iamVjdChjb250ZXh0KSA/IF8uc3RhcnRzV2l0aChrZXksICdza0lkeCcpIDogKCdza0lkeCcgKyBrZXkpO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzIse3NrSWR4MDozLHNrSWR4MTpbNCx7c2tJZHgwOjUsc2tJZHgxOltdfV19XSAtPiBbMixbMyxbNCxbNSxbXV1dXV1cbiAqL1xuaWYgKCFBcnJheS5wcm90b3R5cGUuc2tBcnIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3NrQXJyJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwga2V5RnVuYyA9IF9za0tleUZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSBbXTtcbiAgICAgIHRoaXMuZm9yRWFjaCgoJGl0ZW0pID0+IHtcbiAgICAgICAgcnRuLnB1c2goKHJlY3Vyc2l2ZSAmJiAoXy5pc0FycmF5KCRpdGVtKSB8fCBfLmlzUGxhaW5PYmplY3QoJGl0ZW0pKSkgPyAkaXRlbS5za0FycihyZWN1cnNpdmUsIGtleUZ1bmMpIDogJGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcnRuO1xuICAgIH1cbiAgfSk7XG59XG5pZiAoIUFycmF5LnByb3RvdHlwZS5za0ZpbHRlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tGaWx0ZXInLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAocmVjdXJzaXZlLCBmaWx0ZXJGdW5jKSB7XG4gICAgICBsZXQgcnRuID0gW107XG4gICAgICB0aGlzLmZvckVhY2goKCRpdGVtLCAkaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWx0ZXJGdW5jKSAmJiBmaWx0ZXJGdW5jKCRpbmRleCwgJGl0ZW0sIHRoaXMpKSB7XG4gICAgICAgICAgcnRuLnB1c2goKHJlY3Vyc2l2ZSAmJiAoXy5pc0FycmF5KCRpdGVtKSB8fCBfLmlzUGxhaW5PYmplY3QoJGl0ZW0pKSkgPyAkaXRlbS5za0ZpbHRlcihyZWN1cnNpdmUsIGZpbHRlckZ1bmMpIDogJGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzEse2E6MixiOlszLHtjOjQsZDpbNSx7fV19XX1dIC0+IHtza0lkeDA6MSxza0lkeDE6e2E6MixiOntza0lkeDA6Myxza0lkeDE6e2M6NCxkOntza0lkeDA6NSxza0lkeDE6e319fX19fVxuICovXG5pZiAoIUFycmF5LnByb3RvdHlwZS5za09iaikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tPYmonLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAocmVjdXJzaXZlLCBrZXlGdW5jID0gX3NrS2V5RnVuYykge1xuICAgICAgbGV0IHJ0biA9IHt9O1xuICAgICAgdGhpcy5mb3JFYWNoKCgkaXRlbSwgJGluZGV4KSA9PiB7XG4gICAgICAgIHJ0bltfLmlzRnVuY3Rpb24oa2V5RnVuYykgPyBrZXlGdW5jKCRpbmRleCwgJGl0ZW0sIHRoaXMpIDogJGluZGV4XSA9IChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSgkaXRlbSkgfHwgXy5pc1BsYWluT2JqZWN0KCRpdGVtKSkpID8gJGl0ZW0uc2tPYmoocmVjdXJzaXZlLCBrZXlGdW5jKSA6ICRpdGVtO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcnRuO1xuICAgIH1cbiAgfSk7XG59XG4vKipcbiAqIEBleGFtcGxlXG4gKiBbMSwyLDNdLnNrUm12KDIpIC0+IFsxLDNdXG4gKi9cbmlmICghQXJyYXkucHJvdG90eXBlLnNrUm12KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdza1JtdicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBsZXQgaWR4ID0gdGhpcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICogWzEsMiwzXS5za1RvZ2dsZSgyKSAtPiBbMSwzXVxuICogWzEsM10uc2tUb2dnbGUoMikgLT4gWzEsMywyXVxuICovXG5pZiAoIUFycmF5LnByb3RvdHlwZS5za1RvZ2dsZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2tUb2dnbGUnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbGV0IGlkeCA9IHRoaXMuaW5kZXhPZihpdGVtKTtcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqICg5ODc2NTQuMzIxKS5za0N1cnJlbmN5Rm10KDIpIC0+IDk4Nyw2NTQuMzJcbiAqL1xuaWYgKCFOdW1iZXIucHJvdG90eXBlLnNrQ3VycmVuY3lGbXQpIHtcbiAgTnVtYmVyLnByb3RvdHlwZS5za0N1cnJlbmN5Rm10ID0gZnVuY3Rpb24gKGZyYWN0aW9uKSB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzKS5za0N1cnJlbmN5Rm10KGZyYWN0aW9uKTtcbiAgfTtcbn1cbi8qKlxuICogQGV4YW1wbGVcbiAqIHtza0lkeDA6MSxza0lkeDE6WzIse3NrSWR4MDozLHNrSWR4MTpbNCx7c2tJZHgwOjUsc2tJZHgxOltdfV19XX0gLT4gWzEsWzIsWzMsWzQsWzUsW11dXV1dXVxuICovXG5pZiAoIU9iamVjdC5wcm90b3R5cGUuc2tBcnIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdza0FycicsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIChyZWN1cnNpdmUsIGtleUZ1bmMgPSBfc2tLZXlGdW5jKSB7XG4gICAgICBsZXQgcnRuQXJyID0gW107XG4gICAgICBsZXQgcnRuT2JqID0ge307XG4gICAgICBPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKCgka2V5KSA9PiB7XG4gICAgICAgIGxldCB0bXBWYWwgPSB0aGlzWyRrZXldO1xuICAgICAgICBsZXQgcnRuID0gKHJlY3Vyc2l2ZSAmJiAoXy5pc1BsYWluT2JqZWN0KHRtcFZhbCkgfHwgXy5pc0FycmF5KHRtcFZhbCkpKSA/IHRtcFZhbC5za0FycihyZWN1cnNpdmUsIGtleUZ1bmMpIDogdG1wVmFsO1xuXG4gICAgICAgIHJ0bk9ialska2V5XSA9IHJ0bjtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihrZXlGdW5jKSAmJiBrZXlGdW5jKCRrZXksIHRtcFZhbCwgdGhpcykpIHtcbiAgICAgICAgICBydG5BcnIucHVzaChydG4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhydG5PYmopLmxlbmd0aCA9PT0gcnRuQXJyLmxlbmd0aCA/IHJ0bkFyciA6IHJ0bk9iajtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrQXNzaWduKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2tBc3NpZ24nLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoLi4ub2JqZWN0cykge1xuICAgICAgcmV0dXJuIFNLLmFzc2lnbi5hcHBseSh0aGlzLCBfLmNvbmNhdCh0aGlzLCBvYmplY3RzKSk7XG4gICAgfVxuICB9KTtcbn1cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za0ZpbHRlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrRmlsdGVyJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwgZmlsdGVyRnVuYykge1xuICAgICAgbGV0IHJ0biA9IHt9O1xuICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaCgoJGtleSkgPT4ge1xuICAgICAgICBsZXQgdG1wVmFsID0gdGhpc1ska2V5XTtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWx0ZXJGdW5jKSAmJiBmaWx0ZXJGdW5jKCRrZXksIHRtcFZhbCwgdGhpcykpIHtcbiAgICAgICAgICBydG5bJGtleV0gPSAocmVjdXJzaXZlICYmIChfLmlzQXJyYXkodG1wVmFsKSB8fCBfLmlzUGxhaW5PYmplY3QodG1wVmFsKSkpID8gdG1wVmFsLnNrRmlsdGVyKHJlY3Vyc2l2ZSwgZmlsdGVyRnVuYykgOiB0bXBWYWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBAZXhhbXBsZVxuICoge2E6MixiOlszLHtjOjQsZDpbNSx7fV19XX0gLT4ge2E6MixiOntza0lkeDA6Myxza0lkeDE6e2M6NCxkOntza0lkeDA6NSxza0lkeDE6e319fX19XG4gKi9cbmlmICghT2JqZWN0LnByb3RvdHlwZS5za09iaikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrT2JqJywge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHJlY3Vyc2l2ZSwga2V5RnVuYyA9IF9za0tleUZ1bmMpIHtcbiAgICAgIGxldCBydG4gPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goKCRrZXkpID0+IHtcbiAgICAgICAgbGV0IHRtcFZhbCA9IHRoaXNbJGtleV07XG4gICAgICAgIHJ0blska2V5XSA9IChyZWN1cnNpdmUgJiYgKF8uaXNBcnJheSh0bXBWYWwpIHx8IF8uaXNQbGFpbk9iamVjdCh0bXBWYWwpKSkgPyB0bXBWYWwuc2tPYmoocmVjdXJzaXZlLCBrZXlGdW5jKSA6IHRtcFZhbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrVmFsKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2tWYWwnLCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoc3RyLCB2YWwpIHtcbiAgICAgIGxldCBydG4gPSB0aGlzO1xuICAgICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnLicpO1xuICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICg7IGlkeCA8IGFyci5sZW5ndGggLSAxOyBpZHgrKykge1xuICAgICAgICAgIGlmIChydG5bYXJyW2lkeF1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJ0blthcnJbaWR4XV0gPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcnRuID0gcnRuW2FycltpZHhdXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnRuKSB7XG4gICAgICAgICAgcnRuW2FycltpZHhdXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGlkeCA8IGFyci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgcnRuID0gcnRuW2FycltpZHhdXTtcbiAgICAgICAgICBpZiAocnRuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJ0bjtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFPYmplY3QucHJvdG90eXBlLnNrVmFscykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ3NrVmFscycsIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5tYXAoKCRrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXNbJGtleV07XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrQmxhbmspIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0JsYW5rID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRyaW0oKS5sZW5ndGggPT09IDA7XG4gIH07XG59XG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc2tDdXJyZW5jeUZtdCkge1xuICBTdHJpbmcucHJvdG90eXBlLnNrQ3VycmVuY3lGbXQgPSBmdW5jdGlvbiAoZnJhY3Rpb24pIHtcbiAgICBmcmFjdGlvbiA9IGZyYWN0aW9uID49IDAgJiYgZnJhY3Rpb24gPD0gMjAgPyBmcmFjdGlvbiA6IDI7XG4gICAgbGV0IGFyciA9IChwYXJzZUZsb2F0KHRoaXMucmVwbGFjZSgvW15cXGRcXC4tXS9nLCAnJykpLnRvRml4ZWQoZnJhY3Rpb24pICsgJycpLnNwbGl0KCcuJyk7XG4gICAgcmV0dXJuIGFyclswXS5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyg/IVxcZCkpL2csICckMSwnKSArIChmcmFjdGlvbiA9PT0gMCA/ICcnIDogKCcuJyArIGFyclsxXSkpO1xuICB9O1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrRW1wdHkpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5za0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCA9PT0gMDtcbiAgfTtcbn1cbmlmICghU3RyaW5nLnByb3RvdHlwZS5za0ZtdCkge1xuICBTdHJpbmcucHJvdG90eXBlLnNrRm10ID0gZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oXFwkXFx7XFx3KyhcXC5cXHcrKSpcXH0pL2csICgkcmVwbGFjZW1lbnQpID0+IHsvLy8oXFx7XFx3K1xcLlxcfSkvZ1xuICAgICAgcmV0dXJuIG8uc2tWYWwoJHJlcGxhY2VtZW50LnJlcGxhY2UoJyR7JywgJycpLnJlcGxhY2UoJ30nLCAnJykpO1xuICAgIH0pO1xuICB9O1xufVxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNrRm10QXJyKSB7XG4gIFN0cmluZy5wcm90b3R5cGUuc2tGbXRBcnIgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9cXCQoXFxkKykvZywgKCRtYXRjaCwgJHAxKSA9PiB7XG4gICAgICByZXR1cm4gYXJyYXlbLS0kcDFdO1xuICAgIH0pO1xuICB9O1xufVxuIl19