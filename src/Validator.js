import $ from 'jquery';
import Mesgs from './Mesgs';
import SK from './SK';

export default class Validator {
  static PROP_DEPS = 'deps';
  static PROP_FUNC = 'func';
  static PROP_SCENARIO = 'scenario';//unimplemented, can be use some modelId as state
  static RULES = {
    required: (model, value, settings) => {
      if (settings === false) {
        // disable the required check
        return true;
      }
      if (SK.s4s(value) === SK.EMPTY) {
        return Mesgs.get('${field}_is_required').skFmt(settings);
      } else {
        return true;
      }
    }
  };

  /**
   *
   * @param modelIds
   * {
   *   "id1": {
   *     "deps": "dependencies: option, can be string[reg], string array or object",
   *     "rule": "..."
   *   },
   *   "id2": {
   *     "deps": "dependencies: option, can be string[reg], string array or object",
   *     "rule21": {
   *       "deps": "dependencies: option, can be string[reg], string array or object"
   *     }
   *   },
   *   "id3": {
   *     "deps": "dependencies: option, can be string[reg], string array or object",
   *     "func": "..."
   *   },
   *   "id3": {
   *     "deps": "dependencies: option, can be string[reg], string array or object",
   *     "required": "..."
   *   }
   * }
   * @param rules
   */
  constructor(modelIds = {}, rules = {}) {
    this.modelIds = modelIds;
    this.rules = $.extend(true, {}, Validator.RULES, rules);
  }

  getModelIds() {
    return this.modelIds;
  }

  getRules() {
    return this.rules;
  }
}
