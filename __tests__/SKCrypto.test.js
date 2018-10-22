import SKCrypto from '../src/SKCrypto.js';

describe('SKCrypto', () => {

  let plainText = 'plainText';
  let cipherText = '2SZ/de9I0rvxO7s9wdCohQ==';

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
      expect(SKCrypto.aesEncrypt(plainText)).toBe(cipherText);
    });
  });
  describe('decrypts', () => {
    it('aesDecrypt', () => {
      expect(SKCrypto.aesDecrypt(cipherText)).toBe(plainText);
    });
  });
});


