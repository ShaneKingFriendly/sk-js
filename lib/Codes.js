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