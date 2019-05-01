import Proxy0 from '../src/Proxy0';

describe('Proxy0', () => {

  beforeAll(() => {
    // console.log('SK test case start!');
  });

  afterAll(() => {
    // console.log('SK test case done!');
  });

  beforeEach(() => {
    //console.log('some test case start!');
  });

  afterEach(() => {
    //console.log('some test case done!');
  });

  describe('$any', () => {
    test('not nil', () => {
      expect(Proxy0.$any(1)).toEqual({"0": 1, "length": 1});
    });
  });

  describe('md5Any', () => {
    test('not nil', () => {
      expect(Proxy0.md5Any('anyString')).toEqual('f26de8fe6ef3ede1eca6f261781c4431');
    });
  });

  describe('_Any', () => {
    test('not nil', () => {
      expect(Proxy0._Any('anyString').toString()).toEqual('anyString');
    });
  });

  describe('momentAny', () => {
    test('not nil', () => {
      expect(Proxy0.momentAny('1949-10-01').format()).toEqual('1949-10-01T00:00:00+08:00');
    });
  });

});
