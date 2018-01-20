'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Mesgs = require('./Mesgs');

var _Mesgs2 = _interopRequireDefault(_Mesgs);

var _SK = require('./SK');

var _SK2 = _interopRequireDefault(_SK);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {

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
  function Validator() {
    var modelIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Validator);

    this.modelIds = modelIds;
    this.rules = _jquery2.default.extend(true, {}, Validator.RULES, rules);
  } //unimplemented, can be use some modelId as state


  _createClass(Validator, [{
    key: 'getModelIds',
    value: function getModelIds() {
      return this.modelIds;
    }
  }, {
    key: 'getRules',
    value: function getRules() {
      return this.rules;
    }
  }]);

  return Validator;
}();

Validator.PROP_DEPS = 'deps';
Validator.PROP_FUNC = 'func';
Validator.PROP_SCENARIO = 'scenario';
Validator.RULES = {
  required: function required(model, value, settings) {
    if (settings === false) {
      // disable the required check
      return true;
    }
    if (_SK2.default.s4s(value) === _SK2.default.EMPTY) {
      return _Mesgs2.default.get('${field}_is_required').skFmt(settings);
    } else {
      return true;
    }
  }
};
exports.default = Validator;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZhbGlkYXRvci5qcyJdLCJuYW1lcyI6WyJWYWxpZGF0b3IiLCJtb2RlbElkcyIsInJ1bGVzIiwiZXh0ZW5kIiwiUlVMRVMiLCJQUk9QX0RFUFMiLCJQUk9QX0ZVTkMiLCJQUk9QX1NDRU5BUklPIiwicmVxdWlyZWQiLCJtb2RlbCIsInZhbHVlIiwic2V0dGluZ3MiLCJzNHMiLCJFTVBUWSIsImdldCIsInNrRm10Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLFM7O0FBa0JuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSx1QkFBdUM7QUFBQSxRQUEzQkMsUUFBMkIsdUVBQWhCLEVBQWdCO0FBQUEsUUFBWkMsS0FBWSx1RUFBSixFQUFJOztBQUFBOztBQUNyQyxTQUFLRCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxpQkFBRUMsTUFBRixDQUFTLElBQVQsRUFBZSxFQUFmLEVBQW1CSCxVQUFVSSxLQUE3QixFQUFvQ0YsS0FBcEMsQ0FBYjtBQUNELEcsQ0EzQ2lDOzs7OztrQ0E2Q3BCO0FBQ1osYUFBTyxLQUFLRCxRQUFaO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU8sS0FBS0MsS0FBWjtBQUNEOzs7Ozs7QUF0RGtCRixTLENBQ1pLLFMsR0FBWSxNO0FBREFMLFMsQ0FFWk0sUyxHQUFZLE07QUFGQU4sUyxDQUdaTyxhLEdBQWdCLFU7QUFISlAsUyxDQUlaSSxLLEdBQVE7QUFDYkksWUFBVSxrQkFBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVDLFFBQWYsRUFBNEI7QUFDcEMsUUFBSUEsYUFBYSxLQUFqQixFQUF3QjtBQUN0QjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0QsUUFBSSxhQUFHQyxHQUFILENBQU9GLEtBQVAsTUFBa0IsYUFBR0csS0FBekIsRUFBZ0M7QUFDOUIsYUFBTyxnQkFBTUMsR0FBTixDQUFVLHNCQUFWLEVBQWtDQyxLQUFsQyxDQUF3Q0osUUFBeEMsQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFYWSxDO2tCQUpJWCxTIiwiZmlsZSI6IlZhbGlkYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgTWVzZ3MgZnJvbSAnLi9NZXNncyc7XG5pbXBvcnQgU0sgZnJvbSAnLi9TSyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvciB7XG4gIHN0YXRpYyBQUk9QX0RFUFMgPSAnZGVwcyc7XG4gIHN0YXRpYyBQUk9QX0ZVTkMgPSAnZnVuYyc7XG4gIHN0YXRpYyBQUk9QX1NDRU5BUklPID0gJ3NjZW5hcmlvJzsvL3VuaW1wbGVtZW50ZWQsIGNhbiBiZSB1c2Ugc29tZSBtb2RlbElkIGFzIHN0YXRlXG4gIHN0YXRpYyBSVUxFUyA9IHtcbiAgICByZXF1aXJlZDogKG1vZGVsLCB2YWx1ZSwgc2V0dGluZ3MpID0+IHtcbiAgICAgIGlmIChzZXR0aW5ncyA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gZGlzYWJsZSB0aGUgcmVxdWlyZWQgY2hlY2tcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoU0suczRzKHZhbHVlKSA9PT0gU0suRU1QVFkpIHtcbiAgICAgICAgcmV0dXJuIE1lc2dzLmdldCgnJHtmaWVsZH1faXNfcmVxdWlyZWQnKS5za0ZtdChzZXR0aW5ncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBtb2RlbElkc1xuICAgKiB7XG4gICAqICAgXCJpZDFcIjoge1xuICAgKiAgICAgXCJkZXBzXCI6IFwiZGVwZW5kZW5jaWVzOiBvcHRpb24sIGNhbiBiZSBzdHJpbmdbcmVnXSwgc3RyaW5nIGFycmF5IG9yIG9iamVjdFwiLFxuICAgKiAgICAgXCJydWxlXCI6IFwiLi4uXCJcbiAgICogICB9LFxuICAgKiAgIFwiaWQyXCI6IHtcbiAgICogICAgIFwiZGVwc1wiOiBcImRlcGVuZGVuY2llczogb3B0aW9uLCBjYW4gYmUgc3RyaW5nW3JlZ10sIHN0cmluZyBhcnJheSBvciBvYmplY3RcIixcbiAgICogICAgIFwicnVsZTIxXCI6IHtcbiAgICogICAgICAgXCJkZXBzXCI6IFwiZGVwZW5kZW5jaWVzOiBvcHRpb24sIGNhbiBiZSBzdHJpbmdbcmVnXSwgc3RyaW5nIGFycmF5IG9yIG9iamVjdFwiXG4gICAqICAgICB9XG4gICAqICAgfSxcbiAgICogICBcImlkM1wiOiB7XG4gICAqICAgICBcImRlcHNcIjogXCJkZXBlbmRlbmNpZXM6IG9wdGlvbiwgY2FuIGJlIHN0cmluZ1tyZWddLCBzdHJpbmcgYXJyYXkgb3Igb2JqZWN0XCIsXG4gICAqICAgICBcImZ1bmNcIjogXCIuLi5cIlxuICAgKiAgIH0sXG4gICAqICAgXCJpZDNcIjoge1xuICAgKiAgICAgXCJkZXBzXCI6IFwiZGVwZW5kZW5jaWVzOiBvcHRpb24sIGNhbiBiZSBzdHJpbmdbcmVnXSwgc3RyaW5nIGFycmF5IG9yIG9iamVjdFwiLFxuICAgKiAgICAgXCJyZXF1aXJlZFwiOiBcIi4uLlwiXG4gICAqICAgfVxuICAgKiB9XG4gICAqIEBwYXJhbSBydWxlc1xuICAgKi9cbiAgY29uc3RydWN0b3IobW9kZWxJZHMgPSB7fSwgcnVsZXMgPSB7fSkge1xuICAgIHRoaXMubW9kZWxJZHMgPSBtb2RlbElkcztcbiAgICB0aGlzLnJ1bGVzID0gJC5leHRlbmQodHJ1ZSwge30sIFZhbGlkYXRvci5SVUxFUywgcnVsZXMpO1xuICB9XG5cbiAgZ2V0TW9kZWxJZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxJZHM7XG4gIH1cblxuICBnZXRSdWxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlcztcbiAgfVxufVxuIl19