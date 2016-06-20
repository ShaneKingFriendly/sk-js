'use strict';

var jsdom = require('jsdom').jsdom;
global.document = jsdom('<html></html>', {});
global.window = document.defaultView;

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


global.jQuery = global.$ = require('jquery');
require('sk-polyfill');


var SK = require('../src/sk');
SK.noConflict();
SK = require('../src/sk');
var assert = require('assert');


var inValidValueArray = [null, undefined, NaN, 'Invalid Date'];


describe('extend', function () {
  it('array replace by new', function () {
    var a1 = {o: [{'a': 1}, 'b', 2]},
      a2 = {o: [{'x': 3}, 'y', 4]},
      jQueryRst = {o: [{'a': 1, 'x': 3}, 'y', 4]},//if is array, when some index is object then extend
      skRst = {o: [{'x': 3}, 'y', 4]};//if is array, empty old array
    assert.deepEqual($.extend(true, {}, a1, a2), jQueryRst);
    assert.deepEqual(SK.extend(true, {}, a1, a2), skRst);
  });
});

describe('$', function () {
  it('equals self', function () {
    var sk$1 = SK.$();
    var sk$2 = SK.$(window, 'sk$');
    assert.deepEqual(sk$1, sk$2);
  });
  it('equals value', function () {
    var sk$ = SK.$();
    sk$.a = 1;
    assert.equal(sk$.a, 1);
  });
});

describe('a', function () {
  it('array return array', function () {
    assert.deepEqual(SK.a(['a', 1, 'b', 2]), ['a', 1, 'b', 2]);
  });
  it('unarray return array', function () {
    inValidValueArray.forEach(function (element) {
      assert.deepEqual(SK.a(element), []);
    });
  });
});
describe('b', function () {
  it('true return true', function () {
    assert.equal(SK.b(true), true);
  });
  it('other return false', function () {
    assert.equal(SK.b('true'), false);
    assert.equal(SK.b('false'), false);
    assert.equal(SK.b('everything'), false);
    assert.equal(SK.b(''), false);
    inValidValueArray.forEach(function (element) {
      assert.equal(SK.b(element), false);
    });
  });
});
describe('d', function () {
  var date = new Date();
  it('date return date', function () {
    assert.equal(SK.d(date), date);
  });
  it('should return false', function () {
    inValidValueArray.forEach(function (element) {
      assert.equal(SK.d(element, date), date);
    });
  });
});
describe('n', function () {
  it('number return number', function () {
    assert.equal(SK.n('1'), 1);
  });
  it('other return zero', function () {
    inValidValueArray.forEach(function (element) {
      assert.equal(SK.n(element), 0);
    });
  });
});
describe('o', function () {
  it('object return object', function () {
    assert.deepEqual(SK.o({a: 1, b: 2}), {a: 1, b: 2});
  });
  it('other return object', function () {
    inValidValueArray.forEach(function (element) {
      assert.deepEqual(SK.o(element), {});
    });
  });
});
describe('s', function () {
  it('string return string', function () {
    assert.equal(SK.s('s'), 's');
  });
  it('other return empty', function () {
    assert.equal(SK.s(null), '');
    assert.equal(SK.s(undefined, 'UNDEFINED'), 'UNDEFINED');
    assert.equal(SK.s(NaN), '');
  });
});
