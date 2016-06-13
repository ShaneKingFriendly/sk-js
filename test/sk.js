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


var $sk = require('../src/sk')(window, jQuery, true);
$sk.noConflict();
$sk = require('../src/sk')(window, jQuery);
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

describe('$', function () {
  it('equals self', function () {
    var sk$1 = $sk.$();
    var sk$2 = $sk.$(window, 'sk$');
    assert.deepEqual(sk$1, sk$2);
  });
  it('equals value', function () {
    var sk$ = $sk.$();
    sk$.a = 1;
    assert.equal(sk$.a, 1);
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
describe('isA', function () {
  it('Array', function () {
    assert.equal($sk.isA([]), true);
    assert.equal($sk.isA(new Array()), true);
  });
});
describe('isD', function () {
  it('Date', function () {
    assert.equal($sk.isD(new Date()), true);
  });
});
describe('isF', function () {
  it('Function', function () {
    var f = function () {
      return 'f';
    };
    assert.equal($sk.isF(f), true);
  });
});
describe('isN', function () {
  it('Number', function () {
    assert.equal($sk.isN(1), true);
    assert.equal($sk.isN(1.1), true);
    assert.equal($sk.isN('1'), false);
  });
});
describe('isO', function () {
  it('Object', function () {
    assert.equal($sk.isO({}), true);
    assert.equal($sk.isO(Object.create(null)), false);
  });
});
describe('isS', function () {
  it('String', function () {
    assert.equal($sk.isS('1'), true);
    assert.equal($sk.isS(1), false);
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
    assert.equal($sk.s(null), '');
    assert.equal($sk.s(undefined), '');
    assert.equal($sk.s(NaN), '');
  });
});
