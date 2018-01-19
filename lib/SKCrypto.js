'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SKCrypto = function () {
  function SKCrypto() {
    _classCallCheck(this, SKCrypto);
  }

  _createClass(SKCrypto, null, [{
    key: 'aesDecrypt',
    value: function aesDecrypt(cipherText) {
      var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SKCrypto.DEFAULT_SALT;
      var iv = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : salt.substr(0, salt.length / 2);
      var passPhrase = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : salt;
      var iterations = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : salt.length;
      var keySize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : salt.length * 2 / 32;

      return _cryptoJs2.default.AES.decrypt(_cryptoJs2.default.lib.CipherParams.create({
        ciphertext: _cryptoJs2.default.enc.Base64.parse(cipherText)
      }), _cryptoJs2.default.PBKDF2(passPhrase, _cryptoJs2.default.enc.Hex.parse(salt), { iterations: iterations, keySize: keySize }), { iv: _cryptoJs2.default.enc.Hex.parse(iv) }).toString(_cryptoJs2.default.enc.Utf8);
    }
    //ThisIsSixFourBitSaltForShaneKing

  }, {
    key: 'aesEncrypt',
    value: function aesEncrypt(plainText) {
      var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SKCrypto.DEFAULT_SALT;
      var iv = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : salt.substr(0, salt.length / 2);
      var passPhrase = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : salt;
      var iterations = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : salt.length;
      var keySize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : salt.length * 2 / 32;

      return _cryptoJs2.default.AES.encrypt(plainText, _cryptoJs2.default.PBKDF2(passPhrase, _cryptoJs2.default.enc.Hex.parse(salt), { iterations: iterations, keySize: keySize }), { iv: _cryptoJs2.default.enc.Hex.parse(iv) }).ciphertext.toString(_cryptoJs2.default.enc.Base64);
    }
  }]);

  return SKCrypto;
}();

SKCrypto.DEFAULT_SALT = '546869734973536978466F757242697453616C74466F725368616E654B696E67';
exports.default = SKCrypto;
module.exports = exports['default'];