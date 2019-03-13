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

  describe('hexColor', () => {
    test('random', () => {
      let randomColor = Color0.hexColor();
      expect(randomColor.match(/^(#[0-9a-fA-F]{6}){1}$/g)[0]).toBe(randomColor);
    });
    test('ShaneKing', () => {
      let fixedColor = Color0.hexColor('ShaneKing');
      expect(fixedColor).toBe('#f27d79');
    });
  });

});
