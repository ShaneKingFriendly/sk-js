import Proxy0 from './Proxy0';

export default class Crypto0 {
  //ILoveYou
  static DEFAULT_SALT = '494c6f7665596f75';

  static aesDecrypt(cipherText, salt = Crypto0.DEFAULT_SALT) {
    return Proxy0.CryptoJS.enc.Utf8.stringify(Proxy0.CryptoJS.AES.decrypt(cipherText, Proxy0.CryptoJS.enc.Utf8.parse(salt), {mode: Proxy0.CryptoJS.mode.ECB, padding: Proxy0.CryptoJS.pad.Pkcs7})).toString();
  }

  static aesEncrypt(plainText, salt = Crypto0.DEFAULT_SALT) {
    return Proxy0.CryptoJS.AES.encrypt(Proxy0.CryptoJS.enc.Utf8.parse(plainText), Proxy0.CryptoJS.enc.Utf8.parse(salt), {mode: Proxy0.CryptoJS.mode.ECB, padding: Proxy0.CryptoJS.pad.Pkcs7}).toString();
  }
}
