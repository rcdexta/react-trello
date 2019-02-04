"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewLaneButtons = exports.NewLaneSection = exports.LaneSection = exports.LaneTitle = exports.AddCardLink = exports.TagSpan = exports.Footer = exports.Detail = exports.CardRightContent = exports.CardTitle = exports.CardHeader = exports.MovableCardWrapper = exports.CardWrapper = exports.RightContent = exports.Title = exports.ScrollableLane = exports.LaneFooter = exports.LaneHeader = exports.Section = exports.Header = exports.BoardDiv = exports.GlobalStyle = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

const GlobalStyle = _styledComponents.createGlobalStyle`
  .comPlainTextContentEditable {
    -webkit-user-modify: read-write-plaintext-only;
  }

  .comPlainTextContentEditable--has-placeholder::before {
    content: attr(placeholder);
    opacity: 0.5;
    color: inherit;
    cursor: text;
  }
  
  .react_trello_dragClass {
    transform: rotate(3deg);
  }
  
  .react_trello_dragLaneClass {
    transform: rotate(3deg);
  }  
`;
exports.GlobalStyle = GlobalStyle;
const BoardDiv = _styledComponents.default.div`
  background-color: #3179ba;
  overflow-y: hidden;
  padding: 5px;
  color: #393939;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
`;
exports.BoardDiv = BoardDiv;
const Header = _styledComponents.default.header`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
exports.Header = Header;
const Section = _styledComponents.default.section`
  background-color: #e3e3e3;
  border-radius: 3px;
  margin: 5px 5px;
  position: relative;
  padding: 10px;
  display: inline-flex;
  height: auto;
  max-height: 90%;
  flex-direction: column;
`;
exports.Section = Section;
const LaneHeader = (0, _styledComponents.default)(Header)`
  padding: 0px 5px;
  margin-bottom: 0px;
`;
exports.LaneHeader = LaneHeader;
const LaneFooter = _styledComponents.default.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  height: 10px;
`;
exports.LaneFooter = LaneFooter;
const ScrollableLane = _styledComponents.default.div`
  flex: 1;
  overflow-y: auto;
  min-width: 250px;
  overflow-x: hidden;
  align-self: center;
  max-height: 90vh;
  padding-bottom: 30px;
  margin-top: 10px;
  flex-direction: column;
  justify-content: space-between;
`;
exports.ScrollableLane = ScrollableLane;
const Title = _styledComponents.default.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: grab;
  width: 70%;
`;
exports.Title = Title;
const RightContent = _styledComponents.default.span`
  width: 30%;
  text-align: right;
  padding-right: 10px;
  font-size: 13px;
`;
exports.RightContent = RightContent;
const CardWrapper = _styledComponents.default.article`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  padding: 10px;
  cursor: pointer;
  max-width: 250px;
  margin-bottom: 7px;
  min-width: 230px;
`;
exports.CardWrapper = CardWrapper;
const MovableCardWrapper = (0, _styledComponents.default)(CardWrapper)`
  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;
exports.MovableCardWrapper = MovableCardWrapper;
const CardHeader = (0, _styledComponents.default)(Header)`
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
  color: #000;
`;
exports.CardHeader = CardHeader;
const CardTitle = (0, _styledComponents.default)(Title)`
  font-size: 14px;
`;
exports.CardTitle = CardTitle;
const CardRightContent = (0, _styledComponents.default)(RightContent)`
  font-size: 10px;
`;
exports.CardRightContent = CardRightContent;
const Detail = _styledComponents.default.div`
  font-size: 12px;
  color: #4d4d4d;
  white-space: normal;
`;
exports.Detail = Detail;
const Footer = _styledComponents.default.div`
  border-top: 1px solid #eee;
  padding-top: 6px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: wrap;
`;
exports.Footer = Footer;
const TagSpan = _styledComponents.default.span`
  padding: 2px 3px;
  border-radius: 3px;
  margin: 2px 5px;
  font-size: 70%;
`;
exports.TagSpan = TagSpan;
const AddCardLink = _styledComponents.default.a`
  border-radius: 0 0 3px 3px;
  color: #838c91;
  display: block;
  padding: 5px 2px;
  position: absolute;
  text-decoration: none;
  cursor: pointer;
  bottom: 3px;

  &:hover {
    //background-color: #cdd2d4;
    color: #4d4d4d;
    text-decoration: underline;
  }
`;
exports.AddCardLink = AddCardLink;
const LaneTitle = _styledComponents.default.div`
  font-size: 15px;
  width: 268px;
  height: auto;
`;
exports.LaneTitle = LaneTitle;
const LaneSection = _styledComponents.default.section`
  background-color: #2b6aa3;
  border-radius: 3px;
  margin: 5px;
  position: relative;
  padding: 5px;
  display: inline-flex;
  height: auto;
  flex-direction: column;
`;
exports.LaneSection = LaneSection;
const NewLaneSection = (0, _styledComponents.default)(LaneSection)`
  background-color: #e0e3e6;
`;
exports.NewLaneSection = NewLaneSection;
const NewLaneButtons = _styledComponents.default.div`
  margin-top: 10px;
`;
exports.NewLaneButtons = NewLaneButtons;