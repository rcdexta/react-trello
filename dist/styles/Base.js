'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddCardLink = exports.TagSpan = exports.Footer = exports.Detail = exports.CardRightContent = exports.CardTitle = exports.CardHeader = exports.MovableCardWrapper = exports.CardWrapper = exports.RightContent = exports.Title = exports.ScrollableLane = exports.LaneFooter = exports.LaneHeader = exports.Section = exports.Header = exports.BoardDiv = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .comPlainTextContentEditable {\n    -webkit-user-modify: read-write-plaintext-only;\n  }\n\n  .comPlainTextContentEditable--has-placeholder::before {\n    content: attr(placeholder);\n    opacity: 0.5;\n    color: inherit;\n    cursor: text;\n  }\n  \n  .react_trello_dragClass {\n    transform: rotate(3deg);\n  }\n  \n  .react_trello_dragLaneClass {\n    transform: rotate(3deg);\n  }\n'], ['\n  .comPlainTextContentEditable {\n    -webkit-user-modify: read-write-plaintext-only;\n  }\n\n  .comPlainTextContentEditable--has-placeholder::before {\n    content: attr(placeholder);\n    opacity: 0.5;\n    color: inherit;\n    cursor: text;\n  }\n  \n  .react_trello_dragClass {\n    transform: rotate(3deg);\n  }\n  \n  .react_trello_dragLaneClass {\n    transform: rotate(3deg);\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: #23719f;\n  overflow-y: hidden;\n  padding: 5px;\n  color: #393939;\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  height: 100vh;\n'], ['\n  background-color: #23719f;\n  overflow-y: hidden;\n  padding: 5px;\n  color: #393939;\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  height: 100vh;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n'], ['\n  margin-bottom: 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: #e3e3e3;\n  border-radius: 3px;\n  margin: 5px 5px;\n  position: relative;\n  padding: 10px;\n  display: inline-flex;\n  height: auto;\n  max-height: 90%;\n  flex-direction: column;\n'], ['\n  background-color: #e3e3e3;\n  border-radius: 3px;\n  margin: 5px 5px;\n  position: relative;\n  padding: 10px;\n  display: inline-flex;\n  height: auto;\n  max-height: 90%;\n  flex-direction: column;\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n\tz-index: 1000;\n\tpadding: 0px 5px;\n\tmargin-bottom: 0px;\n'], ['\n\tz-index: 1000;\n\tpadding: 0px 5px;\n\tmargin-bottom: 0px;\n']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  position: relative;\n  height: 10px;\n'], ['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  position: relative;\n  height: 10px;\n']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['\n\tflex: 1;\n\toverflow-y: auto;\n\tmin-width: 250px;\n\toverflow-x: hidden;\n\talign-self: center;\n\tmax-height: 90vh;\n\tpadding-bottom: ', ';\n\tmargin-top: 10px;\n\tflex-direction: column;\n\tjustify-content: space-between;\n'], ['\n\tflex: 1;\n\toverflow-y: auto;\n\tmin-width: 250px;\n\toverflow-x: hidden;\n\talign-self: center;\n\tmax-height: 90vh;\n\tpadding-bottom: ', ';\n\tmargin-top: 10px;\n\tflex-direction: column;\n\tjustify-content: space-between;\n']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['\n  font-weight: bold;\n  font-size: 15px;\n  line-height: 18px;\n  cursor: grab;\n  width: 70%;\n'], ['\n  font-weight: bold;\n  font-size: 15px;\n  line-height: 18px;\n  cursor: grab;\n  width: 70%;\n']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['\n  width: 30%;\n  text-align: right;\n  padding-right: 10px;\n  font-size: 13px;\n'], ['\n  width: 30%;\n  text-align: right;\n  padding-right: 10px;\n  font-size: 13px;\n']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['\n  border-radius: 3px;\n  border-bottom: 1px solid #ccc;\n  background-color: #fff;\n  position: relative;\n  padding: 10px;\n  cursor: pointer;\n  max-width: 250px;\n  margin-bottom: 7px;\n  min-width: 230px;\n'], ['\n  border-radius: 3px;\n  border-bottom: 1px solid #ccc;\n  background-color: #fff;\n  position: relative;\n  padding: 10px;\n  cursor: pointer;\n  max-width: 250px;\n  margin-bottom: 7px;\n  min-width: 230px;\n']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['\n  &:hover {\n    background-color: #f0f0f0;\n  }\n'], ['\n  &:hover {\n    background-color: #f0f0f0;\n  }\n']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['\n  border-bottom: 1px solid #eee;\n  padding-bottom: 6px;\n'], ['\n  border-bottom: 1px solid #eee;\n  padding-bottom: 6px;\n']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 14px;\n'], ['\n  font-size: 14px;\n']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 10px;\n'], ['\n  font-size: 10px;\n']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 12px;\n  color: #4d4d4d;\n  white-space: normal;\n'], ['\n  font-size: 12px;\n  color: #4d4d4d;\n  white-space: normal;\n']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['\n  border-top: 1px solid #eee;\n  padding-top: 6px;\n  text-align: right;\n  display: flex;\n  justify-content: flex-end;\n  flex-direction: row;\n  flex-wrap: wrap;\n'], ['\n  border-top: 1px solid #eee;\n  padding-top: 6px;\n  text-align: right;\n  display: flex;\n  justify-content: flex-end;\n  flex-direction: row;\n  flex-wrap: wrap;\n']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['\n  padding: 2px 3px;\n  border-radius: 3px;\n  margin: 2px 5px;\n  font-size: 70%;\n'], ['\n  padding: 2px 3px;\n  border-radius: 3px;\n  margin: 2px 5px;\n  font-size: 70%;\n']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['\n  border-radius: 0 0 3px 3px;\n  color: #838c91;\n  display: block;\n  padding: 5px 2px;\n  position: absolute;\n  text-decoration: none;\n  cursor: pointer;\n  bottom: 3px;\n\n  &:hover {\n    //background-color: #cdd2d4;\n    color: #4d4d4d;\n    text-decoration: underline;\n  }\n'], ['\n  border-radius: 0 0 3px 3px;\n  color: #838c91;\n  display: block;\n  padding: 5px 2px;\n  position: absolute;\n  text-decoration: none;\n  cursor: pointer;\n  bottom: 3px;\n\n  &:hover {\n    //background-color: #cdd2d4;\n    color: #4d4d4d;\n    text-decoration: underline;\n  }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _styledComponents.injectGlobal)(_templateObject);

