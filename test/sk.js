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
describe('extends', function () {
  it('sources is array', function () {
    var a1 = {a: 1, b: 2, m: [5, 6, 7]},
      a2 = {c: 3, d: 4, m: [8, 9, 10]};
    assert.deepEqual($sk.extends(true, {}, [a1, a2]), $sk.extend(true, {}, a1, a2));
  });
});
describe('classNames', function () {
  it('keeps object keys with truthy values', function () {
    assert.equal($sk.classNames({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1
    }), 'a f');
  });
  it('should classNames classNames', function () {
    assert.equal($sk.classNames('foo', 'bar', 'foo', 'bar', {foo: true}), 'foo bar');
  });
  it('should make sure subsequent objects can remove/add classes', function () {
    assert.equal($sk.classNames('foo', {foo: false}, {foo: true, bar: true}), 'foo bar');
  });
  it('should make sure object with falsy value wipe out previous classes', function () {
    assert.equal($sk.classNames('foo foo', 0, null, undefined, true, 1, 'b', {'foo': false}), '1 b');
    assert.equal($sk.classNames('foo', 'foobar', 'bar', {foo: false}), 'foobar bar');
    assert.equal($sk.classNames('foo', 'foo-bar', 'bar', {foo: false}), 'foo-bar bar');
    assert.equal($sk.classNames('foo', '-moz-foo-bar', 'bar', {foo: false}), '-moz-foo-bar bar');
  });
  it('joins arrays of class names and ignore falsy values', function () {
    assert.equal($sk.classNames('a', 0, null, undefined, true, 1, 'b'), '1 a b');
  });
  it('supports heterogenous arguments', function () {
    assert.equal($sk.classNames({a: true}, 'b', 0), 'a b');
  });
  it('should be trimmed', function () {
    assert.equal($sk.classNames('', 'b', {}, ''), 'b');
  });
  it('returns an empty string for an empty configuration', function () {
    assert.equal($sk.classNames({}), '');
  });
  it('supports an array of class names', function () {
    assert.equal($sk.classNames(['a', 'b']), 'a b');
  });
  it('joins array arguments with string arguments', function () {
    assert.equal($sk.classNames(['a', 'b'], 'c'), 'a b c');
    assert.equal($sk.classNames('c', ['a', 'b']), 'c a b');
  });
  it('handles multiple array arguments', function () {
    assert.equal($sk.classNames(['a', 'b'], ['c', 'd']), 'a b c d');
  });
  it('handles arrays that include falsy and true values', function () {
    assert.equal($sk.classNames(['a', 0, null, undefined, false, true, 'b']), 'a b');
  });
  it('handles arrays that include arrays', function () {
    assert.equal($sk.classNames(['a', ['b', 'c']]), 'a b c');
  });
  it('handles arrays that include objects', function () {
    assert.equal($sk.classNames(['a', {b: true, c: false}]), 'a b');
  });
  it('handles deep array recursion', function () {
    assert.equal($sk.classNames(['a', ['b', ['c', {d: true}]]]), 'a b c d');
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
