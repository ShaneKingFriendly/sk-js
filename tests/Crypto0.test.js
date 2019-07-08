import Crypto0 from '../src/Crypto0.js';

describe('Crypto0', () => {

  let plainText = 'plainText';
  let cipherText = 'urvlk7OI3tp6JUMD13lWTw==';

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

  describe('encrypts', () => {
    test('aesEncrypt', () => {
      expect(Crypto0.aesEncrypt(plainText)).toBe(cipherText);
    });
  });
  describe('decrypts', () => {
    it('aesDecrypt', () => {
      expect(Crypto0.aesDecrypt(cipherText)).toBe(plainText);
    });
  });
});


