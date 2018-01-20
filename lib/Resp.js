'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _RespMesg = require('./RespMesg');

var _RespMesg2 = _interopRequireDefault(_RespMesg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resp = function Resp(respJsonData) {
  _classCallCheck(this, Resp);

  this.data = respJsonData.data; //Business Data
  this.done = respJsonData.done; //true: No Unknown Exception,false: has Unknown Exception
  if (_lodash2.default.isPlainObject(respJsonData.mesg) && !_lodash2.default.isEmpty(respJsonData.mesg)) {
    //Result Message Object, Required if done is false
    this.mesg = new _RespMesg2.default(respJsonData.mesg);
  }
};

exports.default = Resp;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlc3AuanMiXSwibmFtZXMiOlsiUmVzcCIsInJlc3BKc29uRGF0YSIsImRhdGEiLCJkb25lIiwiaXNQbGFpbk9iamVjdCIsIm1lc2ciLCJpc0VtcHR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsSSxHQUNuQixjQUFZQyxZQUFaLEVBQTBCO0FBQUE7O0FBQ3hCLE9BQUtDLElBQUwsR0FBWUQsYUFBYUMsSUFBekIsQ0FEd0IsQ0FDTTtBQUM5QixPQUFLQyxJQUFMLEdBQVlGLGFBQWFFLElBQXpCLENBRndCLENBRU07QUFDOUIsTUFBSSxpQkFBRUMsYUFBRixDQUFnQkgsYUFBYUksSUFBN0IsS0FBc0MsQ0FBQyxpQkFBRUMsT0FBRixDQUFVTCxhQUFhSSxJQUF2QixDQUEzQyxFQUF5RTtBQUFDO0FBQ3hFLFNBQUtBLElBQUwsR0FBWSx1QkFBYUosYUFBYUksSUFBMUIsQ0FBWjtBQUNEO0FBQ0YsQzs7a0JBUGtCTCxJIiwiZmlsZSI6IlJlc3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFJlc3BNZXNnIGZyb20gJy4vUmVzcE1lc2cnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwIHtcbiAgY29uc3RydWN0b3IocmVzcEpzb25EYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gcmVzcEpzb25EYXRhLmRhdGE7Ly9CdXNpbmVzcyBEYXRhXG4gICAgdGhpcy5kb25lID0gcmVzcEpzb25EYXRhLmRvbmU7Ly90cnVlOiBObyBVbmtub3duIEV4Y2VwdGlvbixmYWxzZTogaGFzIFVua25vd24gRXhjZXB0aW9uXG4gICAgaWYgKF8uaXNQbGFpbk9iamVjdChyZXNwSnNvbkRhdGEubWVzZykgJiYgIV8uaXNFbXB0eShyZXNwSnNvbkRhdGEubWVzZykpIHsvL1Jlc3VsdCBNZXNzYWdlIE9iamVjdCwgUmVxdWlyZWQgaWYgZG9uZSBpcyBmYWxzZVxuICAgICAgdGhpcy5tZXNnID0gbmV3IFJlc3BNZXNnKHJlc3BKc29uRGF0YS5tZXNnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==