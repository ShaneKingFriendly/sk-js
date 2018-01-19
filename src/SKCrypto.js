import CryptoJS from 'crypto-js';

export default class SKCrypto {
  //ThisIsSixFourBitSaltForShaneKing
  static DEFAULT_SALT = '546869734973536978466F757242697453616C74466F725368616E654B696E67';

  static aesDecrypt(cipherText, salt = SKCrypto.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = salt.length * 2 / 32) {
    return CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(cipherText)
      }),
      CryptoJS.PBKDF2(
        passPhrase,
        CryptoJS.enc.Hex.parse(salt),
        {iterations: iterations, keySize: keySize}),
      {iv: CryptoJS.enc.Hex.parse(iv)}).toString(CryptoJS.enc.Utf8);
  }

  static aesEncrypt(plainText, salt = SKCrypto.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = salt.length * 2 / 32) {
    return CryptoJS.AES.encrypt(
      plainText,
      CryptoJS.PBKDF2(
        passPhrase,
        CryptoJS.enc.Hex.parse(salt),
        {iterations: iterations, keySize: keySize}),
      {iv: CryptoJS.enc.Hex.parse(iv)}).ciphertext.toString(CryptoJS.enc.Base64);
  }
}
