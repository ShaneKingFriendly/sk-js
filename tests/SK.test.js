import '../src/Polyfill';
import SK from '../src/SK';

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

  describe('$', () => {
    it('equals self', () => {
      let sk$1 = SK.$(testData);
      let sk$2 = SK.$(testData);
      expect(sk$1).toEqual(sk$2);
    });
    it('equals value', () => {
      let sk$ = SK.$(testData);
      sk$.a = 1;
      expect(sk$.a).toEqual(1);
    });
    it('initVal', () => {
      SK.$(testData);
      let sk$ = SK.$(testData, {b: 1});
      expect(sk$.b).toEqual(1);
    });
  });
  describe('assign', () => {
    it('array replace by new', () => {
      let a1 = {a: [{'a': 1}, 'b', 2]},
        a2 = {a: [{'x': 3}, 'y', 4]},
        skRst = {a: [{'x': 3}, 'y', 4]};//if is array, empty old array
      expect(SK.assign({}, a1, a2)).toEqual(skRst);
    });
    it('deep while object node', () => {
      let a1 = {a: [{'b': 1}, 'c', 2], d: {e: 3}},
        a2 = {a: [{'x': 10}, 'y', 20], d: {z: 30}},
        skRst = {"a": [{"x": 10}, "y", 20], "d": {"e": 3, "z": 30}};
      expect(SK.assign({}, a1, a2)).toEqual(skRst);
    });
    it('deep copy', () => {
      let a = {a: 1};
      let b = SK.assign({}, {b: a});
      expect(a).toEqual(b.b);
    });
    it('deep copy exist', () => {
      let a1 = {a: 2};
      let a = {a: 1};
      let b = SK.assign({b: a1}, {b: a});
      expect(a1).toEqual(b.b);
      expect(a).not.toBe(b.b);
    });
    // it('isFunction', () => {
    //   let f1 = () => {
    //     },
    //     f2 = () => {
    //     },
    //     skRst = f2;//if is array, empty old array
    //   expect(SK.assign({}, f1, f2), skRst);
    // });
  });
  describe('appendParameter', () => {
    it('not ?', () => {
      expect(SK.appendParameter('a', 'b', 'c')).toEqual('a?b=c');
    });
    it('has ?', () => {
      expect(SK.appendParameter('a?b=2', 'c', '3')).toEqual('a?b=2&c=3');
    });
    it('replace exist', () => {
      expect(SK.appendParameter('a?b=2', 'b', '4')).toEqual('a?b=4');
    });
  });
  describe('cookies', () => {
    it('setter getter', () => {
      SK.cookies('a', 1);
      expect(SK.cookies('a')).toEqual('1');
    });
  });
  describe('descartes', () => {
    it('array and array to array', () => {
      expect(SK.descartes(['alert', 'btn'], ['success', 'info'])).toEqual(['alert-success', 'alert-info', 'btn-success', 'btn-info']);
    });
    it('string and string to string', () => {
      expect(SK.descartes('alert', 'link', '-')).toEqual('alert-link');
    });
  });
  describe('ellipsis', () => {
    it('<8', () => {
      expect(SK.ellipsis('abc')).toEqual('abc');
    });
    it('>8', () => {
      expect(SK.ellipsis('abcdefghijklmn')).toEqual('abcdefgh...');
    });
  });
  describe('emptyFunc', () => {
    it('emptyFunc', () => {
      expect(SK.emptyFunc()).toEqual(undefined);
    });
  });
  describe('extend', () => {
    it('array replace by new', () => {
      let a1 = {a: [{'a': 1}, 'b', 2]},
        a2 = {a: [{'x': 3}, 'y', 4]},
        skRst = {a: [{'x': 3}, 'y', 4]};//if is array, empty old array
      expect(SK.extend(true, {}, a1, a2)).toEqual(skRst);
    });
    it('deep while object node', () => {
      let a1 = {a: [{'b': 1}, 'c', 2], d: {e: 3}},
        a2 = {a: [{'x': 10}, 'y', 20], d: {z: 30}},
        skRst = {"a": [{"x": 10}, "y", 20], "d": {"e": 3, "z": 30}};
      expect(SK.extend(true, {}, a1, a2)).toEqual(skRst);
    });
    it('deep copy', () => {
      let a = {a: 1};
      let b = SK.extend(true, {}, {b: a});
      expect(a).not.toBe(b.b);
    });
    it('target is array', () => {
      let a = {a: 1};
      let b = SK.extend(true, 'haha', {b: a});
      expect(a).not.toBe(b.b);
    });
    it('just target', () => {
      let b = SK.extend(true, []);
      expect(b).not.toEqual({});
    });
    it('target === copy', () => {
      let target = {};
      let recursive = {foo: target, bar: 5};
      target = SK.extend(true, target, recursive);
      expect(target.bar).toEqual(5);
    });
  });
  describe('extends', () => {
    it('array replace by new', () => {
      let a1 = {a: [{'a': 1}, 'b', 2]},
        a2 = {a: undefined};
      expect(SK.extend(true, {}, a1, a2)).toEqual(a1);
      expect(SK.extends(true, {}, a1, a2)).toEqual(a2);
    });
    it('target is array', () => {
      let a = {a: 1};
      let b = SK.extends(true, 'haha', {b: a});
      expect(a).not.toBe(b.b);
    });
    it('just target', () => {
      let b = SK.extends(true, []);
      expect(b).not.toEqual({});
    });
    it('target === copy', () => {
      let target = {};
      let recursive = {foo: target, bar: 5};
      target = SK.extends(true, target, recursive);
      expect(target.bar).toEqual(5);
    });
  });
  describe('getCurrentLanguage', () => {
    it('getCurrentLanguage', () => {
      expect(SK.getCurrentLanguage()).toEqual('en_US');
    });
  });
  describe('getSubPaths', () => {
    it('getSubPaths', () => {
      expect(SK.getSubPaths('a/b')).toEqual(['/', '/a/', '/a/b/']);
    });
    it('empty', () => {
      expect(SK.getSubPaths('a/b/')).toEqual(['/', '/a/', '/a/b/']);
    });
  });
  describe('getValidPath', () => {
    it('getValidPath', () => {
      expect(SK.getValidPath('a/b')).toEqual('/a/b/');
    });
  });
  describe('s4a', () => {
    it('array return array', () => {
      expect(SK.s4a(['a', 1, 'b', 2])).toEqual(['a', 1, 'b', 2]);
    });
    it('unarray return array', () => {
      inValidValueArray.forEach(function (element) {
        expect(SK.s4a(element)).toEqual([]);
      });
    });
  });
  describe('s4b', () => {
    it('true return true', () => {
      expect(SK.s4b(true)).toEqual(true);
      expect(SK.s4b(false)).toEqual(false);
    });
    it('other return false', () => {
      expect(SK.s4b('true')).toEqual(false);
      expect(SK.s4b('false')).toEqual(false);
      expect(SK.s4b('everything')).toEqual(false);
      expect(SK.s4b('')).toEqual(false);
      inValidValueArray.forEach(function (element) {
        expect(SK.s4b(element)).toEqual(false);
      });
    });
  });
  describe('s4d', () => {
    let date = new Date();
    it('date return date', () => {
      expect(SK.s4d(date)).toEqual(date);
    });
    it('should return false', () => {
      inValidValueArray.forEach(function (element) {
        expect(SK.s4d(element, date)).toEqual(date);
      });
    });
  });
  describe('s4n', () => {
    it('number return number', () => {
      expect(SK.s4n(1)).toEqual(1);
    });
    it('other return zero', () => {
      expect(SK.s4n('1')).toEqual(1);
      inValidValueArray.forEach(function (element) {
        expect(SK.s4n(element)).toEqual(0);
      });
    });
  });
  describe('s4o', () => {
    it('object return object', () => {
      expect(SK.s4o({a: 1, b: 2})).toEqual({a: 1, b: 2});
    });
    it('other return object', () => {
      inValidValueArray.forEach(function (element) {
        expect(SK.s4o(element)).toEqual({});
      });
    });
  });
  describe('s4s', () => {
    it('string return string', () => {
      expect(SK.s4s('s')).toEqual('s');
    });
    it('other return empty', () => {
      expect(SK.s4s(null)).toEqual('');
      expect(SK.s4s(undefined, 'UNDEFINED')).toEqual('UNDEFINED');
      expect(SK.s4s(NaN)).toEqual('');
    });
  });
  describe('strMapping', () => {
    it('strMapping', () => {
      expect(SK.strMapping().length).toBeLessThanOrEqual(22);
    });
    it('srcSet === dstSet', () => {
      expect(SK.strMapping('a', 1, 1)).toEqual('a');
    });
  });
  describe('upperWordsFirstChar', () => {
    it('path -> Path', () => {
      expect(SK.upperWordsFirstChar('path')).toEqual('Path');
    });
    it('list -> List', () => {
      expect(SK.upperWordsFirstChar('list')).toEqual('List');
    });
    it('words', () => {
      expect(SK.upperWordsFirstChar('xi nAn shi you xUe yuan china people')).toEqual('Xi NAn Shi You XUe Yuan China People');
    });
  });
  describe('uuid', () => {
    let uuid = SK.uuid();
    expect(uuid).toEqual(uuid.toLowerCase());
  });
  describe('l22', () => {
    let uuidShort = SK.l22();
    expect(uuidShort.length).toBeLessThanOrEqual(22);
  });
});


