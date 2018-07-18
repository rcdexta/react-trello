'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Base = require('../styles/Base');

var _EditableLabel = require('./widgets/EditableLabel');

var _EditableLabel2 = _interopRequireDefault(_EditableLabel);

var _Elements = require('../styles/Elements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewCard = function (_Component) {
  (0, _inherits3.default)(NewCard, _Component);

  function NewCard() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, NewCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = NewCard.__proto__ || (0, _getPrototypeOf2.default)(NewCard)).call.apply(_ref, [this].concat(args))), _this), _this.updateField = function (field, value) {
      _this.setState((0, _defineProperty3.default)({}, field, value));
    }, _this.handleAdd = function () {
      _this.props.onAdd(_this.state);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(NewCard, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var onCancel = this.props.onCancel;

      return _react2.default.createElement(
        'div',
        { style: { background: '#E3E3E3' } },
        _react2.default.createElement(
          _Base.CardWrapper,
          null,
          _react2.default.createElement(
            _Base.CardHeader,
            null,
            _react2.default.createElement(
              _Base.CardTitle,
              null,
              _react2.default.createElement(_EditableLabel2.default, { placeholder: 'title', onChange: function onChange(val) {
                  return _this2.updateField('title', val);
                }, autoFocus: true })
            ),
            _react2.default.createElement(
              _Base.CardRightContent,
              null,
              _react2.default.createElement(_EditableLabel2.default, { placeholder: 'label', onChange: function onChange(val) {
                  return _this2.updateField('label', val);
                } })
            )
          ),
          _react2.default.createElement(
            _Base.Detail,
            null,
            _react2.default.createElement(_EditableLabel2.default, { placeholder: 'description', onChange: function onChange(val) {
                return _this2.updateField('description', val);
              } })
          )
        ),
        _react2.default.createElement(
          _Elements.AddButton,
          { onClick: this.handleAdd },
          'Add'
        ),
        _react2.default.createElement(
          _Elements.CancelButton,
          { onClick: onCancel },
          'Cancel'
        )
      );
    }
  }]);
  return NewCard;
}(_react.Component);

NewCard.propTypes = {
  onCancel: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func.isRequired
};
NewCard.defaultProps = {};

exports.default = NewCard;