"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

class EditableLabel extends _react.default.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "state", {
      text: ''
    });
    (0, _defineProperty2.default)(this, "getText", el => {
      return el.innerText;
    });
    (0, _defineProperty2.default)(this, "onTextChange", ev => {
      const text = this.getText(ev.target);
      this.setState({
        text: text
      });
    });
    (0, _defineProperty2.default)(this, "onBlur", () => {
      this.props.onChange(this.state.text);
    });
    (0, _defineProperty2.default)(this, "onPaste", ev => {
      ev.preventDefault();
      const text = ev.clipboardData.getData('text');
      document.execCommand('insertText', false, text);
    });
    (0, _defineProperty2.default)(this, "getClassName", () => {
      const placeholder = this.state.text === '' ? 'comPlainTextContentEditable--has-placeholder' : '';
      return `comPlainTextContentEditable ${placeholder}`;
    });
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.refDiv.focus();
    }
  }

  render() {
    return _react.default.createElement("div", {
      ref: _ref => this.refDiv = _ref,
      contentEditable: "true",
      className: this.getClassName(),
      onPaste: this.onPaste,
      onBlur: this.onBlur,
      onInput: this.onTextChange,
      placeholder: this.props.placeholder
    });
  }

}

EditableLabel.defaultProps = {
  onChange: () => {},
  placeholder: '',
  autoFocus: false
};
EditableLabel.propTypes = {
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  autoFocus: _propTypes.default.bool
};
var _default = EditableLabel;
exports.default = _default;