"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Base = require("../styles/Base");

var _Tag = _interopRequireDefault(require("./Tag"));

var _DeleteButton = _interopRequireDefault(require("./widgets/DeleteButton"));

class Card extends _react.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "removeCard", e => {
      const _this$props = this.props,
            id = _this$props.id,
            laneId = _this$props.laneId,
            removeCard = _this$props.removeCard,
            onDelete = _this$props.onDelete;
      removeCard(laneId, id);
      onDelete(id, laneId);
      e.stopPropagation();
    });
    (0, _defineProperty2.default)(this, "renderBody", () => {
      if (this.props.customCardLayout) {
        const _this$props2 = this.props,
              customCard = _this$props2.customCard,
              otherProps = (0, _objectWithoutProperties2.default)(_this$props2, ["customCard"]);
        return _react.default.cloneElement(customCard, (0, _objectSpread2.default)({}, otherProps));
      } else {
        const _this$props3 = this.props,
              title = _this$props3.title,
              description = _this$props3.description,
              label = _this$props3.label,
              tags = _this$props3.tags;
        return _react.default.createElement("span", null, _react.default.createElement(_Base.CardHeader, null, _react.default.createElement(_Base.CardTitle, null, title), _react.default.createElement(_Base.CardRightContent, null, label)), _react.default.createElement(_Base.Detail, null, description), tags && _react.default.createElement(_Base.Footer, null, tags.map(tag => _react.default.createElement(_Tag.default, (0, _extends2.default)({
          key: tag.title
        }, tag, {
          tagStyle: this.props.tagStyle
        })))));
      }
    });
  }

  render() {
    const _this$props4 = this.props,
          id = _this$props4.id,
          cardStyle = _this$props4.cardStyle,
          editable = _this$props4.editable,
          hideCardDeleteIcon = _this$props4.hideCardDeleteIcon,
          customCardLayout = _this$props4.customCardLayout,
          dragStyle = _this$props4.dragStyle,
          onDelete = _this$props4.onDelete,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props4, ["id", "cardStyle", "editable", "hideCardDeleteIcon", "customCardLayout", "dragStyle", "onDelete"]);
    const style = customCardLayout ? (0, _objectSpread2.default)({}, cardStyle, {
      padding: 0
    }) : cardStyle;
    return _react.default.createElement(_Base.MovableCardWrapper, (0, _extends2.default)({
      className: "react-trello-card",
      key: id,
      "data-id": id,
      style: (0, _objectSpread2.default)({}, style, dragStyle)
    }, otherProps), this.renderBody(), editable && !hideCardDeleteIcon && _react.default.createElement(_DeleteButton.default, {
      onClick: this.removeCard
    }));
  }

}

Card.defaultProps = {
  cardStyle: {},
  customCardLayout: false,
  onDelete: () => {},
  editable: false,
  dragStyle: {}
};
Card.propTypes = {
  id: _propTypes.default.string.isRequired,
  title: _propTypes.default.string,
  index: _propTypes.default.number,
  description: _propTypes.default.string,
  label: _propTypes.default.string,
  tags: _propTypes.default.array,
  laneId: _propTypes.default.string.isRequired,
  removeCard: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDelete: _propTypes.default.func,
  metadata: _propTypes.default.object,
  cardStyle: _propTypes.default.object,
  dragStyle: _propTypes.default.object,
  tagStyle: _propTypes.default.object,
  customCardLayout: _propTypes.default.bool,
  customCard: _propTypes.default.node,
  editable: _propTypes.default.bool
};
var _default = Card;
exports.default = _default;