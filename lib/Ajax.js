'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _SK = require('./SK');

var _SK2 = _interopRequireDefault(_SK);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, null, [{
    key: 'getDefaultSettings',
    value: function getDefaultSettings() {
      return {
        contentType: Ajax.CONTENT_JSON_UTF_8,
        dataType: _SK2.default.FILE_TYPE_JSON,
        // processData: false,
        // traditional: true,
        needStringify: true,
        progress: true, //sk extend jquery
        async: true //sk extend jquery
      };
    }
  }, {
    key: 'doAjax',
    value: function doAjax(settings) {
      if (settings.progress) {
        if (Ajax.CURRENT_PROGRESS_COUNT === 0) {
          _nprogress2.default.start();
        }
        Ajax.CURRENT_PROGRESS_COUNT++;
      }
      if (!settings.async) {
        if (Ajax.CURRENT_SYNC_COUNT === 0) {
          if (_SK2.default.$(_Model2.default.PROP_SYS) instanceof _Model2.default) {
            _SK2.default.$(_Model2.default.PROP_SYS).skVal('ui.spinning', true);
          }
        }
        Ajax.CURRENT_SYNC_COUNT++;
      }
      settings.data = settings.data && settings.needStringify ? JSON.stringify(settings.data) : settings.data;
      try {
        return _jquery2.default.ajax(settings).done(function (data, textStatus, jqXHR) {
          if (_lodash2.default.isFunction(settings.doneFunc)) {
            settings.doneFunc(data, textStatus, jqXHR);
          }
        }).fail(function (jqXHR, textStatus, errorThrown) {
          console.error(jqXHR);
          console.error(textStatus);
          console.error(errorThrown);
          if (_lodash2.default.isFunction(settings.failFunc)) {
            settings.failFunc(jqXHR, textStatus, errorThrown);
          }
        }).always(function () {
          if (settings.progress) {
            Ajax.CURRENT_PROGRESS_COUNT--;
            if (Ajax.CURRENT_PROGRESS_COUNT === 0) {
              _nprogress2.default.done();
            } else {
              _nprogress2.default.inc();
            }
          }
          if (!settings.async) {
            Ajax.CURRENT_SYNC_COUNT--;
            if (Ajax.CURRENT_SYNC_COUNT === 0) {
              if (_SK2.default.$(_Model2.default.PROP_SYS) instanceof _Model2.default) {
                _SK2.default.$(_Model2.default.PROP_SYS).skVal('ui.spinning', false);
              }
            }
          }
        });
      } catch (exception) {
        console.error(exception);
      }
    }
  }, {
    key: 'doDelete',
    value: function doDelete(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return Ajax.doAjax(_SK2.default.assign({}, Ajax.getDefaultSettings(), { url: url }, { data: data }, { method: Ajax.METHOD.DELETE }, options));
    }
  }, {
    key: 'doGet',
    value: function doGet(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return Ajax.doAjax(_SK2.default.assign({}, Ajax.getDefaultSettings(), { url: url }, { data: data }, { method: Ajax.METHOD.GET }, options));
    }
  }, {
    key: 'doPost',
    value: function doPost(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return Ajax.doAjax(_SK2.default.assign({}, Ajax.getDefaultSettings(), { url: url }, { data: data }, { method: Ajax.METHOD.POST }, options));
    }
  }, {
    key: 'doPut',
    value: function doPut(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return Ajax.doAjax(_SK2.default.assign({}, Ajax.getDefaultSettings(), { url: url }, { data: data }, { method: Ajax.METHOD.PUT }, options));
    }
  }]);

  return Ajax;
}();