var BoardDiv = exports.BoardDiv = _styledComponents2.default.div(_templateObject2);

var Header = exports.Header = _styledComponents2.default.header(_templateObject3);

var Section = exports.Section = _styledComponents2.default.section(_templateObject4);

var LaneHeader = exports.LaneHeader = (0, _styledComponents2.default)(Header)(_templateObject5);

var LaneFooter = exports.LaneFooter = _styledComponents2.default.div(_templateObject6);

var ScrollableLane = exports.ScrollableLane = _styledComponents2.default.div(_templateObject7, function (props) {
  return props.isDraggingOver ? '130px' : '30px';
});

var Title = exports.Title = _styledComponents2.default.span(_templateObject8);

var RightContent = exports.RightContent = _styledComponents2.default.span(_templateObject9);
var CardWrapper = exports.CardWrapper = _styledComponents2.default.article(_templateObject10);

var MovableCardWrapper = exports.MovableCardWrapper = (0, _styledComponents2.default)(CardWrapper)(_templateObject11);

var CardHeader = exports.CardHeader = (0, _styledComponents2.default)(Header)(_templateObject12);

var CardTitle = exports.CardTitle = (0, _styledComponents2.default)(Title)(_templateObject13);

var CardRightContent = exports.CardRightContent = (0, _styledComponents2.default)(RightContent)(_templateObject14);

var Detail = exports.Detail = _styledComponents2.default.div(_templateObject15);

var Footer = exports.Footer = _styledComponents2.default.div(_templateObject16);

var TagSpan = exports.TagSpan = _styledComponents2.default.span(_templateObject17);

var AddCardLink = exports.AddCardLink = _styledComponents2.default.a(_templateObject18);