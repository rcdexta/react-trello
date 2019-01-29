"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Loader = require("../styles/Loader");

const Loader = () => _react.default.createElement(_Loader.LoaderDiv, null, _react.default.createElement(_Loader.LoadingBar, null), _react.default.createElement(_Loader.LoadingBar, null), _react.default.createElement(_Loader.LoadingBar, null), _react.default.createElement(_Loader.LoadingBar, null));

var _default = Loader;
exports.default = _default;