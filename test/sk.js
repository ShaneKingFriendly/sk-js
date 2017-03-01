'use strict';

import _ from 'lodash';
import assert from 'assert';
import SK from './../src/sk';

describe('SK', function () {

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

  before(function() {
    // console.log('SK test case start!');

  });

  after(function() {
    // console.log('SK test case done!');
  });

  beforeEach(function() {
    //console.log('some test case start!');
  });

  afterEach(function() {
    //console.log('some test case done!');
  });

  describe('Array.prototype.skArr', function () {
    it('recursive', function () {
      assert.deepEqual(testData.skVal('A.Arr.i1').skArr(true), testData.skVal('A.Arr.o1'));
    });
  });
  describe('Array.prototype.skFilter', function () {
    it('skFilter', function () {
      assert.deepEqual(testData.skVal('A.Filter.i1').skFilter(false, function (k, v) {
        return v == 'skB2';
      }), testData.skVal('A.Filter.o1'));
    });
    it('recursive', function () {
      assert.deepEqual(testData.skVal('A.Filter.i1').skFilter(true, function (k, v, c) {
        return _.isPlainObject(c) && k == 'a' || Array.isArray(c) && v != 'skB2';
      }), testData.skVal('A.Filter.o2'));
    });
  });
  describe('Array.prototype.skObj', function () {
    it('prefix', function () {
      assert.deepEqual(testData.skVal('A.Obj.i1').skObj(false, function (k) {
        return 'skI' + k;
      }), testData.skVal('A.Obj.o1'));
    });
    it('recursive', function () {
      assert.deepEqual([1, {a: 2, b: [3, {c: 4, d: [5, {}]}]}].skObj(true, function (k) {
        return 'skIdx' + k;
      }), {
        skIdx0: 1,
        skIdx1: {a: 2, b: {skIdx0: 3, skIdx1: {c: 4, d: {skIdx0: 5, skIdx1: {}}}}}
      });
    });
  });
  describe('Number.prototype.skCurrencyFmt', function () {
    it('+-', function () {
      assert.equal((-123456.789).skCurrencyFmt(2), '-123,456.79');
      assert.equal((987654.321).skCurrencyFmt(2), '987,654.32');
    });
  });
  describe('Object.prototype.skArr', function () {
    it('recursive', function () {
      assert.deepEqual(testData.skVal('O.Arr.i1').skArr(true, function (k) {
        return _.startsWith(k,'skIdx')
      }), testData.skVal('O.Arr.o1'));
    });
  });
  describe('Object.prototype.skFilter', function () {
    it('recursive', function () {
      assert.deepEqual(testData.skVal('O.Filter.i1').skFilter(true, function (k, v, c) {
        return _.isPlainObject(c) && Array.isArray(v) || Array.isArray(c) && _.isPlainObject(v);
      }), testData.skVal('O.Filter.o1'));
    });
  });
  describe('Object.prototype.skObj', function () {
    it('recursive', function () {
      assert.deepEqual(testData.skVal('O.Filter.i1').skObj(true, function (k) {
        // console.log('Object.prototype.skObj'+JSON.stringify(c));
        return 'skIdx' + k;
      }), testData.skVal('O.Obj.o1'));
    });
  });
  describe('Object.prototype.skVal', function () {
    let o = {a: {x: 1}, b: {y: 2}};
    let r = {a: {x: 1}, b: {y: 2}, c: {z: 3}};
    it('get', function () {
      assert.equal(o.skVal('a.x'), 1);
    });
    it('getObj', function () {
      assert.deepEqual(o.skVal('a'), {x: 1});
    });
    o.skVal('c.z', 3);
    it('set', function () {
      assert.deepEqual(o, r);
    });
  });
  describe('Object.prototype.skVals', function () {
    let o = {a: {x: 1}, b: {y: 2}};
    let r = [{x: 1}, {y: 2}];
    it('equals', function () {
      assert.deepEqual(o.skVals(), r);
    });
  });
  describe('String.prototype.skBlank', function () {
    it('String is Blank', function () {
      assert.equal(' '.skBlank(), true);
      assert.equal(''.skBlank(), true);
    });
  });
  describe('String.prototype.skCurrencyFmt', function () {
    it('+-', function () {
      assert.equal('-123456.789'.skCurrencyFmt(2), '-123,456.79');
      assert.equal('987654.321'.skCurrencyFmt(2), '987,654.32');
    });
  });
  describe('String.prototype.skEmpty', function () {
    it('String is Empty', function () {
      assert.equal(' '.skEmpty(), false);
      assert.equal(''.skEmpty(), true);
    });
  });
  describe('String.prototype.skFmt', function () {
    let r = 'My $name {is} ShaneKing, i {am from Shanghai';
    it('1', function () {
      let s = 'My $name {is} ${name}, i {am from ${city}';
      let o = {name: 'ShaneKing', city: 'Shanghai'};
      assert.equal(s.skFmt(o), r);
    });
    it('2', function () {
      let s = 'My $name {is} ${person.name}, i {am from ${local.city}';
      let o = {person: {name: 'ShaneKing'}, local: {city: 'Shanghai'}};
      assert.equal(s.skFmt(o), r);
    });
  });
  describe('String.prototype.skFmtArr', function () {
    it('1', function () {
      let r = 'My $name ${is} ShaneKing';
      let s = 'My $name ${is} $1';
      let a = ['ShaneKing'];
      assert.equal(s.skFmtArr(a), r);
    });
    it('2', function () {
      let r = 'My $name ${is} ShaneKing, i am$ from Shanghai';
      let s = 'My $name ${is} $1, i am$ from $2';
      let a = ['ShaneKing', 'Shanghai'];
      assert.equal(s.skFmtArr(a), r);
    });
  });

  describe('SK.$', function () {
    it('equals self', function () {
      let sk$1 = SK.$(testData);
      let sk$2 = SK.$(testData, 'sk$');
      assert.deepEqual(sk$1, sk$2);
    });
    it('equals value', function () {
      let sk$ = SK.$(testData);
      sk$.a = 1;
      assert.equal(sk$.a, 1);
    });
  });
  describe('SK.assign', function () {
    it('array replace by new', function () {
      let a1 = {a: [{'a': 1}, 'b', 2]},
        a2 = {a: [{'x': 3}, 'y', 4]},
        skRst = {a: [{'x': 3}, 'y', 4]};//if is array, empty old array
      assert.deepEqual(SK.assign(true, {}, a1, a2), skRst);
    });
    it('isFunction', function () {
      let f1 = function () {
        },
        f2 = function () {
        },
        skRst = f2;//if is array, empty old array
      assert.deepEqual(SK.assign(true, f1, f2), skRst);
    });
  });
  describe('SK.s4a', function () {
    it('array return array', function () {
      assert.deepEqual(SK.s4a(['a', 1, 'b', 2]), ['a', 1, 'b', 2]);
    });
    it('unarray return array', function () {
      inValidValueArray.forEach(function (element) {
        assert.deepEqual(SK.s4a(element), []);
      });
    });
  });
  describe('SK.s4b', function () {
    it('true return true', function () {
      assert.equal(SK.s4b(true), true);
      assert.equal(SK.s4b(false), false);
    });
    it('other return false', function () {
      assert.equal(SK.s4b('true'), false);
      assert.equal(SK.s4b('false'), false);
      assert.equal(SK.s4b('everything'), false);
      assert.equal(SK.s4b(''), false);
      inValidValueArray.forEach(function (element) {
        assert.equal(SK.s4b(element), false);
      });
    });
  });
  describe('SK.s4d', function () {
    let date = new Date();
    it('date return date', function () {
      assert.equal(SK.s4d(date), date);
    });
    it('should return false', function () {
      inValidValueArray.forEach(function (element) {
        assert.equal(SK.s4d(element, date), date);
      });
    });
  });
  describe('SK.s4n', function () {
    it('number return number', function () {
      assert.equal(SK.s4n(1), 1);
    });
    it('other return zero', function () {
      assert.equal(SK.s4n('1'), 0);
      inValidValueArray.forEach(function (element) {
        assert.equal(SK.s4n(element), 0);
      });
    });
  });
  describe('SK.s4o', function () {
    it('object return object', function () {
      assert.deepEqual(SK.s4o({a: 1, b: 2}), {a: 1, b: 2});
    });
    it('other return object', function () {
      inValidValueArray.forEach(function (element) {
        assert.deepEqual(SK.s4o(element), {});
      });
    });
  });
  describe('SK.s4s', function () {
    it('string return string', function () {
      assert.equal(SK.s4s('s'), 's');
    });
    it('other return empty', function () {
      assert.equal(SK.s4s(null), '');
      assert.equal(SK.s4s(undefined, 'UNDEFINED'), 'UNDEFINED');
      assert.equal(SK.s4s(NaN), '');
    });
  });
});


