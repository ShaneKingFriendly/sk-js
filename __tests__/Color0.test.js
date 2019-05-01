import Color0 from '../src/Color0';

describe('Color0', () => {

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

  describe('hex2rgb', () => {
    test('#000000', () => {
      expect(Color0.hex2rgb('#000000')).toEqual([0, 0, 0]);
    });
    test('#f27d79', () => {
      expect(Color0.hex2rgb('#f27d79')).toEqual([242, 125, 121]);
    });
    test('#ffffff', () => {
      expect(Color0.hex2rgb('#ffffff')).toEqual([255, 255, 255]);
    });
  });

  describe('hexColor', () => {
    test('random', () => {
      let randomColor = Color0.hexColor();
      expect(randomColor.match(/^(#[0-9a-fA-F]{6}){1}$/g)[0]).toBe(randomColor);
    });
    test('fixed', () => {
      let fixedColor = Color0.hexColor('ShaneKing');
      expect(fixedColor).toBe('#f27d79');
    });
  });

  describe('hsl2hsv', () => {
    // test('#000000', () => {
    //   expect(Color0.hsl2hsv([0, 0, 0])).toEqual([0, 0, 0]);
    // });
    test('#f27d79', () => {
      expect(Color0.hsl2hsv([1.9834710743801653, 82.31292517006801, 71.17647058823529])).toEqual([1.9834710743801653, 50.000000000000014, 94.90196078431372]);
    });
    test('#ffffff', () => {
      expect(Color0.hsl2hsv([0, 0, 100])).toEqual([0, 0, 100]);
    });
  });

  describe('hsl2rgb', () => {
    test('#000000', () => {
      expect(Color0.hsl2rgb([0, 0, 0])).toEqual([0, 0, 0]);
    });
    test('#f27d79', () => {
      expect(Color0.hsl2rgb([1.9834710743801653, 82.31292517006801, 71.17647058823529])).toEqual([242, 124.99999999999997, 120.99999999999997]);
    });
    test('#ffffff', () => {
      expect(Color0.hsl2rgb([0, 0, 100])).toEqual([255, 255, 255]);
    });
    test('fix1', () => {
      expect(Color0.hsl2rgb([-30000, 30, 30])).toEqual([-22529.25000000001, -22621.050000000007, -22712.850000000006]);
    });
    test('fix2', () => {
      expect(Color0.hsl2rgb([190, 30, 30])).toEqual([53.54999999999999, 91.8, 99.45]);
    });
    test('fix3', () => {
      expect(Color0.hsl2rgb([30000, 30, 30])).toEqual([53.54999999999999, 53.54999999999999, 53.54999999999999]);
    });
  });

  describe('hsv2hsl', () => {
    // test('#000000', () => {
    //   expect(Color0.hsv2hsl([0, 0, 0])).toEqual([0, 0, 0]);
    // });
    test('#f27d79', () => {
      expect(Color0.hsv2hsl([1.9834710743801653, 50, 94.90196078431373])).toEqual([1.9834710743801653, 82.31292517006804, 71.17647058823529]);
    });
    // test('#ffffff', () => {
    //   expect(Color0.hsv2hsl([0, 0, 100])).toEqual([0, 0, 100]);
    // });
  });

  describe('hsv2rgb', () => {
    test('#000000', () => {
      expect(Color0.hsv2rgb([0, 0, 0])).toEqual([0, 0, 0]);
    });
    test('#f27d79', () => {
      expect(Color0.hsv2rgb([1.9834710743801653, 50, 94.90196078431373])).toEqual([242.00000000000003, 125, 121.00000000000001]);
    });
    test('#ffffff', () => {
      expect(Color0.hsv2rgb([0, 0, 100])).toEqual([255, 255, 255]);
    });
    test('fix1', () => {
      expect(Color0.hsv2rgb([60, 0, 100])).toEqual([255, 255, 255]);
    });
    test('fix2', () => {
      expect(Color0.hsv2rgb([120, 0, 100])).toEqual([255, 255, 255]);
    });
    test('fix3', () => {
      expect(Color0.hsv2rgb([180, 0, 100])).toEqual([255, 255, 255]);
    });
    test('fix4', () => {
      expect(Color0.hsv2rgb([240, 0, 100])).toEqual([255, 255, 255]);
    });
    test('fix5', () => {
      expect(Color0.hsv2rgb([300, 0, 100])).toEqual([255, 255, 255]);
    });
  });

  describe('rgb2hex', () => {
    test('#000000', () => {
      expect(Color0.rgb2hex([0, 0, 0])).toEqual('#000000');
    });
    test('#f27d79', () => {
      expect(Color0.rgb2hex([242, 125, 121])).toEqual('#f27d79');
    });
    test('#ffffff', () => {
      expect(Color0.rgb2hex([255, 255, 255])).toEqual('#ffffff');
    });
  });

  describe('rgb2hsl', () => {
    test('#000000', () => {
      expect(Color0.rgb2hsl([0, 0, 0])).toEqual([0, 0, 0]);
    });
    test('#f27d79', () => {
      expect(Color0.rgb2hsl([242, 125, 121])).toEqual([1.9834710743801653, 82.31292517006801, 71.17647058823529]);
    });
    test('#ffffff', () => {
      expect(Color0.rgb2hsl([255, 255, 255])).toEqual([0, 0, 100]);
    });
    test('fix1', () => {
      expect(Color0.rgb2hsl([0, 255, 0])).toEqual([120, 100, 50]);
    });
    test('fix2', () => {
      expect(Color0.rgb2hsl([0, 0, 255])).toEqual([240, 100, 50]);
    });
    test('fix3', () => {
      expect(Color0.rgb2hsl([200, 50, 100])).toEqual([340, 60.00000000000001, 49.01960784313725]);
    });
  });

  describe('rgb2hsv', () => {
    test('#000000', () => {
      expect(Color0.rgb2hsv([0, 0, 0])).toEqual([0, 0, 0]);
    });
    test('#f27d79', () => {
      expect(Color0.rgb2hsv([242, 125, 121])).toEqual([1.9834710743801653, 50, 94.90196078431373]);
    });
    test('#ffffff', () => {
      expect(Color0.rgb2hsv([255, 255, 255])).toEqual([0, 0, 100]);
    });
    test('fix1', () => {
      expect(Color0.rgb2hsv([0, 255, 0])).toEqual([120, 100, 100]);
    });
    test('fix2', () => {
      expect(Color0.rgb2hsv([0, 0, 255])).toEqual([240, 100, 100]);
    });
    test('fix3', () => {
      expect(Color0.rgb2hsv([200, 50, 100])).toEqual([340, 75, 78.4313725490196]);
    });
  });

});
