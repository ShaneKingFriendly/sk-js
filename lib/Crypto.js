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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyeXB0by5qcyJdLCJuYW1lcyI6WyJTS0NyeXB0byIsImNpcGhlclRleHQiLCJzYWx0IiwiREVGQVVMVF9TQUxUIiwiaXYiLCJzdWJzdHIiLCJsZW5ndGgiLCJwYXNzUGhyYXNlIiwiaXRlcmF0aW9ucyIsImtleVNpemUiLCJBRVMiLCJkZWNyeXB0IiwibGliIiwiQ2lwaGVyUGFyYW1zIiwiY3JlYXRlIiwiY2lwaGVydGV4dCIsImVuYyIsIkJhc2U2NCIsInBhcnNlIiwiUEJLREYyIiwiSGV4IiwidG9TdHJpbmciLCJVdGY4IiwicGxhaW5UZXh0IiwiZW5jcnlwdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7K0JBSURDLFUsRUFBNko7QUFBQSxVQUFqSkMsSUFBaUosdUVBQTFJRixTQUFTRyxZQUFpSTtBQUFBLFVBQW5IQyxFQUFtSCx1RUFBOUdGLEtBQUtHLE1BQUwsQ0FBWSxDQUFaLEVBQWVILEtBQUtJLE1BQUwsR0FBYyxDQUE3QixDQUE4RztBQUFBLFVBQTdFQyxVQUE2RSx1RUFBaEVMLElBQWdFO0FBQUEsVUFBMURNLFVBQTBELHVFQUE3Q04sS0FBS0ksTUFBd0M7QUFBQSxVQUFoQ0csT0FBZ0MsdUVBQXRCUCxLQUFLSSxNQUFMLEdBQWMsQ0FBZCxHQUFrQixFQUFJOztBQUM3SyxhQUFPLG1CQUFTSSxHQUFULENBQWFDLE9BQWIsQ0FDTCxtQkFBU0MsR0FBVCxDQUFhQyxZQUFiLENBQTBCQyxNQUExQixDQUFpQztBQUMvQkMsb0JBQVksbUJBQVNDLEdBQVQsQ0FBYUMsTUFBYixDQUFvQkMsS0FBcEIsQ0FBMEJqQixVQUExQjtBQURtQixPQUFqQyxDQURLLEVBSUwsbUJBQVNrQixNQUFULENBQ0VaLFVBREYsRUFFRSxtQkFBU1MsR0FBVCxDQUFhSSxHQUFiLENBQWlCRixLQUFqQixDQUF1QmhCLElBQXZCLENBRkYsRUFHRSxFQUFDTSxZQUFZQSxVQUFiLEVBQXlCQyxTQUFTQSxPQUFsQyxFQUhGLENBSkssRUFRTCxFQUFDTCxJQUFJLG1CQUFTWSxHQUFULENBQWFJLEdBQWIsQ0FBaUJGLEtBQWpCLENBQXVCZCxFQUF2QixDQUFMLEVBUkssRUFRNkJpQixRQVI3QixDQVFzQyxtQkFBU0wsR0FBVCxDQUFhTSxJQVJuRCxDQUFQO0FBU0Q7QUFiRDs7OzsrQkFla0JDLFMsRUFBNEo7QUFBQSxVQUFqSnJCLElBQWlKLHVFQUExSUYsU0FBU0csWUFBaUk7QUFBQSxVQUFuSEMsRUFBbUgsdUVBQTlHRixLQUFLRyxNQUFMLENBQVksQ0FBWixFQUFlSCxLQUFLSSxNQUFMLEdBQWMsQ0FBN0IsQ0FBOEc7QUFBQSxVQUE3RUMsVUFBNkUsdUVBQWhFTCxJQUFnRTtBQUFBLFVBQTFETSxVQUEwRCx1RUFBN0NOLEtBQUtJLE1BQXdDO0FBQUEsVUFBaENHLE9BQWdDLHVFQUF0QlAsS0FBS0ksTUFBTCxHQUFjLENBQWQsR0FBa0IsRUFBSTs7QUFDNUssYUFBTyxtQkFBU0ksR0FBVCxDQUFhYyxPQUFiLENBQ0xELFNBREssRUFFTCxtQkFBU0osTUFBVCxDQUNFWixVQURGLEVBRUUsbUJBQVNTLEdBQVQsQ0FBYUksR0FBYixDQUFpQkYsS0FBakIsQ0FBdUJoQixJQUF2QixDQUZGLEVBR0UsRUFBQ00sWUFBWUEsVUFBYixFQUF5QkMsU0FBU0EsT0FBbEMsRUFIRixDQUZLLEVBTUwsRUFBQ0wsSUFBSSxtQkFBU1ksR0FBVCxDQUFhSSxHQUFiLENBQWlCRixLQUFqQixDQUF1QmQsRUFBdkIsQ0FBTCxFQU5LLEVBTTZCVyxVQU43QixDQU13Q00sUUFOeEMsQ0FNaUQsbUJBQVNMLEdBQVQsQ0FBYUMsTUFOOUQsQ0FBUDtBQU9EOzs7Ozs7QUF4QmtCakIsUSxDQUVaRyxZLEdBQWUsa0U7a0JBRkhILFEiLCJmaWxlIjoiQ3J5cHRvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENyeXB0b0pTIGZyb20gJ2NyeXB0by1qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNLQ3J5cHRvIHtcbiAgLy9UaGlzSXNTaXhGb3VyQml0U2FsdEZvclNoYW5lS2luZ1xuICBzdGF0aWMgREVGQVVMVF9TQUxUID0gJzU0Njg2OTczNDk3MzUzNjk3ODQ2NkY3NTcyNDI2OTc0NTM2MTZDNzQ0NjZGNzI1MzY4NjE2RTY1NEI2OTZFNjcnO1xuXG4gIHN0YXRpYyBhZXNEZWNyeXB0KGNpcGhlclRleHQsIHNhbHQgPSBTS0NyeXB0by5ERUZBVUxUX1NBTFQsIGl2ID0gc2FsdC5zdWJzdHIoMCwgc2FsdC5sZW5ndGggLyAyKSwgcGFzc1BocmFzZSA9IHNhbHQsIGl0ZXJhdGlvbnMgPSBzYWx0Lmxlbmd0aCwga2V5U2l6ZSA9IHNhbHQubGVuZ3RoICogMiAvIDMyKSB7XG4gICAgcmV0dXJuIENyeXB0b0pTLkFFUy5kZWNyeXB0KFxuICAgICAgQ3J5cHRvSlMubGliLkNpcGhlclBhcmFtcy5jcmVhdGUoe1xuICAgICAgICBjaXBoZXJ0ZXh0OiBDcnlwdG9KUy5lbmMuQmFzZTY0LnBhcnNlKGNpcGhlclRleHQpXG4gICAgICB9KSxcbiAgICAgIENyeXB0b0pTLlBCS0RGMihcbiAgICAgICAgcGFzc1BocmFzZSxcbiAgICAgICAgQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShzYWx0KSxcbiAgICAgICAge2l0ZXJhdGlvbnM6IGl0ZXJhdGlvbnMsIGtleVNpemU6IGtleVNpemV9KSxcbiAgICAgIHtpdjogQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShpdil9KS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG4gIH1cblxuICBzdGF0aWMgYWVzRW5jcnlwdChwbGFpblRleHQsIHNhbHQgPSBTS0NyeXB0by5ERUZBVUxUX1NBTFQsIGl2ID0gc2FsdC5zdWJzdHIoMCwgc2FsdC5sZW5ndGggLyAyKSwgcGFzc1BocmFzZSA9IHNhbHQsIGl0ZXJhdGlvbnMgPSBzYWx0Lmxlbmd0aCwga2V5U2l6ZSA9IHNhbHQubGVuZ3RoICogMiAvIDMyKSB7XG4gICAgcmV0dXJuIENyeXB0b0pTLkFFUy5lbmNyeXB0KFxuICAgICAgcGxhaW5UZXh0LFxuICAgICAgQ3J5cHRvSlMuUEJLREYyKFxuICAgICAgICBwYXNzUGhyYXNlLFxuICAgICAgICBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKHNhbHQpLFxuICAgICAgICB7aXRlcmF0aW9uczogaXRlcmF0aW9ucywga2V5U2l6ZToga2V5U2l6ZX0pLFxuICAgICAge2l2OiBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGl2KX0pLmNpcGhlcnRleHQudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLkJhc2U2NCk7XG4gIH1cbn1cbiJdfQ==