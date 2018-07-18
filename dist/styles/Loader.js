'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingBar = exports.LoaderDiv = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n    0% {\n      transform: scale(1);\n    }\n    20% {\n      transform: scale(1, 2.2);\n    }\n    40% {\n      transform: scale(1);\n    }\n'], ['\n    0% {\n      transform: scale(1);\n    }\n    20% {\n      transform: scale(1, 2.2);\n    }\n    40% {\n      transform: scale(1);\n    }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  text-align: center;\n  margin: 15px 0;\n'], ['\n  text-align: center;\n  margin: 15px 0;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: inline-block;\n  margin: 0 2px;\n  width: 4px;\n  height: 18px;\n  border-radius: 4px;\n  animation: ', ' 1s ease-in-out infinite;\n  background-color: #777;\n\n  &:nth-child(1) {\n    animation-delay: 0.0001s;\n  }\n  &:nth-child(2) {\n    animation-delay: 0.09s;\n  }\n  &:nth-child(3) {\n    animation-delay: 0.18s;\n  }\n  &:nth-child(4) {\n    animation-delay: 0.27s;\n  }\n'], ['\n  display: inline-block;\n  margin: 0 2px;\n  width: 4px;\n  height: 18px;\n  border-radius: 4px;\n  animation: ', ' 1s ease-in-out infinite;\n  background-color: #777;\n\n  &:nth-child(1) {\n    animation-delay: 0.0001s;\n  }\n  &:nth-child(2) {\n    animation-delay: 0.09s;\n  }\n  &:nth-child(3) {\n    animation-delay: 0.18s;\n  }\n  &:nth-child(4) {\n    animation-delay: 0.27s;\n  }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyframeAnimation = (0, _styledComponents.keyframes)(_templateObject);
var LoaderDiv = exports.LoaderDiv = _styledComponents2.default.div(_templateObject2);

var LoadingBar = exports.LoadingBar = _styledComponents2.default.div(_templateObject3, keyframeAnimation);