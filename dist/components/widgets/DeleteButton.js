'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Elements = require('../../styles/Elements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteButton = function DeleteButton(props) {
  return _react2.default.createElement(
    _Elements.DeleteWrapper,
    props,
    _react2.default.createElement(_Elements.DeleteIcon, null)
  );
};

exports.default = DeleteButton;