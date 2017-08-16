'use strict';

import _ from 'lodash';
import assert from 'assert';
import SK from './../src/sk';

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

describe('SK', () => {

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

  let inValidValueArray = [null, undefined, NaN, 'Invalid Date'];

  before(() => {
    // console.log('SK test case start!');

  });

  after(() => {
    // console.log('SK test case done!');
  });

  beforeEach(() => {
    //console.log('some test case start!');
  });

  afterEach(() => {
    //console.log('some test case done!');
  });

  describe('Array.prototype.skArr', () => {
    it('recursive', () => {
      assert.deepEqual(testData.skVal('A.Arr.i1').skArr(true), testData.skVal('A.Arr.o1'));
    });
  });
  describe('Array.prototype.skFilter', () => {
    it('skFilter', () => {
      assert.deepEqual(testData.skVal('A.Filter.i1').skFilter(false, function (k, v) {
        return v == 'skB2';
      }), testData.skVal('A.Filter.o1'));
    });
    it('recursive', () => {
      assert.deepEqual(testData.skVal('A.Filter.i1').skFilter(true, function (k, v, c) {
        return _.isPlainObject(c) && k == 'a' || Array.isArray(c) && v != 'skB2';
      }), testData.skVal('A.Filter.o2'));
    });
  });
  describe('Array.prototype.skObj', () => {
    it('prefix', () => {
      assert.deepEqual(testData.skVal('A.Obj.i1').skObj(false, function (k) {
        return 'skI' + k;
      }), testData.skVal('A.Obj.o1'));
    });
    it('recursive', () => {
      assert.deepEqual([1, {a: 2, b: [3, {c: 4, d: [5, {}]}]}].skObj(true, function (k) {
        return 'skIdx' + k;
      }), {
        skIdx0: 1,
        skIdx1: {a: 2, b: {skIdx0: 3, skIdx1: {c: 4, d: {skIdx0: 5, skIdx1: {}}}}}
      });
    });
  });
  describe('Array.prototype.skRmv', () => {
    it('default', () => {
      assert.deepEqual([1, 2, 3].skRmv(2), [1, 3]);
    });
  });
  describe('Array.prototype.skToggle', () => {
    it('default', () => {
      assert.deepEqual([1, 2, 3].skToggle(2), [1, 3]);
      assert.deepEqual([1, 3].skToggle(2), [1, 3, 2]);
    });
  });
  describe('Number.prototype.skCurrencyFmt', () => {
    it('+-', () => {
      assert.equal((-123456.789).skCurrencyFmt(2), '-123,456.79');
      assert.equal((987654.321).skCurrencyFmt(2), '987,654.32');
    });
  });
  describe('Object.prototype.skArr', () => {
    it('recursive', () => {
      assert.deepEqual(testData.skVal('O.Arr.i1').skArr(true, function (k) {
        return _.startsWith(k, 'skIdx')
      }), testData.skVal('O.Arr.o1'));
    });
  });
  describe('Object.prototype.skFilter', () => {
    it('recursive', () => {
      assert.deepEqual(testData.skVal('O.Filter.i1').skFilter(true, function (k, v, c) {
        return _.isPlainObject(c) && Array.isArray(v) || Array.isArray(c) && _.isPlainObject(v);
      }), testData.skVal('O.Filter.o1'));
    });
  });
  describe('Object.prototype.skObj', () => {
    it('recursive', () => {
      assert.deepEqual(testData.skVal('O.Filter.i1').skObj(true, function (k) {
        // console.log('Object.prototype.skObj'+JSON.stringify(c));
        return 'skIdx' + k;
      }), testData.skVal('O.Obj.o1'));
    });
  });
  describe('Object.prototype.skVal', () => {
    let o = {a: {x: 1}, b: {y: 2}};
    let r = {a: {x: 1}, b: {y: 2}, c: {z: 3}};
    it('get', () => {
      assert.equal(o.skVal('a.x'), 1);
    });
    it('getObj', () => {
      assert.deepEqual(o.skVal('a'), {x: 1});
    });
    o.skVal('c.z', 3);
    it('set', () => {
      assert.deepEqual(o, r);
    });
  });
  describe('Object.prototype.skVals', () => {
    let o = {a: {x: 1}, b: {y: 2}};
    let r = [{x: 1}, {y: 2}];
    it('equals', () => {
      assert.deepEqual(o.skVals(), r);
    });
  });
  describe('String.prototype.skBlank', () => {
    it('String is Blank', () => {
      assert.equal(' '.skBlank(), true);
      assert.equal(''.skBlank(), true);
    });
  });
  describe('String.prototype.skCurrencyFmt', () => {
    it('+-', () => {
      assert.equal('-123456.789'.skCurrencyFmt(2), '-123,456.79');
      assert.equal('987654.321'.skCurrencyFmt(2), '987,654.32');
    });
  });
  describe('String.prototype.skEmpty', () => {
    it('String is Empty', () => {
      assert.equal(' '.skEmpty(), false);
      assert.equal(''.skEmpty(), true);
    });
  });
  describe('String.prototype.skFmt', () => {
    let r = 'My $name {is} ShaneKing, i {am from Shanghai';
    it('1', () => {
      let s = 'My $name {is} ${name}, i {am from ${city}';
      let o = {name: 'ShaneKing', city: 'Shanghai'};
      assert.equal(s.skFmt(o), r);
    });
    it('2', () => {
      let s = 'My $name {is} ${person.name}, i {am from ${local.city}';
      let o = {person: {name: 'ShaneKing'}, local: {city: 'Shanghai'}};
      assert.equal(s.skFmt(o), r);
    });
  });
  describe('String.prototype.skFmtArr', () => {
    it('1', () => {
      let r = 'My $name ${is} ShaneKing';
      let s = 'My $name ${is} $1';
      let a = ['ShaneKing'];
      assert.equal(s.skFmtArr(a), r);
    });
    it('2', () => {
      let r = 'My $name ${is} ShaneKing, i am$ from Shanghai';
      let s = 'My $name ${is} $1, i am$ from $2';
      let a = ['ShaneKing', 'Shanghai'];
      assert.equal(s.skFmtArr(a), r);
    });
  });

  describe('SK.$', () => {
    it('equals self', () => {
      let sk$1 = SK.$(testData);
      let sk$2 = SK.$(testData);
      assert.deepEqual(sk$1, sk$2);
    });
    it('equals value', () => {
      let sk$ = SK.$(testData);
      sk$.a = 1;
      assert.equal(sk$.a, 1);
    });
  });
  describe('SK.assign', () => {
    it('array replace by new', () => {
      let a1 = {a: [{'a': 1}, 'b', 2]},
        a2 = {a: [{'x': 3}, 'y', 4]},
        skRst = {a: [{'x': 3}, 'y', 4]};//if is array, empty old array
      assert.deepEqual(SK.assign({}, a1, a2), skRst);
    });
    it('deep while object node', () => {
      let a1 = {a: [{'b': 1}, 'c', 2], d: {e: 3}},
        a2 = {a: [{'x': 10}, 'y', 20], d: {z: 30}},
        skRst = {"a": [{"x": 10}, "y", 20], "d": {"e": 3, "z": 30}};
      assert.deepEqual(SK.assign({}, a1, a2), skRst);
    });
    it('isFunction', () => {
      let f1 = () => {
        },
        f2 = () => {
        },
        skRst = f2;//if is array, empty old array
      assert.deepEqual(SK.assign({}, f1, f2), skRst);
    });
  });
  describe('SK.appendParameter', () => {
    it('not ?', () => {
      assert.equal(SK.appendParameter('a','b','c'), 'a?b=c');
    });
    it('has ?', () => {
      assert.equal(SK.appendParameter('a?1=2','b','c'), 'a?1=2&b=c');
    });
  });
  describe('SK.descartes', () => {
    it('array and array to array', () => {
      assert.deepEqual(SK.descartes(['alert', 'btn'], ['success', 'info']), ['alert-success', 'alert-info', 'btn-success', 'btn-info']);
    });
    it('string and string to string', () => {
      assert.equal(SK.descartes('alert', 'link', '-'), 'alert-link');
    });
  });
  describe('SK.getCurrentLanguage', () => {
    it('default', () => {
      assert.equal(SK.getCurrentLanguage(), SK.DEFAULT_LANGUAGE);
    });
  });
  describe('SK.getSubPaths', () => {
    it('1', () => {
      assert.deepEqual(SK.getSubPaths('a/b'), ['/','/a/','/a/b/']);
    });
  });
  describe('SK.getValidPath', () => {
    it('1', () => {
      assert.equal(SK.getValidPath('a/b'), '/a/b/');
    });
  });
  describe('SK.s4a', () => {
    it('array return array', () => {
      assert.deepEqual(SK.s4a(['a', 1, 'b', 2]), ['a', 1, 'b', 2]);
    });
    it('unarray return array', () => {
      inValidValueArray.forEach(function (element) {
        assert.deepEqual(SK.s4a(element), []);
      });
    });
  });
  describe('SK.s4b', () => {
    it('true return true', () => {
      assert.equal(SK.s4b(true), true);
      assert.equal(SK.s4b(false), false);
    });
    it('other return false', () => {
      assert.equal(SK.s4b('true'), false);
      assert.equal(SK.s4b('false'), false);
      assert.equal(SK.s4b('everything'), false);
      assert.equal(SK.s4b(''), false);
      inValidValueArray.forEach(function (element) {
        assert.equal(SK.s4b(element), false);
      });
    });
  });
  describe('SK.s4d', () => {
    let date = new Date();
    it('date return date', () => {
      assert.equal(SK.s4d(date), date);
    });
    it('should return false', () => {
      inValidValueArray.forEach(function (element) {
        assert.equal(SK.s4d(element, date), date);
      });
    });
  });
  describe('SK.s4n', () => {
    it('number return number', () => {
      assert.equal(SK.s4n(1), 1);
    });
    it('other return zero', () => {
      assert.equal(SK.s4n('1'), 1);
      inValidValueArray.forEach(function (element) {
        assert.equal(SK.s4n(element), 0);
      });
    });
  });
  describe('SK.s4o', () => {
    it('object return object', () => {
      assert.deepEqual(SK.s4o({a: 1, b: 2}), {a: 1, b: 2});
    });
    it('other return object', () => {
      inValidValueArray.forEach(function (element) {
        assert.deepEqual(SK.s4o(element), {});
      });
    });
  });
  describe('SK.s4s', () => {
    it('string return string', () => {
      assert.equal(SK.s4s('s'), 's');
    });
    it('other return empty', () => {
      assert.equal(SK.s4s(null), '');
      assert.equal(SK.s4s(undefined, 'UNDEFINED'), 'UNDEFINED');
      assert.equal(SK.s4s(NaN), '');
    });
  });
  describe('SK.upperWordsFirstChar', () => {
    it('path -> Path', () => {
      assert.equal(SK.upperWordsFirstChar('path'), 'Path');
    });
    it('list -> List', () => {
      assert.equal(SK.upperWordsFirstChar('list'), 'List');
    });
    it('words', () => {
      assert.equal(SK.upperWordsFirstChar('xi nAn shi you xUe yuan china people'), 'Xi NAn Shi You XUe Yuan China People');
    });
  });
});


