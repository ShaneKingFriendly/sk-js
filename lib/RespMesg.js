'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Codes = require('./Codes');

var _Codes2 = _interopRequireDefault(_Codes);

var _Mesgs = require('./Mesgs');

var _Mesgs2 = _interopRequireDefault(_Mesgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RespMesg = function () {
  function RespMesg(mesg) {
    _classCallCheck(this, RespMesg);

    this.type = mesg.type; //Message Type
    this.code = mesg.code; //Message Code or Message Content
    this.args = mesg.args; //Message Arguments, Array or Object, format by skFmtArr or skFmt
  }

  _createClass(RespMesg, [{
    key: 'getMessage',
    value: function getMessage() {
      var key = _Mesgs2.default.RESP_MSG_KEY_PREFIX + this.code;
      var i18nMsg = _Mesgs2.default.get(key);
      var rtn = this.code;
      if (Array.isArray(this.args)) {
        rtn = i18nMsg.skFmtArr(this.args.map(function (arg) {
          var tmpRtn = null;
          if (_lodash2.default.isPlainObject(arg) && arg.code && arg.id) {
            tmpRtn = _Codes2.default.get(arg.code).find(function (item) {
              return item.id = arg.id;
            });
            tmpRtn = tmpRtn ? tmpRtn.text : arg;
          } else {
            tmpRtn = arg;
          }
          return tmpRtn;
        }));
      } else if (_lodash2.default.isPlainObject(this.args) && !_lodash2.default.isEmpty(this.args)) {
        rtn = i18nMsg.skFmt(this.args);
      } else if (i18nMsg !== key) {
        rtn = i18nMsg;
      }
      return rtn;
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }]);

  return RespMesg;
}();

RespMesg.TYPE = {
  SUCCESS: 'Success', //Just prompt
  INFO: 'Info', //Just prompt
  WARNING: 'Warning', //Business continue, but must prompt
  ERROR: 'Error' //Unknown Exception(done == false), UI will prompt details; Business Stop(done == true), process by component
};
exports.default = RespMesg;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlc3BNZXNnLmpzIl0sIm5hbWVzIjpbIlJlc3BNZXNnIiwibWVzZyIsInR5cGUiLCJjb2RlIiwiYXJncyIsImtleSIsIlJFU1BfTVNHX0tFWV9QUkVGSVgiLCJpMThuTXNnIiwiZ2V0IiwicnRuIiwiQXJyYXkiLCJpc0FycmF5Iiwic2tGbXRBcnIiLCJtYXAiLCJ0bXBSdG4iLCJpc1BsYWluT2JqZWN0IiwiYXJnIiwiaWQiLCJmaW5kIiwiaXRlbSIsInRleHQiLCJpc0VtcHR5Iiwic2tGbXQiLCJUWVBFIiwiU1VDQ0VTUyIsIklORk8iLCJXQVJOSU5HIiwiRVJST1IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsUTtBQVFuQixvQkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLQyxJQUFMLEdBQVlELEtBQUtDLElBQWpCLENBRGdCLENBQ007QUFDdEIsU0FBS0MsSUFBTCxHQUFZRixLQUFLRSxJQUFqQixDQUZnQixDQUVNO0FBQ3RCLFNBQUtDLElBQUwsR0FBWUgsS0FBS0csSUFBakIsQ0FIZ0IsQ0FHTTtBQUN2Qjs7OztpQ0FFWTtBQUNYLFVBQUlDLE1BQU0sZ0JBQU1DLG1CQUFOLEdBQTRCLEtBQUtILElBQTNDO0FBQ0EsVUFBSUksVUFBVSxnQkFBTUMsR0FBTixDQUFVSCxHQUFWLENBQWQ7QUFDQSxVQUFJSSxNQUFNLEtBQUtOLElBQWY7QUFDQSxVQUFJTyxNQUFNQyxPQUFOLENBQWMsS0FBS1AsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QkssY0FBTUYsUUFBUUssUUFBUixDQUFpQixLQUFLUixJQUFMLENBQVVTLEdBQVYsQ0FBYyxlQUFPO0FBQzFDLGNBQUlDLFNBQVMsSUFBYjtBQUNBLGNBQUksaUJBQUVDLGFBQUYsQ0FBZ0JDLEdBQWhCLEtBQXdCQSxJQUFJYixJQUE1QixJQUFvQ2EsSUFBSUMsRUFBNUMsRUFBZ0Q7QUFDOUNILHFCQUFTLGdCQUFNTixHQUFOLENBQVVRLElBQUliLElBQWQsRUFBb0JlLElBQXBCLENBQXlCLGdCQUFRO0FBQ3hDLHFCQUFPQyxLQUFLRixFQUFMLEdBQVVELElBQUlDLEVBQXJCO0FBQ0QsYUFGUSxDQUFUO0FBR0FILHFCQUFTQSxTQUFTQSxPQUFPTSxJQUFoQixHQUF1QkosR0FBaEM7QUFDRCxXQUxELE1BS087QUFDTEYscUJBQVNFLEdBQVQ7QUFDRDtBQUNELGlCQUFPRixNQUFQO0FBQ0QsU0FYc0IsQ0FBakIsQ0FBTjtBQVlELE9BYkQsTUFhTyxJQUFJLGlCQUFFQyxhQUFGLENBQWdCLEtBQUtYLElBQXJCLEtBQThCLENBQUMsaUJBQUVpQixPQUFGLENBQVUsS0FBS2pCLElBQWYsQ0FBbkMsRUFBeUQ7QUFDOURLLGNBQU1GLFFBQVFlLEtBQVIsQ0FBYyxLQUFLbEIsSUFBbkIsQ0FBTjtBQUNELE9BRk0sTUFFQSxJQUFJRyxZQUFZRixHQUFoQixFQUFxQjtBQUMxQkksY0FBTUYsT0FBTjtBQUNEO0FBQ0QsYUFBT0UsR0FBUDtBQUNEOzs7OEJBRVM7QUFDUixhQUFPLEtBQUtQLElBQVo7QUFDRDs7Ozs7O0FBekNrQkYsUSxDQUNadUIsSSxHQUFPO0FBQ1pDLFdBQVMsU0FERyxFQUNPO0FBQ25CQyxRQUFNLE1BRk0sRUFFQztBQUNiQyxXQUFTLFNBSEcsRUFHTztBQUNuQkMsU0FBTyxPQUpLLENBSUU7QUFKRixDO2tCQURLM0IsUSIsImZpbGUiOiJSZXNwTWVzZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQ29kZXMgZnJvbSAnLi9Db2Rlcyc7XG5pbXBvcnQgTWVzZ3MgZnJvbSAnLi9NZXNncyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BNZXNnIHtcbiAgc3RhdGljIFRZUEUgPSB7XG4gICAgU1VDQ0VTUzogJ1N1Y2Nlc3MnLC8vSnVzdCBwcm9tcHRcbiAgICBJTkZPOiAnSW5mbycsLy9KdXN0IHByb21wdFxuICAgIFdBUk5JTkc6ICdXYXJuaW5nJywvL0J1c2luZXNzIGNvbnRpbnVlLCBidXQgbXVzdCBwcm9tcHRcbiAgICBFUlJPUjogJ0Vycm9yJy8vVW5rbm93biBFeGNlcHRpb24oZG9uZSA9PSBmYWxzZSksIFVJIHdpbGwgcHJvbXB0IGRldGFpbHM7IEJ1c2luZXNzIFN0b3AoZG9uZSA9PSB0cnVlKSwgcHJvY2VzcyBieSBjb21wb25lbnRcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihtZXNnKSB7XG4gICAgdGhpcy50eXBlID0gbWVzZy50eXBlOy8vTWVzc2FnZSBUeXBlXG4gICAgdGhpcy5jb2RlID0gbWVzZy5jb2RlOy8vTWVzc2FnZSBDb2RlIG9yIE1lc3NhZ2UgQ29udGVudFxuICAgIHRoaXMuYXJncyA9IG1lc2cuYXJnczsvL01lc3NhZ2UgQXJndW1lbnRzLCBBcnJheSBvciBPYmplY3QsIGZvcm1hdCBieSBza0ZtdEFyciBvciBza0ZtdFxuICB9XG5cbiAgZ2V0TWVzc2FnZSgpIHtcbiAgICBsZXQga2V5ID0gTWVzZ3MuUkVTUF9NU0dfS0VZX1BSRUZJWCArIHRoaXMuY29kZTtcbiAgICBsZXQgaTE4bk1zZyA9IE1lc2dzLmdldChrZXkpO1xuICAgIGxldCBydG4gPSB0aGlzLmNvZGU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5hcmdzKSkge1xuICAgICAgcnRuID0gaTE4bk1zZy5za0ZtdEFycih0aGlzLmFyZ3MubWFwKGFyZyA9PiB7XG4gICAgICAgIGxldCB0bXBSdG4gPSBudWxsO1xuICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGFyZykgJiYgYXJnLmNvZGUgJiYgYXJnLmlkKSB7XG4gICAgICAgICAgdG1wUnRuID0gQ29kZXMuZ2V0KGFyZy5jb2RlKS5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPSBhcmcuaWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0bXBSdG4gPSB0bXBSdG4gPyB0bXBSdG4udGV4dCA6IGFyZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0bXBSdG4gPSBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRtcFJ0bjtcbiAgICAgIH0pKVxuICAgIH0gZWxzZSBpZiAoXy5pc1BsYWluT2JqZWN0KHRoaXMuYXJncykgJiYgIV8uaXNFbXB0eSh0aGlzLmFyZ3MpKSB7XG4gICAgICBydG4gPSBpMThuTXNnLnNrRm10KHRoaXMuYXJncyk7XG4gICAgfSBlbHNlIGlmIChpMThuTXNnICE9PSBrZXkpIHtcbiAgICAgIHJ0biA9IGkxOG5Nc2c7XG4gICAgfVxuICAgIHJldHVybiBydG47XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbn1cbiJdfQ==