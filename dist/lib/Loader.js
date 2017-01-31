"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    "div",
    { className: "loading" },
    _react2.default.createElement("div", { className: "loading-bar" }),
    _react2.default.createElement("div", { className: "loading-bar" }),
    _react2.default.createElement("div", { className: "loading-bar" }),
    _react2.default.createElement("div", { className: "loading-bar" })
  );
};

exports.default = Loader;