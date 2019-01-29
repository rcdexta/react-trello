"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _smoothDnd = require("smooth-dnd");

const wrapperClass = _smoothDnd.constants.wrapperClass;

class Draggable extends _react.Component {
  render() {
    if (this.props.render) {
      return _react.default.cloneElement(this.props.render(), {
        className: wrapperClass
      });
    }

    const clsName = `${this.props.className ? this.props.className + ' ' : ''}`;
    return _react.default.createElement("div", (0, _extends2.default)({}, this.props, {
      className: `${clsName}${wrapperClass}`
    }), this.props.children);
  }

}

Draggable.propTypes = {
  render: _propTypes.default.func
};
var _default = Draggable;
exports.default = _default;