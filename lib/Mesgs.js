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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mesgs = function () {
  function Mesgs() {
    _classCallCheck(this, Mesgs);
  }

  _createClass(Mesgs, null, [{
    key: 'get',
    //all

    value: function get(key, path) {
      var validPath = _SK2.default.getValidPath(path ? path : _SK2.default.getCurrentPath());
      var validPaths = Mesgs.getSubPaths(validPath, false);
      var rtn = _SK2.default.s4s(key);
      for (var i = 0; i < validPaths.length; i++) {
        var tmpRtn = _SK2.default.s4o(Mesgs.mesg[validPaths[i]]).skVal(key);
        if (!_lodash2.default.isNil(tmpRtn)) {
          rtn = tmpRtn;
          break;
        }
      }
      return rtn;
    } //current language hash

  }, {
    key: 'getResp',
    value: function getResp(key, path) {
      var tmpKey = Mesgs.RESP_MSG_KEY_PREFIX + key;
      var rtn = Mesgs.get(tmpKey, path);
      if (rtn === tmpKey) {
        rtn = Mesgs.get(key, path);
      }
      return rtn;
    }
  }, {
    key: 'getSubPaths',
    value: function getSubPaths(path, justUnExisted) {
      return justUnExisted ? _lodash2.default.difference(_SK2.default.getSubPaths(path), Object.keys(Mesgs.mesg)) : _SK2.default.getSubPaths(path);
    }

    /**
     *
     * @param jsonObject
     * @param existPath '' or '/path'
     * @param pathObjects
     */

  }, {
    key: 'jsonNodeParser',
    value: function jsonNodeParser(jsonObject, existPath, pathObjects) {
      var pathObject = {};
      Object.keys(jsonObject).forEach(function ($path) {
        if ($path === _SK2.default.CHAR_SLASH) {
          var rootObject = jsonObject[$path];
          Object.keys(rootObject).forEach(function (key) {
            pathObject[key] = rootObject[key];
          });
        } else if (_lodash2.default.endsWith($path, _SK2.default.CHAR_SLASH)) {
          pathObjects[existPath + (_lodash2.default.startsWith($path, _SK2.default.CHAR_SLASH) ? $path : _SK2.default.CHAR_SLASH + $path)] = jsonObject[$path];
        } else if (_lodash2.default.startsWith($path, _SK2.default.CHAR_SLASH)) {
          Mesgs.jsonNodeParser(jsonObject[$path], existPath + $path, pathObjects);
        } else {
          pathObject[$path] = jsonObject[$path];
        }
      });
      // if (Object.keys(pathObject).length > 0) {
      //   pathObjects[existPath + SK.STR_OF_CHAR_SLASH] = pathObject;
      // }
      //Always generate path
      pathObjects[existPath + _SK2.default.CHAR_SLASH] = pathObject;
    }

    /**
     *
     * @param path
     * @returns {*} Promise
     */

  }, {
    key: 'load',
    value: function load(path) {
      if (Mesgs.mesg[path]) {
        return _jquery2.default.when(Mesgs.mesg[path]);
      } else {
        if (_jquery2.default.isEmptyObject(Mesgs.hash)) {
          var $Deferred = _jquery2.default.Deferred();
          Mesgs.loadHash().done(function () {
            Mesgs.load(path).always(function () {
              $Deferred.resolve();
            });
          }).fail(function () {
            Mesgs.hash.env = _SK2.default.ENV_DEV;
            _jquery2.default.ajax({
              cache: false,
              dataType: _SK2.default.FILE_TYPE_JSON,
              method: _SK2.default.REQUEST_METHOD_GET,
              url: _SK2.default.CONTEXT_PATH + Mesgs.PATH_PREFIX + _SK2.default.CHAR_UNDERLINE + _SK2.default.getCurrentLanguage() + _SK2.default.FILE_TYPE_JSON_WITH_POINT
            }).done(function ($resp) {
              Mesgs.jsonNodeParser($resp, _SK2.default.EMPTY, Mesgs.mesg);
            }).always(function () {
              $Deferred.resolve();
            });
          });
          return $Deferred;
        } else {
          return _jquery2.default.when.apply(_jquery2.default, Mesgs.getSubPaths(path, true).filter(function (validPath) {
            return Mesgs.hash[validPath];
          }).map(function (validPath) {
            return _jquery2.default.ajax({
              cache: true,
              dataType: _SK2.default.FILE_TYPE_JSON,
              method: _SK2.default.REQUEST_METHOD_GET,
              url: _SK2.default.CONTEXT_PATH + Mesgs.PATH_PREFIX + validPath + Mesgs.hash[validPath] + _SK2.default.CHAR_UNDERLINE + _SK2.default.getCurrentLanguage() + _SK2.default.FILE_TYPE_JSON_WITH_POINT
            }).done(function ($resp) {
              Mesgs.mesg[validPath] = $resp;
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
        url: Mesgs.SERVER_URL + Mesgs.PATH_PREFIX + Mesgs.PART_OF_HASH_PATH + _SK2.default.getCurrentLanguage() + _SK2.default.FILE_TYPE_JSON_WITH_POINT
      }).done(function ($resp) {
        Mesgs.hash = $resp;
      });
    }
  }, {
    key: 'unload',
    value: function unload(path) {
      if (Object.keys(Mesgs.mesg).filter(function ($existPath) {
        return $existPath.indexOf(path) !== -1;
      }).length === 1) {
        delete Mesgs.mesg[path];
      }
    }
  }]);

  return Mesgs;
}();

Mesgs.hash = {};
Mesgs.mesg = {};
Mesgs.PART_OF_HASH_PATH = '_Hash_';
Mesgs.PATH_PREFIX = '/json/mesg';
Mesgs.RESP_MSG_KEY_PREFIX = 'Resp.';
Mesgs.SERVER_URL = '';
exports.default = Mesgs;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc2dzLmpzIl0sIm5hbWVzIjpbIk1lc2dzIiwia2V5IiwicGF0aCIsInZhbGlkUGF0aCIsImdldFZhbGlkUGF0aCIsImdldEN1cnJlbnRQYXRoIiwidmFsaWRQYXRocyIsImdldFN1YlBhdGhzIiwicnRuIiwiczRzIiwiaSIsImxlbmd0aCIsInRtcFJ0biIsInM0byIsIm1lc2ciLCJza1ZhbCIsImlzTmlsIiwidG1wS2V5IiwiUkVTUF9NU0dfS0VZX1BSRUZJWCIsImdldCIsImp1c3RVbkV4aXN0ZWQiLCJkaWZmZXJlbmNlIiwiT2JqZWN0Iiwia2V5cyIsImpzb25PYmplY3QiLCJleGlzdFBhdGgiLCJwYXRoT2JqZWN0cyIsInBhdGhPYmplY3QiLCJmb3JFYWNoIiwiJHBhdGgiLCJDSEFSX1NMQVNIIiwicm9vdE9iamVjdCIsImVuZHNXaXRoIiwic3RhcnRzV2l0aCIsImpzb25Ob2RlUGFyc2VyIiwid2hlbiIsImlzRW1wdHlPYmplY3QiLCJoYXNoIiwiJERlZmVycmVkIiwiRGVmZXJyZWQiLCJsb2FkSGFzaCIsImRvbmUiLCJsb2FkIiwiYWx3YXlzIiwicmVzb2x2ZSIsImZhaWwiLCJlbnYiLCJFTlZfREVWIiwiYWpheCIsImNhY2hlIiwiZGF0YVR5cGUiLCJGSUxFX1RZUEVfSlNPTiIsIm1ldGhvZCIsIlJFUVVFU1RfTUVUSE9EX0dFVCIsInVybCIsIkNPTlRFWFRfUEFUSCIsIlBBVEhfUFJFRklYIiwiQ0hBUl9VTkRFUkxJTkUiLCJnZXRDdXJyZW50TGFuZ3VhZ2UiLCJGSUxFX1RZUEVfSlNPTl9XSVRIX1BPSU5UIiwiJHJlc3AiLCJFTVBUWSIsImFwcGx5IiwiZmlsdGVyIiwibWFwIiwiU0VSVkVSX1VSTCIsIlBBUlRfT0ZfSEFTSF9QQVRIIiwiJGV4aXN0UGF0aCIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsSzs7Ozs7OztBQUVGOzt3QkFPTkMsRyxFQUFLQyxJLEVBQU07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O0FBaElrQkYsSyxDQUNacUMsSSxHQUFPLEU7QUFES3JDLEssQ0FFWmMsSSxHQUFPLEU7QUFGS2QsSyxDQUlaa0UsaUIsR0FBb0IsUTtBQUpSbEUsSyxDQUtad0QsVyxHQUFjLFk7QUFMRnhELEssQ0FNWmtCLG1CLEdBQXNCLE87QUFOVmxCLEssQ0FPWmlFLFUsR0FBYSxFO2tCQVBEakUsSyIsImZpbGUiOiJNZXNncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFNLIGZyb20gJy4vU0snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNncyB7XG4gIHN0YXRpYyBoYXNoID0ge307Ly9jdXJyZW50IGxhbmd1YWdlIGhhc2hcbiAgc3RhdGljIG1lc2cgPSB7fTsvL2FsbFxuXG4gIHN0YXRpYyBQQVJUX09GX0hBU0hfUEFUSCA9ICdfSGFzaF8nO1xuICBzdGF0aWMgUEFUSF9QUkVGSVggPSAnL2pzb24vbWVzZyc7XG4gIHN0YXRpYyBSRVNQX01TR19LRVlfUFJFRklYID0gJ1Jlc3AuJztcbiAgc3RhdGljIFNFUlZFUl9VUkwgPSAnJztcblxuICBzdGF0aWMgZ2V0KGtleSwgcGF0aCkge1xuICAgIGxldCB2YWxpZFBhdGggPSBTSy5nZXRWYWxpZFBhdGgocGF0aCA/IHBhdGggOiBTSy5nZXRDdXJyZW50UGF0aCgpKTtcbiAgICBsZXQgdmFsaWRQYXRocyA9IE1lc2dzLmdldFN1YlBhdGhzKHZhbGlkUGF0aCwgZmFsc2UpO1xuICAgIGxldCBydG4gPSBTSy5zNHMoa2V5KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbGlkUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXBSdG4gPSBTSy5zNG8oTWVzZ3MubWVzZ1t2YWxpZFBhdGhzW2ldXSkuc2tWYWwoa2V5KTtcbiAgICAgIGlmICghXy5pc05pbCh0bXBSdG4pKSB7XG4gICAgICAgIHJ0biA9IHRtcFJ0bjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydG47XG4gIH1cblxuICBzdGF0aWMgZ2V0UmVzcChrZXksIHBhdGgpIHtcbiAgICBsZXQgdG1wS2V5ID0gTWVzZ3MuUkVTUF9NU0dfS0VZX1BSRUZJWCArIGtleTtcbiAgICBsZXQgcnRuID0gTWVzZ3MuZ2V0KHRtcEtleSwgcGF0aCk7XG4gICAgaWYgKHJ0biA9PT0gdG1wS2V5KSB7XG4gICAgICBydG4gPSBNZXNncy5nZXQoa2V5LCBwYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ0bjtcbiAgfVxuXG4gIHN0YXRpYyBnZXRTdWJQYXRocyhwYXRoLCBqdXN0VW5FeGlzdGVkKSB7XG4gICAgcmV0dXJuIGp1c3RVbkV4aXN0ZWQgPyBfLmRpZmZlcmVuY2UoU0suZ2V0U3ViUGF0aHMocGF0aCksIE9iamVjdC5rZXlzKE1lc2dzLm1lc2cpKSA6IFNLLmdldFN1YlBhdGhzKHBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBqc29uT2JqZWN0XG4gICAqIEBwYXJhbSBleGlzdFBhdGggJycgb3IgJy9wYXRoJ1xuICAgKiBAcGFyYW0gcGF0aE9iamVjdHNcbiAgICovXG4gIHN0YXRpYyBqc29uTm9kZVBhcnNlcihqc29uT2JqZWN0LCBleGlzdFBhdGgsIHBhdGhPYmplY3RzKSB7XG4gICAgbGV0IHBhdGhPYmplY3QgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhqc29uT2JqZWN0KS5mb3JFYWNoKCRwYXRoID0+IHtcbiAgICAgIGlmICgkcGF0aCA9PT0gU0suQ0hBUl9TTEFTSCkge1xuICAgICAgICBsZXQgcm9vdE9iamVjdCA9IGpzb25PYmplY3RbJHBhdGhdO1xuICAgICAgICBPYmplY3Qua2V5cyhyb290T2JqZWN0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgcGF0aE9iamVjdFtrZXldID0gcm9vdE9iamVjdFtrZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXy5lbmRzV2l0aCgkcGF0aCwgU0suQ0hBUl9TTEFTSCkpIHtcbiAgICAgICAgcGF0aE9iamVjdHNbZXhpc3RQYXRoICsgKF8uc3RhcnRzV2l0aCgkcGF0aCwgU0suQ0hBUl9TTEFTSCkgPyAkcGF0aCA6IChTSy5DSEFSX1NMQVNIICsgJHBhdGgpKV0gPSBqc29uT2JqZWN0WyRwYXRoXTtcbiAgICAgIH0gZWxzZSBpZiAoXy5zdGFydHNXaXRoKCRwYXRoLCBTSy5DSEFSX1NMQVNIKSkge1xuICAgICAgICBNZXNncy5qc29uTm9kZVBhcnNlcihqc29uT2JqZWN0WyRwYXRoXSwgZXhpc3RQYXRoICsgJHBhdGgsIHBhdGhPYmplY3RzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGhPYmplY3RbJHBhdGhdID0ganNvbk9iamVjdFskcGF0aF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gaWYgKE9iamVjdC5rZXlzKHBhdGhPYmplY3QpLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgIHBhdGhPYmplY3RzW2V4aXN0UGF0aCArIFNLLlNUUl9PRl9DSEFSX1NMQVNIXSA9IHBhdGhPYmplY3Q7XG4gICAgLy8gfVxuICAgIC8vQWx3YXlzIGdlbmVyYXRlIHBhdGhcbiAgICBwYXRoT2JqZWN0c1tleGlzdFBhdGggKyBTSy5DSEFSX1NMQVNIXSA9IHBhdGhPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhdGhcbiAgICogQHJldHVybnMgeyp9IFByb21pc2VcbiAgICovXG4gIHN0YXRpYyBsb2FkKHBhdGgpIHtcbiAgICBpZiAoTWVzZ3MubWVzZ1twYXRoXSkge1xuICAgICAgcmV0dXJuICQud2hlbihNZXNncy5tZXNnW3BhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCQuaXNFbXB0eU9iamVjdChNZXNncy5oYXNoKSkge1xuICAgICAgICBsZXQgJERlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICBNZXNncy5sb2FkSGFzaCgpLmRvbmUoKCkgPT4ge1xuICAgICAgICAgIE1lc2dzLmxvYWQocGF0aCkuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgICAgICREZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgICAgIE1lc2dzLmhhc2guZW52ID0gU0suRU5WX0RFVjtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFNLLkZJTEVfVFlQRV9KU09OLFxuICAgICAgICAgICAgbWV0aG9kOiBTSy5SRVFVRVNUX01FVEhPRF9HRVQsXG4gICAgICAgICAgICB1cmw6IFNLLkNPTlRFWFRfUEFUSCArIE1lc2dzLlBBVEhfUFJFRklYICsgU0suQ0hBUl9VTkRFUkxJTkUgKyBTSy5nZXRDdXJyZW50TGFuZ3VhZ2UoKSArIFNLLkZJTEVfVFlQRV9KU09OX1dJVEhfUE9JTlRcbiAgICAgICAgICB9KS5kb25lKCRyZXNwID0+IHtcbiAgICAgICAgICAgIE1lc2dzLmpzb25Ob2RlUGFyc2VyKCRyZXNwLCBTSy5FTVBUWSwgTWVzZ3MubWVzZyk7XG4gICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgICAgICREZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gJERlZmVycmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICQud2hlbi5hcHBseSgkLCBNZXNncy5nZXRTdWJQYXRocyhwYXRoLCB0cnVlKS5maWx0ZXIodmFsaWRQYXRoID0+IHtcbiAgICAgICAgICByZXR1cm4gTWVzZ3MuaGFzaFt2YWxpZFBhdGhdO1xuICAgICAgICB9KS5tYXAodmFsaWRQYXRoID0+IHtcbiAgICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFNLLkZJTEVfVFlQRV9KU09OLFxuICAgICAgICAgICAgbWV0aG9kOiBTSy5SRVFVRVNUX01FVEhPRF9HRVQsXG4gICAgICAgICAgICB1cmw6IFNLLkNPTlRFWFRfUEFUSCArIE1lc2dzLlBBVEhfUFJFRklYICsgdmFsaWRQYXRoICsgTWVzZ3MuaGFzaFt2YWxpZFBhdGhdICsgU0suQ0hBUl9VTkRFUkxJTkUgKyBTSy5nZXRDdXJyZW50TGFuZ3VhZ2UoKSArIFNLLkZJTEVfVFlQRV9KU09OX1dJVEhfUE9JTlRcbiAgICAgICAgICB9KS5kb25lKCRyZXNwID0+IHtcbiAgICAgICAgICAgIE1lc2dzLm1lc2dbdmFsaWRQYXRoXSA9ICRyZXNwO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGxvYWRIYXNoKCkge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YVR5cGU6IFNLLkZJTEVfVFlQRV9KU09OLFxuICAgICAgbWV0aG9kOiBTSy5SRVFVRVNUX01FVEhPRF9HRVQsXG4gICAgICB1cmw6IE1lc2dzLlNFUlZFUl9VUkwgKyBNZXNncy5QQVRIX1BSRUZJWCArIE1lc2dzLlBBUlRfT0ZfSEFTSF9QQVRIICsgU0suZ2V0Q3VycmVudExhbmd1YWdlKCkgKyBTSy5GSUxFX1RZUEVfSlNPTl9XSVRIX1BPSU5UXG4gICAgfSkuZG9uZSgkcmVzcCA9PiB7XG4gICAgICBNZXNncy5oYXNoID0gJHJlc3A7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdW5sb2FkKHBhdGgpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoTWVzZ3MubWVzZykuZmlsdGVyKCRleGlzdFBhdGggPT4ge1xuICAgICAgICByZXR1cm4gJGV4aXN0UGF0aC5pbmRleE9mKHBhdGgpICE9PSAtMTtcbiAgICAgIH0pLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZGVsZXRlIE1lc2dzLm1lc2dbcGF0aF07XG4gICAgfVxuICB9XG59XG4iXX0=