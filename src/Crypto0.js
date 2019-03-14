import Proxy0 from './Proxy0';

export default class Crypto0 {
  //ThisIsSixFourBitSaltForShaneKing
  static DEFAULT_SALT = '546869734973536978466F757242697453616C74466F725368616E654B696E67';

  static aesDecrypt(cipherText, salt = Crypto0.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = (salt.length * 2) / 32) {
    return Proxy0.CryptoJS.AES.decrypt(
      Proxy0.CryptoJS.lib.CipherParams.create({
        ciphertext: Proxy0.CryptoJS.enc.Base64.parse(cipherText),
      }),
      Proxy0.CryptoJS.PBKDF2(
        passPhrase,
        Proxy0.CryptoJS.enc.Hex.parse(salt),
        {iterations, keySize}),
      {iv: Proxy0.CryptoJS.enc.Hex.parse(iv)}).toString(Proxy0.CryptoJS.enc.Utf8);
  }

  static aesEncrypt(plainText, salt = Crypto0.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = (salt.length * 2) / 32) {
    return Proxy0.CryptoJS.AES.encrypt(
      plainText,
      Proxy0.CryptoJS.PBKDF2(
        passPhrase,
        Proxy0.CryptoJS.enc.Hex.parse(salt),
        {iterations, keySize}),
      {iv: Proxy0.CryptoJS.enc.Hex.parse(iv)}).ciphertext.toString(Proxy0.CryptoJS.enc.Base64);
  }
}
