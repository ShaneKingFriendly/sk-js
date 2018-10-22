import _ from 'lodash';
import '../src/Polyfill';

let JSDOM = require('jsdom').JSDOM;
global.document = new JSDOM('<html></html>', {url: "http://shaneking.org/", includeNodeLocations: true});
global.window = document.window;

function propagateToGlobal(window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key)) {
      continue;
    }
    if (key in global) {
      continue;
    }
    global[key] = window[key];
  }
}
propagateToGlobal(window);

describe('Polyfill', () => {

  let testData = {};
  testData.skVal('A.Arr.i1', [2, {
    skIdx0: 3,
    skIdx1: [4, {skIdx0: 5, skIdx1: []}]
  }]);
  testData.skVal('A.Arr.o1', [2, [3, [4, [5, []]]]]);
  testData.skVal('A.Filter.i1', [{a: 1}, 'skB2']);
  testData.skVal('A.Filter.o1', ['skB2']);
  testData.skVal('A.Filter.o2', [{a: 1}]);
  testData.skVal('A.Obj.i1', [{a: 1}, {b: 2}]);
  testData.skVal('A.Obj.o1', {skI0: {a: 1}, skI1: {b: 2}});
  testData.skVal('O.Arr.i1', {
    skIdx0: 1,
    skIdx1: [2, {skIdx0: 3, skIdx1: [4, {skIdx0: 5, skIdx1: []}]}]
  });
  testData.skVal('O.Arr.o1', [1, [2, [3, [4, [5, []]]]]]);
  testData.skVal('O.Filter.i1', {a: 2, b: [3, {c: 4, d: [5, {}]}]});
  testData.skVal('O.Filter.o1', {b: [{d: [{}]}]});
  testData.skVal('O.Obj.o1', {
    a: 2,
    b: {skIdx0: 3, skIdx1: {c: 4, d: {skIdx0: 5, skIdx1: {}}}}
  });

  describe('Array.prototype.skFilter', () => {
    it('skFilter', () => {
      expect(testData.skVal('A.Filter.i1').skFilter(false, function (k, v) {
        return v === 'skB2';
      })).toEqual(testData.skVal('A.Filter.o1'));
    });
    it('recursive', () => {
      expect(testData.skVal('A.Filter.i1').skFilter(true, function (k, v, c) {
        return _.isPlainObject(c) && k === 'a' || Array.isArray(c) && v !== 'skB2';
      })).toEqual(testData.skVal('A.Filter.o2'));
    });
  });
  describe('Array.prototype.skRmv', () => {
    it('default', () => {
      expect([1, 2, 3].skRmv(2)).toEqual([1, 3]);
    });
  });
  describe('Array.prototype.skToggle', () => {
    it('default', () => {
      expect([1, 2, 3].skToggle(2)).toEqual([1, 3]);
      expect([1, 3].skToggle(2)).toEqual([1, 3, 2]);
    });
  });
  describe('Array.prototype.skTrans', () => {
    it('default', () => {
      expect([1, 2, 3].skTrans(false, () => {
        return 1;
      })).toEqual([1, 1, 1]);
      expect([1, {a: 2, b: 3}].skTrans(false, (k, v, c) => {
        return (_.isArray(v) || _.isPlainObject(v)) ? v : 4;
      })).toEqual([4, {a: 2, b: 3}]);
      expect([1, {a: 2, b: [3, 4]}].skTrans(true, () => {
        return 1;
      })).toEqual([1, {a: 1, b: [1, 1]}]);
    });
  });
  describe('Number.prototype.skCurrencyFmt', () => {
    it('+-', () => {
      expect((-123456.789).skCurrencyFmt(2)).toEqual('-123,456.79');
      expect((987654.321).skCurrencyFmt()).toEqual('987,654.32');
      expect((987654.321).skCurrencyFmt(0)).toEqual('987,654');
    });
  });
  describe('Object.prototype.skFilter', () => {
    it('recursive', () => {
      expect(testData.skVal('O.Filter.i1').skFilter(true, function (k, v, c) {
        return _.isPlainObject(c) && Array.isArray(v) || Array.isArray(c) && _.isPlainObject(v);
      })).toEqual(testData.skVal('O.Filter.o1'));
    });
  });
  describe('Object.prototype.skVal', () => {
    let o = {a: {x: 1}, b: {y: 2}};
    let r = {a: {x: 1}, b: {y: 2}, c: {z: 3}};
    it('get', () => {
      expect(o.skVal('a.x')).toEqual(1);
    });
    it('getObj', () => {
      expect(o.skVal('a')).toEqual({x: 1});
    });
    o.skVal('c.z', 3);
    it('set', () => {
      expect(o).toEqual(r);
    });
    it('array get', () => {
      expect({a: 1, b: [1, 2, 3]}.skVal('b[2]')).toEqual(3);
    });
    it('array get', () => {
      expect({a: 1, b: [1, 2, 3]}.skVal('b[2]', 4)).toEqual({a: 1, b: [1, 2, 4]});
    });
  });
  describe('Object.prototype.skVals', () => {
    let o = {a: {x: 1}, b: {y: 2}};
    let r = [{x: 1}, {y: 2}];
    it('equals', () => {
      expect(o.skVals()).toEqual(r);
    });
  });
  describe('String.prototype.skBlank', () => {
    it('String is Blank', () => {
      expect(' '.skBlank()).toEqual(true);
      expect(''.skBlank()).toEqual(true);
    });
  });
  describe('String.prototype.skCurrencyFmt', () => {
    it('+-', () => {
      expect('-123456.789'.skCurrencyFmt(2)).toEqual('-123,456.79');
      expect('987654.321'.skCurrencyFmt()).toEqual('987,654.32');
      expect('987654.321'.skCurrencyFmt(0)).toEqual('987,654');
    });
  });
  describe('String.prototype.skEmpty', () => {
    it('String is Empty', () => {
      expect(' '.skEmpty()).toEqual(false);
      expect(''.skEmpty()).toEqual(true);
    });
  });
  describe('String.prototype.skFmt', () => {
    let r = 'My $name {is} ShaneKing, i {am from Shanghai';
    it('1', () => {
      let s = 'My $name {is} $#{name}, i {am from $#{city}';
      let o = {name: 'ShaneKing', city: 'Shanghai'};
      expect(s.skFmt(o)).toEqual(r);
    });
    it('2', () => {
      let s = 'My $name {is} $#{person.name}, i {am from $#{local.city}';
      let o = {person: {name: 'ShaneKing'}, local: {city: 'Shanghai'}};
      expect(s.skFmt(o)).toEqual(r);
    });
  });
  describe('String.prototype.skFmtArr', () => {
    it('1', () => {
      let r = 'My $name ${is} ShaneKing';
      let s = 'My $name ${is} $#1';
      let a = ['ShaneKing'];
      expect(s.skFmtArr(a)).toEqual(r);
    });
    it('2', () => {
      let r = 'My $name ${is} ShaneKing, i am$ from Shanghai';
      let s = 'My $name ${is} $#1, i am$ from $#2';
      let a = ['ShaneKing', 'Shanghai'];
      expect(s.skFmtArr(a)).toEqual(r);
    });
  });
});
