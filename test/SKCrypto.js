'use strict';

import assert from 'assert';
import SKCrypto from '../src/SKCrypto.js';

describe('SKCrypto', () => {

  let plainText = 'plainText';
  let cipherText = '2SZ/de9I0rvxO7s9wdCohQ==';

  before(() => {
    // console.log('SK test case start!');
  });

  after(() => {
    // console.log('SK test case done!');
  });

  beforeEach(() => {
    //console.log('some test case start!');
  });

  afterEach(() => {
    //console.log('some test case done!');
  });

  describe('encrypts', () => {
    it('aesEncrypt', () => {
      assert.equal(SKCrypto.aesEncrypt(plainText), cipherText);
    });
  });
  describe('decrypts', () => {
    it('aesDecrypt', () => {
      assert.equal(SKCrypto.aesDecrypt(cipherText), plainText);
    });
  });
});


