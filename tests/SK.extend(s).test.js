import '../src/Polyfill';
import Proxy0 from '../src/Proxy0';
import SK from '../src/SK';

describe('SK', () => {
  let testAEE1;
  let testAEE2;
  let testAEE3;

  beforeAll(() => {
  });
  beforeEach(() => {
    testAEE1 = {
      o1: {
        v1: '1o1v1',
        v2: '1o1v2',
        o1: {v1: '1o1o1v1', v2: '1o1o1v2'},
        o2: {v1: '1o1o2v1', v2: '1o1o2v2'},
        a1: [{v1: '1o1a1v1', v2: '1o1a1v2'}, {v1: '1o1a1v1', v2: '1o1a1v2'}],
        a2: [{v1: '1o1a2v1-1', v2: '1o1a2v2-1'}, {v1: '1o1a2v1-2', v2: '1o1a2v2-2'}, {v1: '1o1a2v1-3', v2: '1o1a2v2-3'}],
        u1: {v1: '1'}
      },
      a1: [{v1: '1a1o1v1', v2: '1a1o1v2'}, {v1: '1a1o2v1', v2: '1a1o2v2'}],
      f1: function () {
        console.log('1f1')
      }
    };
    testAEE2 = {
      o1: {
        v2: '2o1v2',
        v3: '2o1v3',
        o2: {v2: '2o1o2v2', v3: '2o1o2v3'},
        o3: {v2: '2o1o3v2', v3: '2o1o3v3'},
        a2: [{v2: '2o1a2v2-1', v3: '2o1a2v3-1'}, {v2: '2o1a2v2-2', v3: '2o1a2v3-2'}],
        a3: [{v2: '2o1a3v2', v3: '2o1a3v3'}, {v2: '2o1a3v2', v3: '2o1a3v3'}],
        u1: undefined
      },
      o2: {v1: '2o2v2'},
      a1: [{v2: '2a1o2v2', v3: '2a1o2v3'}, {v2: '2a1o3v2', v3: '2a1o3v3'}],
      a2: ['2a2'],
      f1: function () {
        console.log('2f1')
      },
      f2: function () {
        console.log('2f2')
      }
    };
    testAEE3 = {};
  });

  //for object: Equal like ==, Be like ===
  it('_assign', () => {
    testAEE3 = Proxy0._.assign(testAEE3, testAEE1, testAEE2);
    expect(testAEE3.o2).toBe(testAEE2.o2);//toBe, shallow
    expect(testAEE3.o1).toBe(testAEE2.o1);//toBe, shallow
    expect(testAEE3.o1.a2 === testAEE2.o1.a2).toBe(true);//true, shallow
    expect(testAEE3.o1.u1 === undefined).toBe(true);//true, shallow
  });
  it('assign', () => {
    testAEE3 = SK.assign(testAEE3, testAEE1, testAEE2);
    expect(testAEE3.o2).toBe(testAEE2.o2);//toBe, shallow
    expect(testAEE3.o1.o2).not.toEqual(testAEE2.o1.o2);//not.toEqual, merge with object
    expect(testAEE3.o1.a2 === testAEE2.o1.a2).toBe(true);//true, shallow without object
    expect(testAEE3.o1.u1 === undefined).toBe(true);//true, shallow support undefined
  });
  it('$extend', () => {
    testAEE3 = Proxy0.$.extend(true, testAEE3, testAEE1, testAEE2);
    expect(testAEE3.o2).not.toBe(testAEE2.o2);//not.toBe, deep
    expect(testAEE3.o1.o2).not.toEqual(testAEE2.o1.o2);//not.toEqual, merge
    expect(testAEE3.o1.a2 === testAEE2.o1.a2).toBe(false);//false, merge
    expect(testAEE3.o1.a2.length === testAEE2.o1.a2.length).toBe(false);//false, merge
    expect(testAEE3.o1.a2[0]).not.toBe(testAEE2.o1.a2[0]);//not.toBe, merge
    expect(testAEE3.o1.a2[0]).not.toEqual(testAEE2.o1.a2[0]);//not.toEqual, merge
    expect(testAEE3.o1.u1 === undefined).toBe(false);//false, merge
  });
  it('extend', () => {
    testAEE3 = SK.extend(true, testAEE3, testAEE1, testAEE2);
    expect(testAEE3.o2).not.toBe(testAEE2.o2);//not.toBe, deep
    expect(testAEE3.o1.o2).not.toEqual(testAEE2.o1.o2);//not.toEqual, merge
    expect(testAEE3.o1.a2 === testAEE2.o1.a2).toBe(false);//false, replace with new
    expect(testAEE3.o1.a2.length === testAEE2.o1.a2.length).toBe(true);//true, replace
    expect(testAEE3.o1.a2[0]).not.toBe(testAEE2.o1.a2[0]);//not.toBe, deep copy
    expect(testAEE3.o1.a2[0]).toEqual(testAEE2.o1.a2[0]);//toEqual, deep copy
    expect(testAEE3.o1.u1 === undefined).toBe(false);//false, merge
  });
  it('extends', () => {
    testAEE3 = SK.extends(true, testAEE3, testAEE1, testAEE2);
    expect(testAEE3.o2).not.toBe(testAEE2.o2);//not.toBe, deep
    expect(testAEE3.o1.o2).not.toEqual(testAEE2.o1.o2);//not.toEqual, merge
    expect(testAEE3.o1.a2 === testAEE2.o1.a2).toBe(false);//false, replace with new
    expect(testAEE3.o1.a2.length === testAEE2.o1.a2.length).toBe(true);//true, replace
    expect(testAEE3.o1.a2[0]).not.toBe(testAEE2.o1.a2[0]);//not.toBe, deep copy
    expect(testAEE3.o1.a2[0]).toEqual(testAEE2.o1.a2[0]);//toEqual, deep copy
    expect(testAEE3.o1.u1 === undefined).toBe(true);//true, deep copy
  });

  afterEach(() => {
  });
  afterAll(() => {
  });
});
