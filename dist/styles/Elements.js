"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewLaneButton = exports.CancelButton = exports.AddButton = exports.ExpandBtn = exports.CollapseBtn = exports.ExpandCollapseBase = exports.DeleteIcon = exports.DelButton = exports.DeleteWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Base = require("./Base");

const DeleteWrapper = _styledComponents.default.div`
  text-align: center;
  position: absolute;
  top: -1px;
  right: 2px;
`;
exports.DeleteWrapper = DeleteWrapper;
const DelButton = _styledComponents.default.button`
  font-weight: bold;
  border: none;
  display: inline-block;
  font-size: 8px;
  opacity: 0;
  height: 15px;
  line-height: 1px;
  margin: 0 0 8px;
  padding: 0;
  text-align: center;
  width: 15px;
  background: inherit;
  cursor: pointer;
  
  ${_Base.MovableCardWrapper}:hover & {
    opacity: 1;
  }
`;
exports.DelButton = DelButton;
const DeleteIcon = _styledComponents.default.span`
  position: relative;
  display: inline-block;
  width: 4px;
  height: 4px;
  opacity: 1;
  overflow: hidden;
  border: 1px solid #83bd42;
  border-radius: 50%;
  padding: 4px;
  background-color: #83bd42;

  ${_Base.CardWrapper}:hover & {
    opacity: 1;
  }

  &:hover::before,
  &:hover::after {
    background: red;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 2px;
    width: 60%;
    top: 45%;
    left: 20%;
    background: #fff;
    border-radius: 5px;
  }

  &:before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;
exports.DeleteIcon = DeleteIcon;
const ExpandCollapseBase = _styledComponents.default.span`
  width: 36px;
  margin: 0 auto;
  font-size: 14px;
  position: relative;
  cursor: pointer;
`;
exports.ExpandCollapseBase = ExpandCollapseBase;
const CollapseBtn = (0, _styledComponents.default)(ExpandCollapseBase)`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 7px solid #444;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-radius: 6px;
  }
  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    border-bottom: 3px solid #e3e3e3;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }
`;
exports.CollapseBtn = CollapseBtn;
const ExpandBtn = (0, _styledComponents.default)(ExpandCollapseBase)`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top: 7px solid #444;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-radius: 6px;
  }
  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: 0px;
    border-top: 3px solid #e3e3e3;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }
`;
exports.ExpandBtn = ExpandBtn;
const AddButton = _styledComponents.default.button`
  background: #5aac44;
  color: #fff;
  transition: background 0.3s ease;
  min-height: 32px;
  padding: 4px 16px;
  vertical-align: top;
  margin-top: 0;
  margin-right: 8px;
  font-weight: bold;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 0;
`;
exports.AddButton = AddButton;
const CancelButton = _styledComponents.default.button`
  background: #999999;
  color: #fff;
  transition: background 0.3s ease;
  min-height: 32px;
  padding: 4px 16px;
  vertical-align: top;
  margin-top: 0;
  font-weight: bold;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 0;
`;
exports.CancelButton = CancelButton;
const NewLaneButton = _styledComponents.default.button`
  background: #2b6aa3;
  border: none;
  color: #fff;
  transition: background 0.3s ease;
  min-height: 32px;
  padding: 4px 16px;
  vertical-align: top;
  margin-top: 0;
  margin-right: 0px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 0;
`;
exports.NewLaneButton = NewLaneButton;