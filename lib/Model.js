'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SK = require('./SK');

var _SK2 = _interopRequireDefault(_SK);

var _Validator = require('./Validator');

var _Validator2 = _interopRequireDefault(_Validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {

  /**
   * freeObject = {
   *  m:{"xxx":"most form"},
   *  v:{"yyy":"most table/tree"},
   *  c:{"zzz":"button state"}
   * }
   *
   * @param freeObject plain object
   * @param validator
   */
  function Model() {
    var freeObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Validator2.default();

    _classCallCheck(this, Model);

    this.errors = {};
    this.idListeners = {};
    this.monitors = {};
    this.regListeners = {};
    this.freeObject = freeObject;
    this.validator = validator;

    this.addAllValidatorMonitor();
  }

  /**
   * {a:{b:true,c:false}} => a.b
   * @param prefix
   * @param modelIds
   * @param object
   */


  _createClass(Model, [{
    key: 'addIdChangedListener',


    /**
     *
     * @param id
     * @param listener please bind context
     */
    value: function addIdChangedListener(id, listener) {
      this.addIdListener(id, Model.EvtType.Changed, listener);
    }

    /**
     *
     * @param id
     * @param listener please bind context
     */

  }, {
    key: 'addIdErroredListener',
    value: function addIdErroredListener(id, listener) {
      this.addIdListener(id, Model.EvtType.Errored, listener);
    }

    /**
     *
     * @param id
     * @param type
     * @param listener please bind context
     */

  }, {
    key: 'addIdListener',
    value: function addIdListener(id, type, listener) {
      if (!this.idListeners[type]) {
        this.idListeners[type] = {};
      }
      if (!this.idListeners[type][id]) {
        this.idListeners[type][id] = [];
      }
      if (this.idListeners[type][id].indexOf(listener) < 0) {
        this.idListeners[type][id].push(listener);
      }
    }

    /**
     *
     * @param reg
     * @param listener please bind context
     */

  }, {
    key: 'addRegChangedListener',
    value: function addRegChangedListener(reg, listener) {
      this.addRegListener(reg, Model.EvtType.Changed, listener);
    }

    /**
     *
     * @param reg
     * @param listener please bind context
     */

  }, {
    key: 'addRegErroredListener',
    value: function addRegErroredListener(reg, listener) {
      this.addRegListener(reg, Model.EvtType.Errored, listener);
    }

    /**
     *
     * @param reg
     * @param type
     * @param listener please bind context
     */

  }, {
    key: 'addRegListener',
    value: function addRegListener(reg, type, listener) {
      if (!this.regListeners[type]) {
        this.regListeners[type] = {};
      }
      if (!this.regListeners[type][reg]) {
        this.regListeners[type][reg] = [];
      }
      if (this.regListeners[type][reg].indexOf(listener) < 0) {
        this.regListeners[type][reg].push(listener);
      }
    }
  }, {
    key: 'fireChangedEvent',
    value: function fireChangedEvent(id, old, current) {
      this.fireEvent({ model: this, id: id, old: old, current: current, type: Model.EvtType.Changed });
    }
  }, {
    key: 'fireErroredEvent',
    value: function fireErroredEvent(id, old, current) {
      this.fireEvent({ model: this, id: id, old: old, current: current, type: Model.EvtType.Errored });
    }
  }, {
    key: 'fireEvent',
    value: function fireEvent(evt) {
      var matchedListeners = [];
      var idListeners = this.idListeners[evt.type] ? this.idListeners[evt.type] : {};
      matchedListeners.push.apply(matchedListeners, idListeners[evt.id] ? idListeners[evt.id] : []);
      var regListeners = this.regListeners[evt.type] ? this.regListeners[evt.type] : {};
      Object.keys(regListeners).forEach(function (reg) {
        matchedListeners.push.apply(matchedListeners, evt.id.match(reg) ? listeners[reg] : []);
      });

      matchedListeners.forEach(function (listener) {
        listener(evt);
      });
      return this;
    }
  }, {
    key: 'getAllErrors',
    value: function getAllErrors() {
      return this.errors;
    }
  }, {
    key: 'getErrors',
    value: function getErrors(id) {
      return _SK2.default.s4o(this.errors[id]);
    }
  }, {
    key: 'getValidator',
    value: function getValidator() {
      return this.validator;
    }
  }, {
    key: 'hasErrors',
    value: function hasErrors() {
      var _this = this;

      var rtn = false;
      Object.keys(this.errors).forEach(function ($modelId) {
        rtn = rtn || !_lodash2.default.isEmpty(_this.errors[$modelId]);
      });
      return rtn;
    }
  }, {
    key: 'rmvIdChangedListener',
    value: function rmvIdChangedListener(id, listener) {
      this.rmvIdListener(id, Model.EvtType.Changed, listener);
    }
  }, {
    key: 'rmvIdErroredListener',
    value: function rmvIdErroredListener(id, listener) {
      this.rmvIdListener(id, Model.EvtType.Errored, listener);
    }
  }, {
    key: 'rmvIdListener',
    value: function rmvIdListener(id, type, listener) {
      if (!this.idListeners[type]) {
        this.idListeners[type] = {};
      }
      if (!this.idListeners[type][id]) {
        this.idListeners[type][id] = [];
      }
      if (this.idListeners[type][id].indexOf(listener) >= 0) {
        this.idListeners[type][id].skRmv(listener);
      }
    }
  }, {
    key: 'rmvRegChangedListener',
    value: function rmvRegChangedListener(reg, listener) {
      this.rmvRegListener(reg, Model.EvtType.Changed, listener);
    }
  }, {
    key: 'rmvRegErroredListener',
    value: function rmvRegErroredListener(reg, listener) {
      this.rmvRegListener(reg, Model.EvtType.Errored, listener);
    }
  }, {
    key: 'rmvRegListener',
    value: function rmvRegListener(reg, type, listener) {
      if (!this.regListeners[type]) {
        this.regListeners[type] = {};
      }
      if (!this.regListeners[type][reg]) {
        this.regListeners[type][reg] = [];
      }
      if (this.regListeners[type][reg].indexOf(listener) >= 0) {
        this.regListeners[type][reg].skRmv(listener);
      }
    }
  }, {
    key: 'skVal',
    value: function skVal(id, value) {
      var oldValue = this.freeObject.skVal(id);
      if (arguments.length > 1) {
        if (oldValue !== value) {
          this.freeObject.skVal(id, value);
          this.fireChangedEvent(id, oldValue, value);
        }
        return this;
      } else {
        return oldValue;
      }
    }

    //validator begin

  }, {
    key: 'addAllValidatorMonitor',
    value: function addAllValidatorMonitor() {
      var _this2 = this;

      var tmpModelIds = this.getValidator().getModelIds();
      Object.keys(tmpModelIds).forEach(function ($key) {
        _this2.addValidatorMonitor($key, tmpModelIds[$key]);
      });
    }
  }, {
    key: 'addValidatorMonitor',
    value: function addValidatorMonitor(modelId, config) {
      var _this3 = this;

      Object.keys(config).forEach(function ($key) {
        _this3.addValidatorRuleMonitor(modelId, $key, config[$key]);
      });
    }
  }, {
    key: 'addValidatorRuleMonitor',
    value: function addValidatorRuleMonitor(modelId, rule, setting) {
      var _this4 = this;

      if (!this.monitors[modelId]) {
        this.errors[modelId] = {};
        this.monitors[modelId] = this.validate.bind(modelId);
        this.addIdChangedListener(modelId, this.monitors[modelId]);
      }
      if (rule === _Validator2.default.PROP_DEPS) {
        //when dependencies changed, need validate too
        Model.parseSao(setting).forEach(function ($i) {
          if (_lodash2.default.isRegExp($i)) {
            _this4.addRegChangedListener($i, _this4.monitors[modelId]);
          } else {
            _this4.addIdChangedListener($i, _this4.monitors[modelId]);
          }
        });
      } else {
        var tmpSettingDeps = setting[_Validator2.default.PROP_DEPS];
        if (tmpSettingDeps) {
          //see Validator.constructor comments
          Model.parseSao(tmpSettingDeps).forEach(function ($i) {
            if (_lodash2.default.isRegExp($i)) {
              _this4.addRegChangedListener($i, _this4.monitors[modelId]);
            } else {
              _this4.addIdChangedListener($i, _this4.monitors[modelId]);
            }
          });
        }
      }
    }
  }, {
    key: 'execValidate',
    value: function execValidate(rule, id, func, model, setting) {
      var tmpRtn = func(model, model.skVal(id), setting);
      if (!_lodash2.default.isBoolean(tmpRtn)) {
        //true or message
        this.errors.skVal(id + _SK2.default.CHAR_DOT + rule, tmpRtn);
      } else {
        delete this.errors[id][rule];
      }
      this.fireErroredEvent(id, model.skVal(id), model.skVal(id));
    }
  }, {
    key: 'rmvValidatorMonitor',
    value: function rmvValidatorMonitor(id, config) {
      var _this5 = this;

      Object.keys(config).forEach(function ($key) {
        if ($key === _Validator2.default.PROP_DEPS) {
          Model.parseSao(config[$key]).forEach(function ($i) {
            if (_lodash2.default.isRegExp($i)) {
              _this5.rmvRegChangedListener($i, _this5.monitors[id]);
            } else {
              _this5.rmvIdChangedListener($i, _this5.monitors[id]);
            }
          });
        } else {
          _this5.rmvValidatorRuleMonitor(id, $key, config[$key]);
        }
      });
    }
  }, {
    key: 'rmvValidatorRuleMonitor',
    value: function rmvValidatorRuleMonitor(id, rule, setting) {
      var _this6 = this;

      var tmpSettingDeps = setting[_Validator2.default.PROP_DEPS];
      if (tmpSettingDeps) {
        Model.parseSao(tmpSettingDeps).forEach(function ($i) {
          if (_lodash2.default.isRegExp($i)) {
            _this6.rmvRegChangedListener($i, _this6.monitors[id]);
          } else {
            _this6.rmvIdChangedListener($i, _this6.monitors[id]);
          }
        });
      }
    }
  }, {
    key: 'validate',
    value: function validate(evt) {
      var tmpModelId = this;
      var tmpModel = evt.model;
      var tmpConfig = evt.model.getValidator().getModelIds()[tmpModelId];
      if (tmpConfig && _lodash2.default.isObject(tmpConfig)) {
        Object.keys(tmpConfig).forEach(function ($key) {
          if ($key === _Validator2.default.PROP_SCENARIO) {
            //ignore
          } else if ($key === _Validator2.default.PROP_FUNC) {
            tmpModel.execValidate($key, tmpModelId, tmpConfig[$key], tmpModel, undefined);
          } else {
            var tmpRule = tmpModel.getValidator().getRules()[$key];
            if (_lodash2.default.isFunction(tmpRule)) {
              tmpModel.execValidate($key, tmpModelId, tmpRule, tmpModel, tmpConfig[$key]);
            } else if (_lodash2.default.isObject(tmpRule) && _lodash2.default.isFunction(tmpRule[_Validator2.default.PROP_FUNC])) {
              tmpModel.execValidate($key, tmpModelId, tmpRule[_Validator2.default.PROP_FUNC], tmpModel, undefined);
            }
          }
        });
      }
    }
  }, {
    key: 'validateByScenario',
    value: function validateByScenario(scenario) {
      var _this7 = this;

      var configs = this.getValidator().getModelIds();
      Object.keys(configs).forEach(function ($modelId) {
        if (!scenario || scenario === configs[$modelId][_Validator2.default.PROP_SCENARIO]) {
          _this7.validate.call($modelId, { model: _this7 });
        }
      });
    }

    //validator end

  }], [{
    key: 'object2ModelIds',
    value: function object2ModelIds(prefix) {
      var modelIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var object = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      Object.keys(object).forEach(function ($k) {
        var tmpKey = prefix + (String(prefix).skBlank() ? _SK2.default.EMPTY : _SK2.default.CHAR_DOT) + $k;
        var tmpVal = object[$k];
        if (_lodash2.default.isPlainObject(tmpVal)) {
          Model.object2ModelIds(tmpKey, modelIds, tmpVal);
        } else if (_SK2.default.s4b(tmpVal) && tmpVal) {
          modelIds.push(tmpKey);
        }
      });
    }
  }, {
    key: 'parseSao',


    /**
     * @param sao is string[reg], array[string] or object
     * @returns {Array}
     */
    value: function parseSao(sao) {
      var rtn = [];
      if (sao) {
        if (_lodash2.default.isPlainObject(sao)) {
          Model.object2ModelIds(_SK2.default.EMPTY, rtn, sao);
        } else if (_lodash2.default.isArray(sao)) {
          rtn = rtn.concat(sao);
        } else if (_lodash2.default.isString(sao)) {
          rtn.push(sao);
        }
      }
      return rtn;
    }
  }]);

  return Model;
}();

Model.EvtType = {
  Changed: 'Changed',
  Errored: 'Errored'
};
Model.PROP_SK = 'skModel';
Model.PROP_SYS = 'skSysModel';
exports.default = Model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVsLmpzIl0sIm5hbWVzIjpbIk1vZGVsIiwiZnJlZU9iamVjdCIsInZhbGlkYXRvciIsImVycm9ycyIsImlkTGlzdGVuZXJzIiwibW9uaXRvcnMiLCJyZWdMaXN0ZW5lcnMiLCJhZGRBbGxWYWxpZGF0b3JNb25pdG9yIiwiaWQiLCJsaXN0ZW5lciIsImFkZElkTGlzdGVuZXIiLCJFdnRUeXBlIiwiQ2hhbmdlZCIsIkVycm9yZWQiLCJ0eXBlIiwiaW5kZXhPZiIsInB1c2giLCJyZWciLCJhZGRSZWdMaXN0ZW5lciIsIm9sZCIsImN1cnJlbnQiLCJmaXJlRXZlbnQiLCJtb2RlbCIsImV2dCIsIm1hdGNoZWRMaXN0ZW5lcnMiLCJhcHBseSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibWF0Y2giLCJsaXN0ZW5lcnMiLCJzNG8iLCJydG4iLCIkbW9kZWxJZCIsImlzRW1wdHkiLCJybXZJZExpc3RlbmVyIiwic2tSbXYiLCJybXZSZWdMaXN0ZW5lciIsInZhbHVlIiwib2xkVmFsdWUiLCJza1ZhbCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImZpcmVDaGFuZ2VkRXZlbnQiLCJ0bXBNb2RlbElkcyIsImdldFZhbGlkYXRvciIsImdldE1vZGVsSWRzIiwiJGtleSIsImFkZFZhbGlkYXRvck1vbml0b3IiLCJtb2RlbElkIiwiY29uZmlnIiwiYWRkVmFsaWRhdG9yUnVsZU1vbml0b3IiLCJydWxlIiwic2V0dGluZyIsInZhbGlkYXRlIiwiYmluZCIsImFkZElkQ2hhbmdlZExpc3RlbmVyIiwiUFJPUF9ERVBTIiwicGFyc2VTYW8iLCIkaSIsImlzUmVnRXhwIiwiYWRkUmVnQ2hhbmdlZExpc3RlbmVyIiwidG1wU2V0dGluZ0RlcHMiLCJmdW5jIiwidG1wUnRuIiwiaXNCb29sZWFuIiwiQ0hBUl9ET1QiLCJmaXJlRXJyb3JlZEV2ZW50Iiwicm12UmVnQ2hhbmdlZExpc3RlbmVyIiwicm12SWRDaGFuZ2VkTGlzdGVuZXIiLCJybXZWYWxpZGF0b3JSdWxlTW9uaXRvciIsInRtcE1vZGVsSWQiLCJ0bXBNb2RlbCIsInRtcENvbmZpZyIsImlzT2JqZWN0IiwiUFJPUF9TQ0VOQVJJTyIsIlBST1BfRlVOQyIsImV4ZWNWYWxpZGF0ZSIsInVuZGVmaW5lZCIsInRtcFJ1bGUiLCJnZXRSdWxlcyIsImlzRnVuY3Rpb24iLCJzY2VuYXJpbyIsImNvbmZpZ3MiLCJjYWxsIiwicHJlZml4IiwibW9kZWxJZHMiLCJvYmplY3QiLCIkayIsInRtcEtleSIsIlN0cmluZyIsInNrQmxhbmsiLCJFTVBUWSIsInRtcFZhbCIsImlzUGxhaW5PYmplY3QiLCJvYmplY3QyTW9kZWxJZHMiLCJzNGIiLCJzYW8iLCJpc0FycmF5IiwiY29uY2F0IiwiaXNTdHJpbmciLCJQUk9QX1NLIiwiUFJPUF9TWVMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsSzs7QUFVbkI7Ozs7Ozs7Ozs7QUFVQSxtQkFBMEQ7QUFBQSxRQUE5Q0MsVUFBOEMsdUVBQWpDLEVBQWlDO0FBQUEsUUFBN0JDLFNBQTZCLHVFQUFqQix5QkFBaUI7O0FBQUE7O0FBRXhELFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsU0FBS0wsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjs7QUFFQSxTQUFLSyxzQkFBTDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7QUFvQ0E7Ozs7O3lDQUtxQkMsRSxFQUFJQyxRLEVBQVU7QUFDakMsV0FBS0MsYUFBTCxDQUFtQkYsRUFBbkIsRUFBdUJSLE1BQU1XLE9BQU4sQ0FBY0MsT0FBckMsRUFBOENILFFBQTlDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O3lDQUtxQkQsRSxFQUFJQyxRLEVBQVU7QUFDakMsV0FBS0MsYUFBTCxDQUFtQkYsRUFBbkIsRUFBdUJSLE1BQU1XLE9B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UztBQUZNLEM7QUFGRWIsSyxDQU9acUcsTyxHQUFVLFM7QUFQRXJHLEssQ0FRWnNHLFEsR0FBVyxZO2tCQVJDdEcsSyIsImZpbGUiOiJNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgU0sgZnJvbSAnLi9TSyc7XG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gJy4vVmFsaWRhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwge1xuXG4gIHN0YXRpYyBFdnRUeXBlID0ge1xuICAgIENoYW5nZWQ6ICdDaGFuZ2VkJyxcbiAgICBFcnJvcmVkOiAnRXJyb3JlZCdcbiAgfTtcblxuICBzdGF0aWMgUFJPUF9TSyA9ICdza01vZGVsJztcbiAgc3RhdGljIFBST1BfU1lTID0gJ3NrU3lzTW9kZWwnO1xuXG4gIC8qKlxuICAgKiBmcmVlT2JqZWN0ID0ge1xuICAgKiAgbTp7XCJ4eHhcIjpcIm1vc3QgZm9ybVwifSxcbiAgICogIHY6e1wieXl5XCI6XCJtb3N0IHRhYmxlL3RyZWVcIn0sXG4gICAqICBjOntcInp6elwiOlwiYnV0dG9uIHN0YXRlXCJ9XG4gICAqIH1cbiAgICpcbiAgICogQHBhcmFtIGZyZWVPYmplY3QgcGxhaW4gb2JqZWN0XG4gICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZyZWVPYmplY3QgPSB7fSwgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcigpKSB7XG5cbiAgICB0aGlzLmVycm9ycyA9IHt9O1xuICAgIHRoaXMuaWRMaXN0ZW5lcnMgPSB7fTtcbiAgICB0aGlzLm1vbml0b3JzID0ge307XG4gICAgdGhpcy5yZWdMaXN0ZW5lcnMgPSB7fTtcbiAgICB0aGlzLmZyZWVPYmplY3QgPSBmcmVlT2JqZWN0O1xuICAgIHRoaXMudmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuXG4gICAgdGhpcy5hZGRBbGxWYWxpZGF0b3JNb25pdG9yKCk7XG4gIH1cblxuICAvKipcbiAgICoge2E6e2I6dHJ1ZSxjOmZhbHNlfX0gPT4gYS5iXG4gICAqIEBwYXJhbSBwcmVmaXhcbiAgICogQHBhcmFtIG1vZGVsSWRzXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICovXG4gIHN0YXRpYyBvYmplY3QyTW9kZWxJZHMocHJlZml4LCBtb2RlbElkcyA9IFtdLCBvYmplY3QgPSB7fSkge1xuICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaCgoJGspID0+IHtcbiAgICAgIGxldCB0bXBLZXkgPSBwcmVmaXggKyAoU3RyaW5nKHByZWZpeCkuc2tCbGFuaygpID8gU0suRU1QVFkgOiBTSy5DSEFSX0RPVCkgKyAkaztcbiAgICAgIGxldCB0bXBWYWwgPSBvYmplY3RbJGtdO1xuICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdCh0bXBWYWwpKSB7XG4gICAgICAgIE1vZGVsLm9iamVjdDJNb2RlbElkcyh0bXBLZXksIG1vZGVsSWRzLCB0bXBWYWwpXG4gICAgICB9IGVsc2UgaWYgKFNLLnM0Yih0bXBWYWwpICYmIHRtcFZhbCkge1xuICAgICAgICBtb2RlbElkcy5wdXNoKHRtcEtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzYW8gaXMgc3RyaW5nW3JlZ10sIGFycmF5W3N0cmluZ10gb3Igb2JqZWN0XG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyBwYXJzZVNhbyhzYW8pIHtcbiAgICBsZXQgcnRuID0gW107XG4gICAgaWYgKHNhbykge1xuICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChzYW8pKSB7XG4gICAgICAgIE1vZGVsLm9iamVjdDJNb2RlbElkcyhTSy5FTVBUWSwgcnRuLCBzYW8pO1xuICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoc2FvKSkge1xuICAgICAgICBydG4gPSBydG4uY29uY2F0KHNhbyk7XG4gICAgICB9IGVsc2UgaWYgKF8uaXNTdHJpbmcoc2FvKSkge1xuICAgICAgICBydG4ucHVzaChzYW8pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnRuO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gbGlzdGVuZXIgcGxlYXNlIGJpbmQgY29udGV4dFxuICAgKi9cbiAgYWRkSWRDaGFuZ2VkTGlzdGVuZXIoaWQsIGxpc3RlbmVyKSB7XG4gICAgdGhpcy5hZGRJZExpc3RlbmVyKGlkLCBNb2RlbC5FdnRUeXBlLkNoYW5nZWQsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGxpc3RlbmVyIHBsZWFzZSBiaW5kIGNvbnRleHRcbiAgICovXG4gIGFkZElkRXJyb3JlZExpc3RlbmVyKGlkLCBsaXN0ZW5lcikge1xuICAgIHRoaXMuYWRkSWRMaXN0ZW5lcihpZCwgTW9kZWwuRXZ0VHlwZS5FcnJvcmVkLCBsaXN0ZW5lcik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBsaXN0ZW5lciBwbGVhc2UgYmluZCBjb250ZXh0XG4gICAqL1xuICBhZGRJZExpc3RlbmVyKGlkLCB0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5pZExpc3RlbmVyc1t0eXBlXSkge1xuICAgICAgdGhpcy5pZExpc3RlbmVyc1t0eXBlXSA9IHt9O1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaWRMaXN0ZW5lcnNbdHlwZV1baWRdKSB7XG4gICAgICB0aGlzLmlkTGlzdGVuZXJzW3R5cGVdW2lkXSA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5pZExpc3RlbmVyc1t0eXBlXVtpZF0uaW5kZXhPZihsaXN0ZW5lcikgPCAwKSB7XG4gICAgICB0aGlzLmlkTGlzdGVuZXJzW3R5cGVdW2lkXS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHJlZ1xuICAgKiBAcGFyYW0gbGlzdGVuZXIgcGxlYXNlIGJpbmQgY29udGV4dFxuICAgKi9cbiAgYWRkUmVnQ2hhbmdlZExpc3RlbmVyKHJlZywgbGlzdGVuZXIpIHtcbiAgICB0aGlzLmFkZFJlZ0xpc3RlbmVyKHJlZywgTW9kZWwuRXZ0VHlwZS5DaGFuZ2VkLCBsaXN0ZW5lcik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHJlZ1xuICAgKiBAcGFyYW0gbGlzdGVuZXIgcGxlYXNlIGJpbmQgY29udGV4dFxuICAgKi9cbiAgYWRkUmVnRXJyb3JlZExpc3RlbmVyKHJlZywgbGlzdGVuZXIpIHtcbiAgICB0aGlzLmFkZFJlZ0xpc3RlbmVyKHJlZywgTW9kZWwuRXZ0VHlwZS5FcnJvcmVkLCBsaXN0ZW5lcik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHJlZ1xuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbGlzdGVuZXIgcGxlYXNlIGJpbmQgY29udGV4dFxuICAgKi9cbiAgYWRkUmVnTGlzdGVuZXIocmVnLCB0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5yZWdMaXN0ZW5lcnNbdHlwZV0pIHtcbiAgICAgIHRoaXMucmVnTGlzdGVuZXJzW3R5cGVdID0ge307XG4gICAgfVxuICAgIGlmICghdGhpcy5yZWdMaXN0ZW5lcnNbdHlwZV1bcmVnXSkge1xuICAgICAgdGhpcy5yZWdMaXN0ZW5lcnNbdHlwZV1bcmVnXSA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZWdMaXN0ZW5lcnNbdHlwZV1bcmVnXS5pbmRleE9mKGxpc3RlbmVyKSA8IDApIHtcbiAgICAgIHRoaXMucmVnTGlzdGVuZXJzW3R5cGVdW3JlZ10ucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICB9XG5cbiAgZmlyZUNoYW5nZWRFdmVudChpZCwgb2xkLCBjdXJyZW50KSB7XG4gICAgdGhpcy5maXJlRXZlbnQoe21vZGVsOiB0aGlzLCBpZDogaWQsIG9sZDogb2xkLCBjdXJyZW50OiBjdXJyZW50LCB0eXBlOiBNb2RlbC5FdnRUeXBlLkNoYW5nZWR9KTtcbiAgfVxuXG4gIGZpcmVFcnJvcmVkRXZlbnQoaWQsIG9sZCwgY3VycmVudCkge1xuICAgIHRoaXMuZmlyZUV2ZW50KHttb2RlbDogdGhpcywgaWQ6IGlkLCBvbGQ6IG9sZCwgY3VycmVudDogY3VycmVudCwgdHlwZTogTW9kZWwuRXZ0VHlwZS5FcnJvcmVkfSk7XG4gIH1cblxuICBmaXJlRXZlbnQoZXZ0KSB7XG4gICAgbGV0IG1hdGNoZWRMaXN0ZW5lcnMgPSBbXTtcbiAgICBsZXQgaWRMaXN0ZW5lcnMgPSB0aGlzLmlkTGlzdGVuZXJzW2V2dC50eXBlXSA/IHRoaXMuaWRMaXN0ZW5lcnNbZXZ0LnR5cGVdIDoge307XG4gICAgbWF0Y2hlZExpc3RlbmVycy5wdXNoLmFwcGx5KG1hdGNoZWRMaXN0ZW5lcnMsIGlkTGlzdGVuZXJzW2V2dC5pZF0gPyBpZExpc3RlbmVyc1tldnQuaWRdIDogW10pO1xuICAgIGxldCByZWdMaXN0ZW5lcnMgPSB0aGlzLnJlZ0xpc3RlbmVyc1tldnQudHlwZV0gPyB0aGlzLnJlZ0xpc3RlbmVyc1tldnQudHlwZV0gOiB7fTtcbiAgICBPYmplY3Qua2V5cyhyZWdMaXN0ZW5lcnMpLmZvckVhY2gocmVnID0+IHtcbiAgICAgIG1hdGNoZWRMaXN0ZW5lcnMucHVzaC5hcHBseShtYXRjaGVkTGlzdGVuZXJzLCBldnQuaWQubWF0Y2gocmVnKSA/IGxpc3RlbmVyc1tyZWddIDogW10pO1xuICAgIH0pO1xuXG4gICAgbWF0Y2hlZExpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICAgIGxpc3RlbmVyKGV2dCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRBbGxFcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXJyb3JzO1xuICB9XG5cbiAgZ2V0RXJyb3JzKGlkKSB7XG4gICAgcmV0dXJuIFNLLnM0byh0aGlzLmVycm9yc1tpZF0pO1xuICB9XG5cbiAgZ2V0VmFsaWRhdG9yKCkge1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcbiAgfVxuXG4gIGhhc0Vycm9ycygpIHtcbiAgICBsZXQgcnRuID0gZmFsc2U7XG4gICAgT2JqZWN0LmtleXModGhpcy5lcnJvcnMpLmZvckVhY2goKCRtb2RlbElkKSA9PiB7XG4gICAgICBydG4gPSBydG4gfHwgIV8uaXNFbXB0eSh0aGlzLmVycm9yc1skbW9kZWxJZF0pO1xuICAgIH0pO1xuICAgIHJldHVybiBydG47XG4gIH1cblxuICBybXZJZENoYW5nZWRMaXN0ZW5lcihpZCwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLnJtdklkTGlzdGVuZXIoaWQsIE1vZGVsLkV2dFR5cGUuQ2hhbmdlZCwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcm12SWRFcnJvcmVkTGlzdGVuZXIoaWQsIGxpc3RlbmVyKSB7XG4gICAgdGhpcy5ybXZJZExpc3RlbmVyKGlkLCBNb2RlbC5FdnRUeXBlLkVycm9yZWQsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJtdklkTGlzdGVuZXIoaWQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLmlkTGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICB0aGlzLmlkTGlzdGVuZXJzW3R5cGVdID0ge307XG4gICAgfVxuICAgIGlmICghdGhpcy5pZExpc3RlbmVyc1t0eXBlXVtpZF0pIHtcbiAgICAgIHRoaXMuaWRMaXN0ZW5lcnNbdHlwZV1baWRdID0gW107XG4gICAgfVxuICAgIGlmICh0aGlzLmlkTGlzdGVuZXJzW3R5cGVdW2lkXS5pbmRleE9mKGxpc3RlbmVyKSA+PSAwKSB7XG4gICAgICB0aGlzLmlkTGlzdGVuZXJzW3R5cGVdW2lkXS5za1JtdihsaXN0ZW5lcik7XG4gICAgfVxuICB9XG5cbiAgcm12UmVnQ2hhbmdlZExpc3RlbmVyKHJlZywgbGlzdGVuZXIpIHtcbiAgICB0aGlzLnJtdlJlZ0xpc3RlbmVyKHJlZywgTW9kZWwuRXZ0VHlwZS5DaGFuZ2VkLCBsaXN0ZW5lcik7XG4gIH1cblxuICBybXZSZWdFcnJvcmVkTGlzdGVuZXIocmVnLCBsaXN0ZW5lcikge1xuICAgIHRoaXMucm12UmVnTGlzdGVuZXIocmVnLCBNb2RlbC5FdnRUeXBlLkVycm9yZWQsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJtdlJlZ0xpc3RlbmVyKHJlZywgdHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMucmVnTGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICB0aGlzLnJlZ0xpc3RlbmVyc1t0eXBlXSA9IHt9O1xuICAgIH1cbiAgICBpZiAoIXRoaXMucmVnTGlzdGVuZXJzW3R5cGVdW3JlZ10pIHtcbiAgICAgIHRoaXMucmVnTGlzdGVuZXJzW3R5cGVdW3JlZ10gPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVnTGlzdGVuZXJzW3R5cGVdW3JlZ10uaW5kZXhPZihsaXN0ZW5lcikgPj0gMCkge1xuICAgICAgdGhpcy5yZWdMaXN0ZW5lcnNbdHlwZV1bcmVnXS5za1JtdihsaXN0ZW5lcik7XG4gICAgfVxuICB9XG5cbiAgc2tWYWwoaWQsIHZhbHVlKSB7XG4gICAgbGV0IG9sZFZhbHVlID0gdGhpcy5mcmVlT2JqZWN0LnNrVmFsKGlkKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5mcmVlT2JqZWN0LnNrVmFsKGlkLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuZmlyZUNoYW5nZWRFdmVudChpZCwgb2xkVmFsdWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2xkVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy92YWxpZGF0b3IgYmVnaW5cbiAgYWRkQWxsVmFsaWRhdG9yTW9uaXRvcigpIHtcbiAgICBsZXQgdG1wTW9kZWxJZHMgPSB0aGlzLmdldFZhbGlkYXRvcigpLmdldE1vZGVsSWRzKCk7XG4gICAgT2JqZWN0LmtleXModG1wTW9kZWxJZHMpLmZvckVhY2goKCRrZXkpID0+IHtcbiAgICAgIHRoaXMuYWRkVmFsaWRhdG9yTW9uaXRvcigka2V5LCB0bXBNb2RlbElkc1ska2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRWYWxpZGF0b3JNb25pdG9yKG1vZGVsSWQsIGNvbmZpZykge1xuICAgIE9iamVjdC5rZXlzKGNvbmZpZykuZm9yRWFjaCgoJGtleSkgPT4ge1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3JSdWxlTW9uaXRvcihtb2RlbElkLCAka2V5LCBjb25maWdbJGtleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVmFsaWRhdG9yUnVsZU1vbml0b3IobW9kZWxJZCwgcnVsZSwgc2V0dGluZykge1xuICAgIGlmICghdGhpcy5tb25pdG9yc1ttb2RlbElkXSkge1xuICAgICAgdGhpcy5lcnJvcnNbbW9kZWxJZF0gPSB7fTtcbiAgICAgIHRoaXMubW9uaXRvcnNbbW9kZWxJZF0gPSB0aGlzLnZhbGlkYXRlLmJpbmQobW9kZWxJZCk7XG4gICAgICB0aGlzLmFkZElkQ2hhbmdlZExpc3RlbmVyKG1vZGVsSWQsIHRoaXMubW9uaXRvcnNbbW9kZWxJZF0pXG4gICAgfVxuICAgIGlmIChydWxlID09PSBWYWxpZGF0b3IuUFJPUF9ERVBTKSB7XG4gICAgICAvL3doZW4gZGVwZW5kZW5jaWVzIGNoYW5nZWQsIG5lZWQgdmFsaWRhdGUgdG9vXG4gICAgICBNb2RlbC5wYXJzZVNhbyhzZXR0aW5nKS5mb3JFYWNoKCgkaSkgPT4ge1xuICAgICAgICBpZiAoXy5pc1JlZ0V4cCgkaSkpIHtcbiAgICAgICAgICB0aGlzLmFkZFJlZ0NoYW5nZWRMaXN0ZW5lcigkaSwgdGhpcy5tb25pdG9yc1ttb2RlbElkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hZGRJZENoYW5nZWRMaXN0ZW5lcigkaSwgdGhpcy5tb25pdG9yc1ttb2RlbElkXSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0bXBTZXR0aW5nRGVwcyA9IHNldHRpbmdbVmFsaWRhdG9yLlBST1BfREVQU107XG4gICAgICBpZiAodG1wU2V0dGluZ0RlcHMpIHtcbiAgICAgICAgLy9zZWUgVmFsaWRhdG9yLmNvbnN0cnVjdG9yIGNvbW1lbnRzXG4gICAgICAgIE1vZGVsLnBhcnNlU2FvKHRtcFNldHRpbmdEZXBzKS5mb3JFYWNoKCgkaSkgPT4ge1xuICAgICAgICAgIGlmIChfLmlzUmVnRXhwKCRpKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRSZWdDaGFuZ2VkTGlzdGVuZXIoJGksIHRoaXMubW9uaXRvcnNbbW9kZWxJZF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZElkQ2hhbmdlZExpc3RlbmVyKCRpLCB0aGlzLm1vbml0b3JzW21vZGVsSWRdKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhlY1ZhbGlkYXRlKHJ1bGUsIGlkLCBmdW5jLCBtb2RlbCwgc2V0dGluZykge1xuICAgIGxldCB0bXBSdG4gPSBmdW5jKG1vZGVsLCBtb2RlbC5za1ZhbChpZCksIHNldHRpbmcpO1xuICAgIGlmICghXy5pc0Jvb2xlYW4odG1wUnRuKSkgey8vdHJ1ZSBvciBtZXNzYWdlXG4gICAgICB0aGlzLmVycm9ycy5za1ZhbChpZCArIFNLLkNIQVJfRE9UICsgcnVsZSwgdG1wUnRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuZXJyb3JzW2lkXVtydWxlXTtcbiAgICB9XG4gICAgdGhpcy5maXJlRXJyb3JlZEV2ZW50KGlkLCBtb2RlbC5za1ZhbChpZCksIG1vZGVsLnNrVmFsKGlkKSk7XG4gIH1cblxuICBybXZWYWxpZGF0b3JNb25pdG9yKGlkLCBjb25maWcpIHtcbiAgICBPYmplY3Qua2V5cyhjb25maWcpLmZvckVhY2goKCRrZXkpID0+IHtcbiAgICAgIGlmICgka2V5ID09PSBWYWxpZGF0b3IuUFJPUF9ERVBTKSB7XG4gICAgICAgIE1vZGVsLnBhcnNlU2FvKGNvbmZpZ1ska2V5XSkuZm9yRWFjaCgoJGkpID0+IHtcbiAgICAgICAgICBpZiAoXy5pc1JlZ0V4cCgkaSkpIHtcbiAgICAgICAgICAgIHRoaXMucm12UmVnQ2hhbmdlZExpc3RlbmVyKCRpLCB0aGlzLm1vbml0b3JzW2lkXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm12SWRDaGFuZ2VkTGlzdGVuZXIoJGksIHRoaXMubW9uaXRvcnNbaWRdKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJtdlZhbGlkYXRvclJ1bGVNb25pdG9yKGlkLCAka2V5LCBjb25maWdbJGtleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcm12VmFsaWRhdG9yUnVsZU1vbml0b3IoaWQsIHJ1bGUsIHNldHRpbmcpIHtcbiAgICBsZXQgdG1wU2V0dGluZ0RlcHMgPSBzZXR0aW5nW1ZhbGlkYXRvci5QUk9QX0RFUFNdO1xuICAgIGlmICh0bXBTZXR0aW5nRGVwcykge1xuICAgICAgTW9kZWwucGFyc2VTYW8odG1wU2V0dGluZ0RlcHMpLmZvckVhY2goKCRpKSA9PiB7XG4gICAgICAgIGlmIChfLmlzUmVnRXhwKCRpKSkge1xuICAgICAgICAgIHRoaXMucm12UmVnQ2hhbmdlZExpc3RlbmVyKCRpLCB0aGlzLm1vbml0b3JzW2lkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ybXZJZENoYW5nZWRMaXN0ZW5lcigkaSwgdGhpcy5tb25pdG9yc1tpZF0pXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlKGV2dCkge1xuICAgIGxldCB0bXBNb2RlbElkID0gdGhpcztcbiAgICBsZXQgdG1wTW9kZWwgPSBldnQubW9kZWw7XG4gICAgbGV0IHRtcENvbmZpZyA9IGV2dC5tb2RlbC5nZXRWYWxpZGF0b3IoKS5nZXRNb2RlbElkcygpW3RtcE1vZGVsSWRdO1xuICAgIGlmICh0bXBDb25maWcgJiYgXy5pc09iamVjdCh0bXBDb25maWcpKSB7XG4gICAgICBPYmplY3Qua2V5cyh0bXBDb25maWcpLmZvckVhY2goKCRrZXkpID0+IHtcbiAgICAgICAgaWYgKCRrZXkgPT09IFZhbGlkYXRvci5QUk9QX1NDRU5BUklPKSB7XG4gICAgICAgICAgLy9pZ25vcmVcbiAgICAgICAgfSBlbHNlIGlmICgka2V5ID09PSBWYWxpZGF0b3IuUFJPUF9GVU5DKSB7XG4gICAgICAgICAgdG1wTW9kZWwuZXhlY1ZhbGlkYXRlKCRrZXksIHRtcE1vZGVsSWQsIHRtcENvbmZpZ1ska2V5XSwgdG1wTW9kZWwsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHRtcFJ1bGUgPSB0bXBNb2RlbC5nZXRWYWxpZGF0b3IoKS5nZXRSdWxlcygpWyRrZXldO1xuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24odG1wUnVsZSkpIHtcbiAgICAgICAgICAgIHRtcE1vZGVsLmV4ZWNWYWxpZGF0ZSgka2V5LCB0bXBNb2RlbElkLCB0bXBSdWxlLCB0bXBNb2RlbCwgdG1wQ29uZmlnWyRrZXldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QodG1wUnVsZSkgJiYgXy5pc0Z1bmN0aW9uKHRtcFJ1bGVbVmFsaWRhdG9yLlBST1BfRlVOQ10pKSB7XG4gICAgICAgICAgICB0bXBNb2RlbC5leGVjVmFsaWRhdGUoJGtleSwgdG1wTW9kZWxJZCwgdG1wUnVsZVtWYWxpZGF0b3IuUFJPUF9GVU5DXSwgdG1wTW9kZWwsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUJ5U2NlbmFyaW8oc2NlbmFyaW8pIHtcbiAgICBsZXQgY29uZmlncyA9IHRoaXMuZ2V0VmFsaWRhdG9yKCkuZ2V0TW9kZWxJZHMoKTtcbiAgICBPYmplY3Qua2V5cyhjb25maWdzKS5mb3JFYWNoKCgkbW9kZWxJZCkgPT4ge1xuICAgICAgaWYgKCFzY2VuYXJpbyB8fCBzY2VuYXJpbyA9PT0gY29uZmlnc1skbW9kZWxJZF1bVmFsaWRhdG9yLlBST1BfU0NFTkFSSU9dKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGUuY2FsbCgkbW9kZWxJZCwge21vZGVsOiB0aGlzfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvL3ZhbGlkYXRvciBlbmRcbn1cbiJdfQ==