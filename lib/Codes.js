'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SK = require('./SK');

var _SK2 = _interopRequireDefault(_SK);

var _Mesgs = require('./Mesgs');

var _Mesgs2 = _interopRequireDefault(_Mesgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Codes = function () {
  function Codes() {
    _classCallCheck(this, Codes);
  }

  _createClass(Codes, null, [{
    key: 'get',
    //current language hash

    value: function get(code, path) {
      var validPath = _SK2.default.getValidPath(path ? path : _SK2.default.getCurrentPath());
      var validPaths = Codes.getSubPaths(validPath, false);
      for (var i = 0; i < validPaths.length; i++) {
        var validPathsCode0 = Codes.codes[validPaths[i]];
        if (validPathsCode0) {
          var validPathsCodes = _SK2.default.s4a(validPathsCode0.skVal(code));
          if (validPathsCodes.length !== 0) {
            return validPathsCodes;
          }
        }
      }
      return [];
    }
  }, {
    key: 'getSubPaths',
    value: function getSubPaths(path, justUnExisted) {
      return justUnExisted ? _lodash2.default.difference(_SK2.default.getSubPaths(path), Object.keys(Codes.codes)) : _SK2.default.getSubPaths(path);
    }
  }, {
    key: 'load',
    value: function load(path) {
      if (Codes.codes[path]) {
        return _jquery2.default.when(Codes.codes[path]);
      } else {
        if (_jquery2.default.isEmptyObject(Codes.hash)) {
          var deferred = _jquery2.default.Deferred();
          Codes.loadHash().done(function () {
            Codes.load(path).always(function () {
              deferred.resolve();
            });
          }).fail(function () {
            Codes.hash.env = _SK2.default.ENV_DEV;
            _jquery2.default.ajax({
              cache: false,
              dataType: _SK2.default.FILE_TYPE_JSON,
              method: _SK2.default.REQUEST_METHOD_GET,
              url: _SK2.default.CONTEXT_PATH + Codes.PATH_PREFIX + _SK2.default.CHAR_UNDERLINE + _SK2.default.getCurrentLanguage() + _SK2.default.FILE_TYPE_JSON_WITH_POINT
            }).done(function ($resp) {
              _Mesgs2.default.jsonNodeParser($resp, _SK2.default.EMPTY, Codes.codes);
            }).always(function () {
              deferred.resolve();
            });
          });
          return deferred;
        } else {
          return _jquery2.default.when.apply(_jquery2.default, Codes.getSubPaths(path, true).filter(function (validPath) {
            return Codes.hash[validPath];
          }).map(function (validPath) {
            return _jquery2.default.ajax({
              cache: true,
              dataType: _SK2.default.FILE_TYPE_JSON,
              method: _SK2.default.REQUEST_METHOD_GET,
              url: _SK2.default.CONTEXT_PATH + Codes.PATH_PREFIX + validPath + Codes.hash[validPath] + _SK2.default.CHAR_UNDERLINE + _SK2.default.getCurrentLanguage() + _SK2.default.FILE_TYPE_JSON_WITH_POINT
            }).done(function ($resp) {
              Codes.codes[validPath] = $resp;
            });
          }));
        }
      }
    }
  }, {
    key: 'loadHash',
    value: function loadHash() {
      return _jquery2.default.ajax({
        cache: false,
        dataType: _SK2.default.FILE_TYPE_JSON,
        method: _SK2.default.REQUEST_METHOD_GET,
        url: Codes.SERVER_URL + Codes.PATH_PREFIX + _Mesgs2.default.PART_OF_HASH_PATH + _SK2.default.getCurrentLanguage() + _SK2.default.FILE_TYPE_JSON_WITH_POINT
      }).done(function ($resp) {
        Codes.hash = $resp;
      });
    }
  }, {
    key: 'unload',
    value: function unload(path) {
      if (Object.keys(Codes.codes).filter(function ($existPath) {
        return $existPath.indexOf(path) !== -1;
      }).length === 1) {
        delete Codes.codes[path];
      }
    }
  }]);

  return Codes;
}();

Codes.codes = {};
Codes.hash = {};
Codes.PATH_PREFIX = '/json/codes';
Codes.SERVER_URL = '';
exports.default = Codes;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvZGVzLmpzIl0sIm5hbWVzIjpbIkNvZGVzIiwiY29kZSIsInBhdGgiLCJ2YWxpZFBhdGgiLCJnZXRWYWxpZFBhdGgiLCJnZXRDdXJyZW50UGF0aCIsInZhbGlkUGF0aHMiLCJnZXRTdWJQYXRocyIsImkiLCJsZW5ndGgiLCJ2YWxpZFBhdGhzQ29kZTAiLCJjb2RlcyIsInZhbGlkUGF0aHNDb2RlcyIsInM0YSIsInNrVmFsIiwianVzdFVuRXhpc3RlZCIsImRpZmZlcmVuY2UiLCJPYmplY3QiLCJrZXlzIiwid2hlbiIsImlzRW1wdHlPYmplY3QiLCJoYXNoIiwiZGVmZXJyZWQiLCJEZWZlcnJlZCIsImxvYWRIYXNoIiwiZG9uZSIsImxvYWQiLCJhbHdheXMiLCJyZXNvbHZlIiwiZmFpbCIsImVudiIsIkVOVl9ERVYiLCJhamF4IiwiY2FjaGUiLCJkYXRhVHlwZSIsIkZJTEVfVFlQRV9KU09OIiwibWV0aG9kIiwiUkVRVUVTVF9NRVRIT0RfR0VUIiwidXJsIiwiQ09OVEVYVF9QQVRIIiwiUEFUSF9QUkVGSVgiLCJDSEFSX1VOREVSTElORSIsImdldEN1cnJlbnRMYW5ndWFnZSIsIkZJTEVfVFlQRV9KU09OX1dJVEhfUE9JTlQiLCJqc29uTm9kZVBhcnNlciIsIiRyZXNwIiwiRU1QVFkiLCJhcHBseSIsImZpbHRlciIsIm1hcCIsIlNFUlZFUl9VUkwiLCJQQVJUX09GX0hBU0hfUEFUSCIsIiRleGlzdFBhdGgiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsSzs7Ozs7OztBQUVGOzt3QkFLTkMsSSxFQUFNQyxJLEVBQU07QUFDckIsVUFBSUMsWUFBWSxhQUFHQyxZQUFILENBQWdCRixPQUFPQSxJQUFQLEdBQWMsYUFBR0csY0FBSCxFQUE5QixDQUFoQjtBQUNBLFVBQUlDLGFBQWFOLE1BQU1PLFdBQU4sQ0FBa0JKLFNBQWxCLEVBQTZCLEtBQTdCLENBQWpCO0FBQ0EsV0FB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QUFOLENBQVlSLFNBQVosSUFBeUIwQyxLQUF6QjtBQUNELGFBUE0sQ0FBUDtBQVFELFdBWHNCLENBQWhCLENBQVA7QUFZRDtBQUNGO0FBQ0Y7OzsrQkFFaUI7QUFDaEIsYUFBTyxpQkFBRWIsSUFBRixDQUFPO0FBQ1pDLGVBQU8sS0FESztBQUVaQyxrQkFBVSxhQUFHQyxjQUZEO0FBR1pDLGdCQUFRLGFBQUdDLGtCQUhDO0FBSVpDLGFBQUt0QyxNQUFNa0QsVUFBTixHQUFtQmxELE1BQU13QyxXQUF6QixHQUF1QyxnQkFBTVcsaUJBQTdDLEdBQWlFLGFBQUdULGtCQUFILEVBQWpFLEdBQTJGLGFBQUdDO0FBSnZGLE9BQVAsRUFLSmxCLElBTEksQ0FLQyxpQkFBUztBQUNmekIsY0FBTXFCLElBQU4sR0FBYXdCLEtBQWI7QUFDRCxPQVBNLENBQVA7QUFRRDs7OzJCQUVhM0MsSSxFQUFNO0FBQ2xCLFVBQUllLE9BQU9DLElBQVAsQ0FBWWxCLE1BQU1XLEtBQWxCLEVBQXlCcUMsTUFBekIsQ0FBZ0Msc0JBQWM7QUFDOUMsZUFBT0ksV0FBV0MsT0FBWCxDQUFtQm5ELElBQW5CLE1BQTZCLENBQUMsQ0FBckM7QUFDRCxPQUZDLEVBRUNPLE1BRkQsS0FFWSxDQUZoQixFQUVtQjtBQUNqQixlQUFPVCxNQUFNVyxLQUFOLENBQVlULElBQVosQ0FBUDtBQUNEO0FBQ0Y7Ozs7OztBQXBGa0JGLEssQ0FDWlcsSyxHQUFRLEU7QUFESVgsSyxDQUVacUIsSSxHQUFPLEU7QUFGS3JCLEssQ0FJWndDLFcsR0FBYyxhO0FBSkZ4QyxLLENBS1prRCxVLEdBQWEsRTtrQkFMRGxELEsiLCJmaWxlIjoiQ29kZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBTSyBmcm9tICcuL1NLJztcbmltcG9ydCBNZXNncyBmcm9tICcuL01lc2dzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29kZXMge1xuICBzdGF0aWMgY29kZXMgPSB7fTtcbiAgc3RhdGljIGhhc2ggPSB7fTsvL2N1cnJlbnQgbGFuZ3VhZ2UgaGFzaFxuXG4gIHN0YXRpYyBQQVRIX1BSRUZJWCA9ICcvanNvbi9jb2Rlcyc7XG4gIHN0YXRpYyBTRVJWRVJfVVJMID0gJyc7XG5cbiAgc3RhdGljIGdldChjb2RlLCBwYXRoKSB7XG4gICAgbGV0IHZhbGlkUGF0aCA9IFNLLmdldFZhbGlkUGF0aChwYXRoID8gcGF0aCA6IFNLLmdldEN1cnJlbnRQYXRoKCkpO1xuICAgIGxldCB2YWxpZFBhdGhzID0gQ29kZXMuZ2V0U3ViUGF0aHModmFsaWRQYXRoLCBmYWxzZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWxpZFBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdmFsaWRQYXRoc0NvZGUwID0gQ29kZXMuY29kZXNbdmFsaWRQYXRoc1tpXV07XG4gICAgICBpZiAodmFsaWRQYXRoc0NvZGUwKSB7XG4gICAgICAgIGxldCB2YWxpZFBhdGhzQ29kZXMgPSBTSy5zNGEodmFsaWRQYXRoc0NvZGUwLnNrVmFsKGNvZGUpKTtcbiAgICAgICAgaWYgKHZhbGlkUGF0aHNDb2Rlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdmFsaWRQYXRoc0NvZGVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRTdWJQYXRocyhwYXRoLCBqdXN0VW5FeGlzdGVkKSB7XG4gICAgcmV0dXJuIGp1c3RVbkV4aXN0ZWQgPyBfLmRpZmZlcmVuY2UoU0suZ2V0U3ViUGF0aHMocGF0aCksIE9iamVjdC5rZXlzKENvZGVzLmNvZGVzKSkgOiBTSy5nZXRTdWJQYXRocyhwYXRoKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkKHBhdGgpIHtcbiAgICBpZiAoQ29kZXMuY29kZXNbcGF0aF0pIHtcbiAgICAgIHJldHVybiAkLndoZW4oQ29kZXMuY29kZXNbcGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoJC5pc0VtcHR5T2JqZWN0KENvZGVzLmhhc2gpKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgQ29kZXMubG9hZEhhc2goKS5kb25lKCgpID0+IHtcbiAgICAgICAgICBDb2Rlcy5sb2FkKHBhdGgpLmFsd2F5cygoKSA9PiB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgICAgIENvZGVzLmhhc2guZW52ID0gU0suRU5WX0RFVjtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFNLLkZJTEVfVFlQRV9KU09OLFxuICAgICAgICAgICAgbWV0aG9kOiBTSy5SRVFVRVNUX01FVEhPRF9HRVQsXG4gICAgICAgICAgICB1cmw6IFNLLkNPTlRFWFRfUEFUSCArIENvZGVzLlBBVEhfUFJFRklYICsgU0suQ0hBUl9VTkRFUkxJTkUgKyBTSy5nZXRDdXJyZW50TGFuZ3VhZ2UoKSArIFNLLkZJTEVfVFlQRV9KU09OX1dJVEhfUE9JTlRcbiAgICAgICAgICB9KS5kb25lKCRyZXNwID0+IHtcbiAgICAgICAgICAgIE1lc2dzLmpzb25Ob2RlUGFyc2VyKCRyZXNwLCBTSy5FTVBUWSwgQ29kZXMuY29kZXMpO1xuICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJC53aGVuLmFwcGx5KCQsIENvZGVzLmdldFN1YlBhdGhzKHBhdGgsIHRydWUpLmZpbHRlcih2YWxpZFBhdGggPT4ge1xuICAgICAgICAgIHJldHVybiBDb2Rlcy5oYXNoW3ZhbGlkUGF0aF07XG4gICAgICAgIH0pLm1hcCh2YWxpZFBhdGggPT4ge1xuICAgICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBkYXRhVHlwZTogU0suRklMRV9UWVBFX0pTT04sXG4gICAgICAgICAgICBtZXRob2Q6IFNLLlJFUVVFU1RfTUVUSE9EX0dFVCxcbiAgICAgICAgICAgIHVybDogU0suQ09OVEVYVF9QQVRIICsgQ29kZXMuUEFUSF9QUkVGSVggKyB2YWxpZFBhdGggKyBDb2Rlcy5oYXNoW3ZhbGlkUGF0aF0gKyBTSy5DSEFSX1VOREVSTElORSArIFNLLmdldEN1cnJlbnRMYW5ndWFnZSgpICsgU0suRklMRV9UWVBFX0pTT05fV0lUSF9QT0lOVFxuICAgICAgICAgIH0pLmRvbmUoJHJlc3AgPT4ge1xuICAgICAgICAgICAgQ29kZXMuY29kZXNbdmFsaWRQYXRoXSA9ICRyZXNwO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGxvYWRIYXNoKCkge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YVR5cGU6IFNLLkZJTEVfVFlQRV9KU09OLFxuICAgICAgbWV0aG9kOiBTSy5SRVFVRVNUX01FVEhPRF9HRVQsXG4gICAgICB1cmw6IENvZGVzLlNFUlZFUl9VUkwgKyBDb2Rlcy5QQVRIX1BSRUZJWCArIE1lc2dzLlBBUlRfT0ZfSEFTSF9QQVRIICsgU0suZ2V0Q3VycmVudExhbmd1YWdlKCkgKyBTSy5GSUxFX1RZUEVfSlNPTl9XSVRIX1BPSU5UXG4gICAgfSkuZG9uZSgkcmVzcCA9PiB7XG4gICAgICBDb2Rlcy5oYXNoID0gJHJlc3A7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdW5sb2FkKHBhdGgpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoQ29kZXMuY29kZXMpLmZpbHRlcigkZXhpc3RQYXRoID0+IHtcbiAgICAgICAgcmV0dXJuICRleGlzdFBhdGguaW5kZXhPZihwYXRoKSAhPT0gLTE7XG4gICAgICB9KS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRlbGV0ZSBDb2Rlcy5jb2Rlc1twYXRoXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==