Ajax.METHOD = {
  DELETE: _SK2.default.REQUEST_METHOD_DELETE,
  GET: _SK2.default.REQUEST_METHOD_GET,
  POST: _SK2.default.REQUEST_METHOD_POST,
  PUT: _SK2.default.REQUEST_METHOD_PUT
};
Ajax.CURRENT_PROGRESS_COUNT = 0;
Ajax.CURRENT_SYNC_COUNT = 0;
Ajax.CONTENT_JSON_UTF_8 = 'application/json; charset=UTF-8';
exports.default = Ajax;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFqYXguanMiXSwibmFtZXMiOlsiQWpheCIsImNvbnRlbnRUeXBlIiwiQ09OVEVOVF9KU09OX1VURl84IiwiZGF0YVR5cGUiLCJGSUxFX1RZUEVfSlNPTiIsIm5lZWRTdHJpbmdpZnkiLCJwcm9ncmVzcyIsImFzeW5jIiwic2V0dGluZ3MiLCJDVVJSRU5UX1BST0dSRVNTX0NPVU5UIiwic3RhcnQiLCJDVVJSRU5UX1NZTkNfQ09VTlQiLCIkIiwiUFJPUF9TWVMiLCJza1ZhbCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiYWpheCIsImRvbmUiLCJ0ZXh0U3RhdHVzIiwianFYSFIiLCJpc0Z1bmN0aW9uIiwiZG9uZUZ1bmMiLCJmYWlsIiwiZXJyb3JUaHJvd24iLCJjb25zb2xlIiwiZXJyb3IiLCJmYWlsRnVuYyIsImFsd2F5cyIsImluYyIsImV4Y2VwdGlvbiIsInVybCIsIm9wdGlvbnMiLCJkb0FqYXgiLCJhc3NpZ24iLCJnZXREZWZhdWx0U2V0dGluZ3MiLCJtZXRob2QiLCJNRVRIT0QiLCJERUxFVEUiLCJHRVQiLCJQT1NUIiwiUFVUIiwiUkVRVUVTVF9NRVRIT0RfREVMRVRFIiwiUkVRVUVTVF9NRVRIT0RfR0VUIiwiUkVRVUVTVF9NRVRIT0RfUE9TVCIsIlJFUVVFU1RfTUVUSE9EX1BVVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozt5Q0FZUztBQUMxQixhQUFPO0FBQ0xDLHFCQUFhRCxLQUFLRSxrQkFEYjtBQUVMQyxrQkFBVSxhQUFHQyxjQUZSO0FBR0w7QUFDQTtBQUNBQyx1QkFBZSxJQUxWO0FBTUxDLGtCQUFVLElBTkwsRUFNVTtBQUNmQyxlQUFPLElBUEYsQ0FPTTtBQVBOLE9BQVA7QUFTRDs7OzJCQUVhQyxRLEVBQVU7QUFDdEIsVUFBSUEsU0FBU0YsUUFBYixFQUF1QjtBQUNyQixZQUFJTixLQUFLUyxzQkFBTCxLQUFnQyxDQUFwQyxF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LEdBQXlCLEM7QUFQYlQsSSxDQVFaVyxrQixHQUFxQixDO0FBUlRYLEksQ0FVWkUsa0IsR0FBcUIsaUM7a0JBVlRGLEkiLCJmaWxlIjoiQWpheC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IE5Qcm9ncmVzcyBmcm9tICducHJvZ3Jlc3MnO1xuaW1wb3J0IE1vZGVsIGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IFNLIGZyb20gJy4vU0snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcbiAgc3RhdGljIE1FVEhPRCA9IHtcbiAgICBERUxFVEU6IFNLLlJFUVVFU1RfTUVUSE9EX0RFTEVURSxcbiAgICBHRVQ6IFNLLlJFUVVFU1RfTUVUSE9EX0dFVCxcbiAgICBQT1NUOiBTSy5SRVFVRVNUX01FVEhPRF9QT1NULFxuICAgIFBVVDogU0suUkVRVUVTVF9NRVRIT0RfUFVUXG4gIH07XG4gIHN0YXRpYyBDVVJSRU5UX1BST0dSRVNTX0NPVU5UID0gMDtcbiAgc3RhdGljIENVUlJFTlRfU1lOQ19DT1VOVCA9IDA7XG5cbiAgc3RhdGljIENPTlRFTlRfSlNPTl9VVEZfOCA9ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JztcblxuICBzdGF0aWMgZ2V0RGVmYXVsdFNldHRpbmdzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50VHlwZTogQWpheC5DT05URU5UX0pTT05fVVRGXzgsXG4gICAgICBkYXRhVHlwZTogU0suRklMRV9UWVBFX0pTT04sXG4gICAgICAvLyBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAvLyB0cmFkaXRpb25hbDogdHJ1ZSxcbiAgICAgIG5lZWRTdHJpbmdpZnk6IHRydWUsXG4gICAgICBwcm9ncmVzczogdHJ1ZSwvL3NrIGV4dGVuZCBqcXVlcnlcbiAgICAgIGFzeW5jOiB0cnVlLy9zayBleHRlbmQganF1ZXJ5XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRvQWpheChzZXR0aW5ncykge1xuICAgIGlmIChzZXR0aW5ncy5wcm9ncmVzcykge1xuICAgICAgaWYgKEFqYXguQ1VSUkVOVF9QUk9HUkVTU19DT1VOVCA9PT0gMCkge1xuICAgICAgICBOUHJvZ3Jlc3Muc3RhcnQoKTtcbiAgICAgIH1cbiAgICAgIEFqYXguQ1VSUkVOVF9QUk9HUkVTU19DT1VOVCsrO1xuICAgIH1cbiAgICBpZiAoIXNldHRpbmdzLmFzeW5jKSB7XG4gICAgICBpZiAoQWpheC5DVVJSRU5UX1NZTkNfQ09VTlQgPT09IDApIHtcbiAgICAgICAgaWYgKFNLLiQoTW9kZWwuUFJPUF9TWVMpIGluc3RhbmNlb2YgTW9kZWwpIHtcbiAgICAgICAgICBTSy4kKE1vZGVsLlBST1BfU1lTKS5za1ZhbCgndWkuc3Bpbm5pbmcnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQWpheC5DVVJSRU5UX1NZTkNfQ09VTlQrKztcbiAgICB9XG4gICAgc2V0dGluZ3MuZGF0YSA9IHNldHRpbmdzLmRhdGEgJiYgc2V0dGluZ3MubmVlZFN0cmluZ2lmeSA/IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLmRhdGEpIDogc2V0dGluZ3MuZGF0YTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICQuYWpheChzZXR0aW5ncykuZG9uZSgoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpID0+IHtcbiAgICAgICAgaWYoXy5pc0Z1bmN0aW9uKHNldHRpbmdzLmRvbmVGdW5jKSl7XG4gICAgICAgICAgc2V0dGluZ3MuZG9uZUZ1bmMoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihqcVhIUik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGV4dFN0YXR1cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JUaHJvd24pO1xuICAgICAgICBpZihfLmlzRnVuY3Rpb24oc2V0dGluZ3MuZmFpbEZ1bmMpKXtcbiAgICAgICAgICBzZXR0aW5ncy5mYWlsRnVuYyhqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xuICAgICAgICB9XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAoc2V0dGluZ3MucHJvZ3Jlc3MpIHtcbiAgICAgICAgICBBamF4LkNVUlJFTlRfUFJPR1JFU1NfQ09VTlQtLTtcbiAgICAgICAgICBpZiAoQWpheC5DVVJSRU5UX1BST0dSRVNTX0NPVU5UID09PSAwKSB7XG4gICAgICAgICAgICBOUHJvZ3Jlc3MuZG9uZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBOUHJvZ3Jlc3MuaW5jKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghc2V0dGluZ3MuYXN5bmMpIHtcbiAgICAgICAgICBBamF4LkNVUlJFTlRfU1lOQ19DT1VOVC0tO1xuICAgICAgICAgIGlmIChBamF4LkNVUlJFTlRfU1lOQ19DT1VOVCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKFNLLiQoTW9kZWwuUFJPUF9TWVMpIGluc3RhbmNlb2YgTW9kZWwpIHtcbiAgICAgICAgICAgICAgU0suJChNb2RlbC5QUk9QX1NZUykuc2tWYWwoJ3VpLnNwaW5uaW5nJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRvRGVsZXRlKHVybCwgZGF0YSA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gQWpheC5kb0FqYXgoU0suYXNzaWduKHt9LCBBamF4LmdldERlZmF1bHRTZXR0aW5ncygpLCB7dXJsOiB1cmx9LCB7ZGF0YTogZGF0YX0sIHttZXRob2Q6IEFqYXguTUVUSE9ELkRFTEVURX0sIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHN0YXRpYyBkb0dldCh1cmwsIGRhdGEgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIEFqYXguZG9BamF4KFNLLmFzc2lnbih7fSwgQWpheC5nZXREZWZhdWx0U2V0dGluZ3MoKSwge3VybDogdXJsfSwge2RhdGE6IGRhdGF9LCB7bWV0aG9kOiBBamF4Lk1FVEhPRC5HRVR9LCBvcHRpb25zKSk7XG4gIH1cblxuICBzdGF0aWMgZG9Qb3N0KHVybCwgZGF0YSA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gQWpheC5kb0FqYXgoU0suYXNzaWduKHt9LCBBamF4LmdldERlZmF1bHRTZXR0aW5ncygpLCB7dXJsOiB1cmx9LCB7ZGF0YTogZGF0YX0sIHttZXRob2Q6IEFqYXguTUVUSE9ELlBPU1R9LCBvcHRpb25zKSk7XG4gIH1cblxuICBzdGF0aWMgZG9QdXQodXJsLCBkYXRhID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBBamF4LmRvQWpheChTSy5hc3NpZ24oe30sIEFqYXguZ2V0RGVmYXVsdFNldHRpbmdzKCksIHt1cmw6IHVybH0sIHtkYXRhOiBkYXRhfSwge21ldGhvZDogQWpheC5NRVRIT0QuUFVUfSwgb3B0aW9ucykpO1xuICB9XG59XG4iXX0=