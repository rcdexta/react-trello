"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Base = require("../styles/Base");

var _EditableLabel = _interopRequireDefault(require("./widgets/EditableLabel"));

var _Elements = require("../styles/Elements");

class NewCard extends _react.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "updateField", (field, value) => {
      this.setState({
        [field]: value
      });
    });
    (0, _defineProperty2.default)(this, "handleAdd", () => {
      this.props.onAdd(this.state);
    });
  }

  render() {
    const onCancel = this.props.onCancel;
    return _react.default.createElement("div", {
      style: {
        background: '#E3E3E3'
      }
    }, _react.default.createElement(_Base.CardWrapper, null, _react.default.createElement(_Base.CardHeader, null, _react.default.createElement(_Base.CardTitle, null, _react.default.createElement(_EditableLabel.default, {
      placeholder: "title",
      onChange: val => this.updateField('title', val),
      autoFocus: true
    })), _react.default.createElement(_Base.CardRightContent, null, _react.default.createElement(_EditableLabel.default, {
      placeholder: "label",
      onChange: val => this.updateField('label', val)
    }))), _react.default.createElement(_Base.Detail, null, _react.default.createElement(_EditableLabel.default, {
      placeholder: "description",
      onChange: val => this.updateField('description', val)
    }))), _react.default.createElement(_Elements.AddButton, {
      onClick: this.handleAdd
    }, "Add"), _react.default.createElement(_Elements.CancelButton, {
      onClick: onCancel
    }, "Cancel"));
  }

}

NewCard.propTypes = {
  onCancel: _propTypes.default.func.isRequired,
  onAdd: _propTypes.default.func.isRequired
};
NewCard.defaultProps = {};
var _default = NewCard;
exports.default = _default;