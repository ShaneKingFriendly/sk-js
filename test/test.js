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
global.jsface = require('jsface');
require('sk-polyfill');


var $sk = require('../src/sk')(window, jsface, jQuery, true);
$sk.noConflict();
$sk = require('../src/sk')(window, jsface, jQuery);
var assert = require('assert');


var inValidValueArray = [null, undefined, NaN, 'Invalid Date'];


describe('extend', function () {
  it('array replace by new', function () {
    var a1 = {o: [{'a': 1}, 'b', 2]},
      a2 = {o: [{'x': 3}, 'y', 4]},
      jQueryRst = {o: [{'a': 1, 'x': 3}, 'y', 4]},//if is array, when some index is object then extend
      skRst = {o: [{'x': 3}, 'y', 4]};//if is array, empty old array
    assert.deepEqual(jQuery.extend(true, {}, a1, a2), jQueryRst);
    assert.deepEqual($sk.extend(true, {}, a1, a2), skRst);
  });
});

describe('a', function () {
  it('array return array', function () {
    assert.deepEqual($sk.a(['a', 1, 'b', 2]), ['a', 1, 'b', 2]);
  });
  it('unarray return array', function () {
    inValidValueArray.forEach(function (element) {
      assert.deepEqual($sk.a(element), []);
    });
  });
});
describe('b', function () {
  it('true return true', function () {
    assert.equal($sk.b(true), true);
  });
  it('other return false', function () {
    assert.equal($sk.b('true'), false);
    assert.equal($sk.b('false'), false);
    assert.equal($sk.b('everything'), false);
    assert.equal($sk.b(''), false);
    inValidValueArray.forEach(function (element) {
      assert.equal($sk.b(element), false);
    });
  });
});
describe('d', function () {
  var date = new Date();
  it('date return date', function () {
    assert.equal($sk.d(date), date);
  });
  it('should return false', function () {
    inValidValueArray.forEach(function (element) {
      assert.equal($sk.d(element, date), date);
    });
  });
});
describe('n', function () {
  it('number return number', function () {
    assert.equal($sk.n('1'), 1);
  });
  it('other return zero', function () {
    inValidValueArray.forEach(function (element) {
      assert.equal($sk.n(element), 0);
    });
  });
});
describe('o', function () {
  it('object return object', function () {
    assert.deepEqual($sk.o({a: 1, b: 2}), {a: 1, b: 2});
  });
  it('other return object', function () {
    inValidValueArray.forEach(function (element) {
      assert.deepEqual($sk.o(element), {});
    });
  });
});
describe('s', function () {
  it('string return string', function () {
    assert.equal($sk.s('s'), 's');
  });
  it('other return empty', function () {
    assert.equal($sk.s(null), 'null');
    assert.equal($sk.s(undefined), 'undefined');
    assert.equal($sk.s(NaN), 'NaN');
  });
});

// describe('createResult', function () {
//   var ro1 = {success: true, code: '', fmt: '', arg: {}, msg: '', data: {}};
//   var ro2 = {success: true, code: '', fmt: 'Hello, {name}!', arg: {name: 'ShaneKing'}, msg: '', data: {}};
//   var r1 = $sk.createResult(ro1);
//   var r2 = $sk.createResult(ro2);
//   it('get', function () {
//     assert.deepEqual(r1.result, ro1);
//   });
//   it('set', function () {
//     r1.result = ro2;
//     assert.deepEqual(r1.result, ro2);
//   });
//   it('toString', function () {
//     assert.deepEqual(r2.fmtMsg(), 'Hello, ShaneKing!');
//   });
//   it('success', function () {
//     assert.equal(r2.success(), true);
//   });
//
// });
