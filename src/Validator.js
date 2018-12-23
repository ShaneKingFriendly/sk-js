import $ from 'jquery';
import Mesgs from './Mesgs';
import SK from './SK';

export default class Validator {
  static PROP_DEPS = 'deps';
  static PROP_FUNC = 'func';
  static RULES = {
    required: (model, value, settings) => {
      return SK.s4s(value) === SK.CHAR_EMPTY ? Mesgs.get('$#{field}_is_required').skFmt({field: Mesgs.get(settings.field)}) : true;
    },
    email: (model, value, settings) => {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value) ? true : Mesgs.get('$#{field}_must_be_an_email').skFmt({field: Mesgs.get(settings.field)});
    },
    lengthRange: (model, value, settings) => {
      let tmpValue = SK.s4s(value);
      let minExist = settings.min !== undefined;
      let maxExist = settings.max !== undefined;
      if (minExist && maxExist) {
        return tmpValue.length > settings.min && tmpValue.length < settings.max ? true : Mesgs.get('$#{field}_length_must_be_between_$#{min}_$#{max}').skFmt({
          field: Mesgs.get(settings.field),
          min: settings.min,
          max: settings.max
        });
      } else if (minExist && !maxExist) {
        return tmpValue.length > settings.min ? true : Mesgs.get('$#{field}_length_must_be_greater_than_$#{min}').skFmt({
          field: Mesgs.get(settings.field),
          min: settings.min
        });
      } else if (!minExist && maxExist) {
        return tmpValue.length < settings.max ? true : Mesgs.get('$#{field}_length_must_be_less_than_$#{max}').skFmt({
          field: Mesgs.get(settings.field),
          max: settings.max
        });
      } else {
        return true;
      }
    },
    numberRange: (model, value, settings) => {
      let tmpValue = SK.s4n(value);
      let minExist = settings.min !== undefined;
      let maxExist = settings.max !== undefined;
      if (minExist && maxExist) {
        return tmpValue > SK.s4n(settings.min) && tmpValue < SK.s4n(settings.max) ? true : Mesgs.get('$#{field}_value_must_be_between_$#{min}_$#{max}').skFmt({
          field: Mesgs.get(settings.field),
          min: settings.min,
          max: settings.max
        });
      } else if (minExist && !maxExist) {
        return tmpValue > SK.s4n(settings.min) ? true : Mesgs.get('$#{field}_value_must_be_greater_than_$#{min}').skFmt({
          field: Mesgs.get(settings.field),
          min: settings.min
        });
      } else if (!minExist && maxExist) {
        return tmpValue < SK.s4n(settings.max) ? true : Mesgs.get('$#{field}_value_must_be_less_than_$#{max}').skFmt({
          field: Mesgs.get(settings.field),
          max: settings.max
        });
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
   *     "func": "custom rule by function",
   *     "rule1": {
   *       "field": "x.xx.xxx, this is i18n mesg for required rule"
   *     },
   *     "rule2": {
   *       "exec": "enable function"
   *     }
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
