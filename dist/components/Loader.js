'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Loader = require('../styles/Loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader() {
  return _react2.default.createElement(
    _Loader.LoaderDiv,
    null,
    _react2.default.createElement(_Loader.LoadingBar, null),
    _react2.default.createElement(_Loader.LoadingBar, null),
    _react2.default.createElement(_Loader.LoadingBar, null),
    _react2.default.createElement(_Loader.LoadingBar, null)
  );
};

exports.default = Loader;