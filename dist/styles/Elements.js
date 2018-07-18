'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CancelButton = exports.AddButton = exports.ExpandBtn = exports.CollapseBtn = exports.ExpandCollapseBase = exports.DeleteIcon = exports.DeleteWrapper = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  text-align: center;\n  position: absolute;\n  top: -6px;\n  right: -1px;\n'], ['\n  text-align: center;\n  position: absolute;\n  top: -6px;\n  right: -1px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  position: relative;\n  display: inline-block;\n  width: 4px;\n  height: 4px;\n  opacity: 0;\n  overflow: hidden;\n  border: 1px solid #83bd42;\n  border-radius: 50%;\n  padding: 4px;\n  background-color: #83bd42;\n\n  ', ':hover & {\n    opacity: 1;\n  }\n\n  &:hover::before,\n  &:hover::after {\n    background: red;\n  }\n\n  &:before,\n  &:after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 60%;\n    top: 45%;\n    left: 20%;\n    background: #fff;\n    border-radius: 5px;\n  }\n\n  &:before {\n    -webkit-transform: rotate(45deg);\n    -moz-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n    transform: rotate(45deg);\n  }\n\n  &:after {\n    -webkit-transform: rotate(-45deg);\n    -moz-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n  }\n'], ['\n  position: relative;\n  display: inline-block;\n  width: 4px;\n  height: 4px;\n  opacity: 0;\n  overflow: hidden;\n  border: 1px solid #83bd42;\n  border-radius: 50%;\n  padding: 4px;\n  background-color: #83bd42;\n\n  ', ':hover & {\n    opacity: 1;\n  }\n\n  &:hover::before,\n  &:hover::after {\n    background: red;\n  }\n\n  &:before,\n  &:after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 60%;\n    top: 45%;\n    left: 20%;\n    background: #fff;\n    border-radius: 5px;\n  }\n\n  &:before {\n    -webkit-transform: rotate(45deg);\n    -moz-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n    transform: rotate(45deg);\n  }\n\n  &:after {\n    -webkit-transform: rotate(-45deg);\n    -moz-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  width: 36px;\n  margin: 0 auto;\n  font-size: 14px;\n  position: relative;\n  cursor: pointer;\n\n'], ['\n  width: 36px;\n  margin: 0 auto;\n  font-size: 14px;\n  position: relative;\n  cursor: pointer;\n\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  &:before {\n    content: \'\';\n    position: absolute;\n    top: 0;\n    left: 0;\n    border-bottom: 7px solid #444;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n    border-radius: 6px;\n  }\n  &:after {\n    content: \'\';\n    position: absolute;\n    left: 4px;\n    top: 4px;\n    border-bottom: 3px solid #e3e3e3;\n    border-left: 3px solid transparent;\n    border-right: 3px solid transparent;\n  }\n'], ['\n  &:before {\n    content: \'\';\n    position: absolute;\n    top: 0;\n    left: 0;\n    border-bottom: 7px solid #444;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n    border-radius: 6px;\n  }\n  &:after {\n    content: \'\';\n    position: absolute;\n    left: 4px;\n    top: 4px;\n    border-bottom: 3px solid #e3e3e3;\n    border-left: 3px solid transparent;\n    border-right: 3px solid transparent;\n  }\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  &:before {\n    content: \'\';\n    position: absolute;\n    top: 0;\n    left: 0;\n    border-top: 7px solid #444;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n    border-radius: 6px;\n  }\n  &:after {\n    content: \'\';\n    position: absolute;\n    left: 4px;\n    top: 0px;\n    border-top: 3px solid #e3e3e3;\n    border-left: 3px solid transparent;\n    border-right: 3px solid transparent;\n  }\n'], ['\n  &:before {\n    content: \'\';\n    position: absolute;\n    top: 0;\n    left: 0;\n    border-top: 7px solid #444;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n    border-radius: 6px;\n  }\n  &:after {\n    content: \'\';\n    position: absolute;\n    left: 4px;\n    top: 0px;\n    border-top: 3px solid #e3e3e3;\n    border-left: 3px solid transparent;\n    border-right: 3px solid transparent;\n  }\n']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['\n  background: #5aac44;\n  color: #fff;\n  transition: background 0.3s ease;\n  min-height: 32px;\n  padding: 4px 16px;\n  vertical-align: top;\n  margin-top: 0;\n  margin-right: 8px;\n  font-weight: bold;\n  border-radius: 3px;\n  font-size: 14px;\n  cursor: pointer;\n  margin-bottom: 0;\n'], ['\n  background: #5aac44;\n  color: #fff;\n  transition: background 0.3s ease;\n  min-height: 32px;\n  padding: 4px 16px;\n  vertical-align: top;\n  margin-top: 0;\n  margin-right: 8px;\n  font-weight: bold;\n  border-radius: 3px;\n  font-size: 14px;\n  cursor: pointer;\n  margin-bottom: 0;\n']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['\n  background: #999999;\n  color: #fff;\n  transition: background 0.3s ease;\n  min-height: 32px;\n  padding: 4px 16px;\n  vertical-align: top;\n  margin-top: 0;\n  font-weight: bold;\n  border-radius: 3px;\n  font-size: 14px;\n  cursor: pointer;\n  margin-bottom: 0;\n'], ['\n  background: #999999;\n  color: #fff;\n  transition: background 0.3s ease;\n  min-height: 32px;\n  padding: 4px 16px;\n  vertical-align: top;\n  margin-top: 0;\n  font-weight: bold;\n  border-radius: 3px;\n  font-size: 14px;\n  cursor: pointer;\n  margin-bottom: 0;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Base = require('./Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteWrapper = exports.DeleteWrapper = _styledComponents2.default.div(_templateObject);

var DeleteIcon = exports.DeleteIcon = _styledComponents2.default.span(_templateObject2, _Base.CardWrapper);

var ExpandCollapseBase = exports.ExpandCollapseBase = _styledComponents2.default.span(_templateObject3);

var CollapseBtn = exports.CollapseBtn = (0, _styledComponents2.default)(ExpandCollapseBase)(_templateObject4);

var ExpandBtn = exports.ExpandBtn = (0, _styledComponents2.default)(ExpandCollapseBase)(_templateObject5);

var AddButton = exports.AddButton = _styledComponents2.default.button(_templateObject6);

var CancelButton = exports.CancelButton = _styledComponents2.default.button(_templateObject7);