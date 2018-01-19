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