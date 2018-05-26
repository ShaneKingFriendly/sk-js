import _ from 'lodash';

/*eslint no-extend-native: "off"*/
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
  return _.isPlainObject(context) ? _.startsWith(key, 'skIdx') : (`skIdx${key}`);
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
    value(recursive, keyFunc = _skKeyFunc) {
      const rtn = [];
      this.forEach((item) => {
        rtn.push((recursive && (_.isArray(item) || _.isPlainObject(item))) ? item.skArr(recursive, keyFunc) : item);
      });
      return rtn;
    },
  });
}
if (!Array.prototype.skFilter) {
  Object.defineProperty(Array.prototype, 'skFilter', {
    writable: true,
    enumerable: false,
    configurable: true,
    value(recursive, filterFunc) {
      const rtn = [];
      this.forEach((item, index) => {
        if (_.isFunction(filterFunc) && filterFunc(index, item, this)) {
          rtn.push((recursive && (_.isArray(item) || _.isPlainObject(item))) ? item.skFilter(recursive, filterFunc) : item);
        }
      });
      return rtn;
    },
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
    value(recursive, keyFunc = _skKeyFunc) {
      const rtn = {};
      this.forEach((item, index) => {
        rtn[_.isFunction(keyFunc) ? keyFunc(index, item, this) : index] = (recursive && (_.isArray(item) || _.isPlainObject(item))) ? item.skObj(recursive, keyFunc) : item;
      });
      return rtn;
    },
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
    value(item) {
      const idx = this.indexOf(item);
      if (idx > -1) {
        this.splice(idx, 1);
      }
      return this;
    },
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
    value(item) {
      const idx = this.indexOf(item);
      if (idx > -1) {
        this.splice(idx, 1);
      } else {
        this.push(item);
      }
      return this;
    },
  });
}
if (!Array.prototype.skTrans) {
  Object.defineProperty(Array.prototype, 'skTrans', {
    writable: true,
    enumerable: false,
    configurable: true,
    value(recursive, transFunc) {
      const rtn = [];
      this.forEach((item, index) => {
        if (_.isFunction(transFunc)) {
          rtn.push((recursive && (_.isArray(item) || _.isPlainObject(item))) ? item.skTrans(recursive, transFunc) : transFunc(index, item, this));
        }
      });
      return rtn;
    },
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
    value(recursive, keyFunc = _skKeyFunc) {
      const rtnArr = [];
      const rtnObj = {};
      Object.keys(this).forEach((key) => {
        const tmpVal = this[key];
        const rtn = (recursive && (_.isPlainObject(tmpVal) || _.isArray(tmpVal))) ? tmpVal.skArr(recursive, keyFunc) : tmpVal;

        rtnObj[key] = rtn;
        if (_.isFunction(keyFunc) && keyFunc(key, tmpVal, this)) {
          rtnArr.push(rtn);
        }
      });
      return Object.keys(rtnObj).length === rtnArr.length ? rtnArr : rtnObj;
    },
  });
}
if (!Object.prototype.skFilter) {
  Object.defineProperty(Object.prototype, 'skFilter', {
    writable: true,
    enumerable: false,
    configurable: true,
    value(recursive, filterFunc) {
      const rtn = {};
      Object.keys(this).forEach((key) => {
        const tmpVal = this[key];
        if (_.isFunction(filterFunc) && filterFunc(key, tmpVal, this)) {
          rtn[key] = (recursive && (_.isArray(tmpVal) || _.isPlainObject(tmpVal))) ? tmpVal.skFilter(recursive, filterFunc) : tmpVal;
        }
      });
      return rtn;
    },
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
    value(recursive, keyFunc = _skKeyFunc) {
      const rtn = {};
      Object.keys(this).forEach((key) => {
        const tmpVal = this[key];
        rtn[key] = (recursive && (_.isArray(tmpVal) || _.isPlainObject(tmpVal))) ? tmpVal.skObj(recursive, keyFunc) : tmpVal;
      });
      return rtn;
    },
  });
}
if (!Object.prototype.skTrans) {
  Object.defineProperty(Object.prototype, 'skTrans', {
    writable: true,
    enumerable: false,
    configurable: true,
    value(recursive, transFunc) {
      const rtn = {};
      Object.keys(this).forEach((key) => {
        const tmpVal = this[key];
        if (_.isFunction(transFunc)) {
          rtn[key] = (recursive && (_.isArray(tmpVal) || _.isPlainObject(tmpVal))) ? tmpVal.skTrans(recursive, transFunc) : transFunc(key, tmpVal, this);
        }
      });
      return rtn;
    },
  });
}
if (!Object.prototype.skVal) {
  Object.defineProperty(Object.prototype, 'skVal', {
    writable: true,
    enumerable: false,
    configurable: true,
    value(str, val) {
      let rtn = this;
      const arr = str.split('.');
      let idx = 0;
      if (arguments.length > 1) {
        for (; idx < arr.length - 1; idx += 1) {
          if (rtn[arr[idx]] === undefined) {
            rtn[arr[idx]] = {};
          }
          rtn = rtn[arr[idx]];
        }
        if (rtn) {
          rtn[arr[idx]] = val;
        }
      } else {
        for (; idx < arr.length; idx += 1) {
          rtn = rtn[arr[idx]];
          if (rtn === undefined) {
            break;
          }
        }
      }
      return rtn;
    },
  });
}
if (!Object.prototype.skVals) {
  Object.defineProperty(Object.prototype, 'skVals', {
    writable: true,
    enumerable: false,
    configurable: true,
    value() {
      return Object.keys(this).map((key) => {
        return this[key];
      });
    },
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
    const arr = (`${parseFloat(this.replace(/[^\d\.-]/g, '')).toFixed(fraction)}`).split('.');
    return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (fraction === 0 ? '' : (`.${arr[1]}`));
  };
}
if (!String.prototype.skEmpty) {
  String.prototype.skEmpty = function () {
    return this.length === 0;
  };
}
if (!String.prototype.skFmt) {
  String.prototype.skFmt = function (o) {
    return this.replace(/(\$#\{\w+(\.\w+)*\})/g, (replacement) => { ///(\{\w+\.\})/g
      return o.skVal(replacement.replace('$#{', '').replace('}', ''));
    });
  };
}
if (!String.prototype.skFmtArr) {
  String.prototype.skFmtArr = function (array) {
    return this.replace(/\$#(\d+)/g, (match, p1) => {
      p1 -= 1;
      return array[p1];
    });
  };
}
