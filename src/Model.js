import _ from 'lodash';
import SK from './SK';
import Validator from './Validator';

export default class Model {
  static EvtType = {
    Changed: 'Changed',
    Errored: 'Errored',
  };

  static PROP_SK = 'skModel';
  static PROP_SYS = 'skSysModel';

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
  constructor(freeObject = {}, validator = new Validator()) {
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
  static object2ModelIds(prefix, modelIds = [], object = {}) {
    Object.keys(object).forEach(($k) => {
      const tmpKey = prefix + (String(prefix).skBlank() ? SK.EMPTY : SK.CHAR_DOT) + $k;
      const tmpVal = object[$k];
      if (_.isPlainObject(tmpVal)) {
        Model.object2ModelIds(tmpKey, modelIds, tmpVal);
      } else if (SK.s4b(tmpVal) && tmpVal) {
        modelIds.push(tmpKey);
      }
    });
  }

  /**
   * @param sao is string[reg], array[string] or object
   * @returns {Array}
   */
  static parseSao(sao) {
    let rtn = [];
    if (sao) {
      if (_.isPlainObject(sao)) {
        Model.object2ModelIds(SK.EMPTY, rtn, sao);
      } else if (_.isArray(sao)) {
        rtn = rtn.concat(sao);
      } else if (_.isString(sao)) {
        rtn.push(sao);
      }
    }
    return rtn;
  }

  /**
   *
   * @param id
   * @param listener please bind context
   */
  addIdChangedListener(id, listener) {
    this.addIdListener(id, Model.EvtType.Changed, listener);
  }

  /**
   *
   * @param id
   * @param listener please bind context
   */
  addIdErroredListener(id, listener) {
    this.addIdListener(id, Model.EvtType.Errored, listener);
  }

  /**
   *
   * @param id
   * @param type
   * @param listener please bind context
   */
  addIdListener(id, type, listener) {
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
  addRegChangedListener(reg, listener) {
    this.addRegListener(reg, Model.EvtType.Changed, listener);
  }

  /**
   *
   * @param reg
   * @param listener please bind context
   */
  addRegErroredListener(reg, listener) {
    this.addRegListener(reg, Model.EvtType.Errored, listener);
  }

  /**
   *
   * @param reg
   * @param type
   * @param listener please bind context
   */
  addRegListener(reg, type, listener) {
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

  fireChangedEvent(id, old, current) {
    this.fireEvent({ model: this, id, old, current, type: Model.EvtType.Changed });
  }

  fireErroredEvent(id, old, current) {
    this.fireEvent({ model: this, id, old, current, type: Model.EvtType.Errored });
  }

  fireEvent(evt) {
    const matchedListeners = [];
    const idListeners = this.idListeners[evt.type] ? this.idListeners[evt.type] : {};
    matchedListeners.push(...idListeners[evt.id] ? idListeners[evt.id] : []);
    const regListeners = this.regListeners[evt.type] ? this.regListeners[evt.type] : {};
    Object.keys(regListeners).forEach(reg => {
      matchedListeners.push(...evt.id.match(reg) ? regListeners[reg] : []);
    });

    matchedListeners.forEach(listener => {
      listener(evt);
    });
    return this;
  }

  getAllErrors() {
    return this.errors;
  }

  getErrors(id) {
    return SK.s4o(this.errors[id]);
  }

  getValidator() {
    return this.validator;
  }

  hasErrors() {
    let rtn = false;
    Object.keys(this.errors).forEach(($modelId) => {
      rtn = rtn || !_.isEmpty(this.errors[$modelId]);
    });
    return rtn;
  }

  rmvIdChangedListener(id, listener) {
    this.rmvIdListener(id, Model.EvtType.Changed, listener);
  }

  rmvIdErroredListener(id, listener) {
    this.rmvIdListener(id, Model.EvtType.Errored, listener);
  }

  rmvIdListener(id, type, listener) {
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

  rmvRegChangedListener(reg, listener) {
    this.rmvRegListener(reg, Model.EvtType.Changed, listener);
  }

  rmvRegErroredListener(reg, listener) {
    this.rmvRegListener(reg, Model.EvtType.Errored, listener);
  }

  rmvRegListener(reg, type, listener) {
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

  skVal(id, value) {
    const oldValue = this.freeObject.skVal(id);
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
  addAllValidatorMonitor() {
    const tmpModelIds = this.getValidator().getModelIds();
    Object.keys(tmpModelIds).forEach(($key) => {
      this.addValidatorMonitor($key, tmpModelIds[$key]);
    });
  }

  addValidatorMonitor(modelId, config) {
    Object.keys(config).forEach(($key) => {
      this.addValidatorRuleMonitor(modelId, $key, config[$key]);
    });
  }

  addValidatorRuleMonitor(modelId, rule, setting) {
    if (!this.monitors[modelId]) {
      this.errors[modelId] = {};
      this.monitors[modelId] = this.validate.bind(modelId);
      this.addIdChangedListener(modelId, this.monitors[modelId]);
    }
    if (rule === Validator.PROP_DEPS) {
      //when dependencies changed, need validate too
      Model.parseSao(setting).forEach(($i) => {
        if (_.isRegExp($i)) {
          this.addRegChangedListener($i, this.monitors[modelId]);
        } else {
          this.addIdChangedListener($i, this.monitors[modelId]);
        }
      });
    } else {
      const tmpSettingDeps = setting[Validator.PROP_DEPS];
      if (tmpSettingDeps) {
        //see Validator.constructor comments
        Model.parseSao(tmpSettingDeps).forEach(($i) => {
          if (_.isRegExp($i)) {
            this.addRegChangedListener($i, this.monitors[modelId]);
          } else {
            this.addIdChangedListener($i, this.monitors[modelId]);
          }
        });
      }
    }
  }

  execValidate(rule, id, func, model, setting) {
    const tmpRtn = func(model, model.skVal(id), setting);
    if (!_.isBoolean(tmpRtn)) { //true or message
      if(!this.errors[id]){
        this.errors[id] = {};
      }
      this.errors[id][rule] = tmpRtn;
    } else {
      delete this.errors[id][rule];
    }
    this.fireErroredEvent(id, model.skVal(id), model.skVal(id));
  }

  rmvValidatorMonitor(id, config) {
    Object.keys(config).forEach(($key) => {
      if ($key === Validator.PROP_DEPS) {
        Model.parseSao(config[$key]).forEach(($i) => {
          if (_.isRegExp($i)) {
            this.rmvRegChangedListener($i, this.monitors[id]);
          } else {
            this.rmvIdChangedListener($i, this.monitors[id]);
          }
        });
      } else {
        this.rmvValidatorRuleMonitor(id, $key, config[$key]);
      }
    });
  }

  rmvValidatorRuleMonitor(id, rule, setting) {
    const tmpSettingDeps = setting[Validator.PROP_DEPS];
    if (tmpSettingDeps) {
      Model.parseSao(tmpSettingDeps).forEach(($i) => {
        if (_.isRegExp($i)) {
          this.rmvRegChangedListener($i, this.monitors[id]);
        } else {
          this.rmvIdChangedListener($i, this.monitors[id]);
        }
      });
    }
  }

  validate(evt) {
    const tmpModelId = this;
    const tmpModel = evt.model;
    const tmpConfig = evt.model.getValidator().getModelIds()[tmpModelId];
    if (tmpConfig && _.isObject(tmpConfig)) {
      Object.keys(tmpConfig).forEach(($key) => {
        if ($key === Validator.PROP_SCENARIO) {
          //ignore
        } else if ($key === Validator.PROP_FUNC) {
          tmpModel.execValidate($key, tmpModelId, tmpConfig[$key], tmpModel, undefined);
        } else {
          const tmpRule = tmpModel.getValidator().getRules()[$key];
          if (_.isFunction(tmpRule)) {
            tmpModel.execValidate($key, tmpModelId, tmpRule, tmpModel, tmpConfig[$key]);
          } else if (_.isObject(tmpRule) && _.isFunction(tmpRule[Validator.PROP_FUNC])) {
            tmpModel.execValidate($key, tmpModelId, tmpRule[Validator.PROP_FUNC], tmpModel, undefined);
          }
        }
      });
    }
  }

  validateByScenario(scenario) {
    const configs = this.getValidator().getModelIds();
    Object.keys(configs).forEach(($modelId) => {
      if (!scenario || scenario === configs[$modelId][Validator.PROP_SCENARIO]) {
        this.validate.call($modelId, { model: this });
      }
    });
  }

  //validator end
}
