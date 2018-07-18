'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditableLabel = function (_React$Component) {
  (0, _inherits3.default)(EditableLabel, _React$Component);

  function EditableLabel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EditableLabel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EditableLabel.__proto__ || (0, _getPrototypeOf2.default)(EditableLabel)).call.apply(_ref, [this].concat(args))), _this), _this.state = { text: '' }, _this.getText = function (el) {
      return el.innerText;
    }, _this.onTextChange = function (ev) {
      var text = _this.getText(ev.target);
      _this.setState({ text: text });
    }, _this.onBlur = function () {
      _this.props.onChange(_this.state.text);
    }, _this.onPaste = function (ev) {
      ev.preventDefault();
      var text = ev.clipboardData.getData('text');
      document.execCommand('insertText', false, text);
    }, _this.getClassName = function () {
      var placeholder = _this.state.text === '' ? 'comPlainTextContentEditable--has-placeholder' : '';
      return 'comPlainTextContentEditable ' + placeholder;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EditableLabel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.refDiv.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(_ref2) {
          return _this2.refDiv = _ref2;
        },
        contentEditable: 'true',
        className: this.getClassName(),
        onPaste: this.onPaste,
        onBlur: this.onBlur,
        onInput: this.onTextChange,
        placeholder: this.props.placeholder
      });
    }
  }]);
  return EditableLabel;
}(_react2.default.Component);

EditableLabel.defaultProps = {
  onChange: function onChange() {},
  placeholder: '',
  autoFocus: false
};
EditableLabel.propTypes = {
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool
};

exports.default = EditableLabel;