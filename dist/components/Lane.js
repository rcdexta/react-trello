"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _Container = _interopRequireDefault(require("../dnd/Container"));

var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _Loader = _interopRequireDefault(require("./Loader"));

var _Card = _interopRequireDefault(require("./Card"));

var _NewCard = _interopRequireDefault(require("./NewCard"));

var _Base = require("../styles/Base");

var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));

var _Elements = require("../styles/Elements");

class Lane extends _react.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "state", {
      loading: false,
      currentPage: this.props.currentPage,
      addCardMode: false,
      collapsed: false,
      isDraggingOver: false
    });
    (0, _defineProperty2.default)(this, "handleScroll", evt => {
      const node = evt.target;
      const elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight;
      const onLaneScroll = this.props.onLaneScroll;

      if (elemScrolPosition <= 0 && onLaneScroll && !this.state.loading) {
        const currentPage = this.state.currentPage;
        this.setState({
          loading: true
        });
        const nextPage = currentPage + 1;
        onLaneScroll(nextPage, this.props.id).then(moreCards => {
          if (!moreCards || moreCards.length === 0) {
            // if no cards present, stop retrying until user action
            node.scrollTop = node.scrollTop - 100;
          } else {
            this.props.actions.paginateLane({
              laneId: this.props.id,
              newCards: moreCards,
              nextPage: nextPage
            });
          }

          this.setState({
            loading: false
          });
        });
      }
    });
    (0, _defineProperty2.default)(this, "laneDidMount", node => {
      if (node) {
        node.addEventListener('scroll', this.handleScroll);
      }
    });
    (0, _defineProperty2.default)(this, "removeCard", (laneId, cardId) => {
      this.props.actions.removeCard({
        laneId: laneId,
        cardId: cardId
      });
    });
    (0, _defineProperty2.default)(this, "handleCardClick", (e, card) => {
      const onCardClick = this.props.onCardClick;
      onCardClick && onCardClick(card.id, card.metadata, card.laneId);
      e.stopPropagation();
      e.preventDefault();
    });
    (0, _defineProperty2.default)(this, "showEditableCard", () => {
      this.setState({
        addCardMode: true
      });
    });
    (0, _defineProperty2.default)(this, "hideEditableCard", () => {
      this.setState({
        addCardMode: false
      });
    });
    (0, _defineProperty2.default)(this, "addNewCard", params => {
      const laneId = this.props.id;
      const id = (0, _v.default)();
      this.hideEditableCard();
      let card = (0, _objectSpread2.default)({
        id
      }, params);
      this.props.actions.addCard({
        laneId,
        card
      });
      this.props.onCardAdd(card, laneId);
    });
    (0, _defineProperty2.default)(this, "renderAddCardLink", () => {
      const addCardLink = this.props.addCardLink;

      if (typeof addCardLink !== 'string') {
        return _react.default.createElement("span", {
          onClick: this.showEditableCard
        }, addCardLink);
      } else {
        return _react.default.createElement(_Base.AddCardLink, {
          onClick: this.showEditableCard
        }, addCardLink);
      }
    });
    (0, _defineProperty2.default)(this, "renderNewCard", () => {
      const _this$props = this.props,
            newCardTemplate = _this$props.newCardTemplate,
            id = _this$props.id;

      if (newCardTemplate) {
        const newCardWithProps = _react.default.cloneElement(newCardTemplate, {
          onCancel: this.hideEditableCard,
          onAdd: this.addNewCard,
          laneId: id
        });

        return _react.default.createElement("span", null, newCardWithProps);
      } else {
        return _react.default.createElement(_NewCard.default, {
          onCancel: this.hideEditableCard,
          onAdd: this.addNewCard
        });
      }
    });
    (0, _defineProperty2.default)(this, "onDragStart", ({
      payload
    }) => {
      const handleDragStart = this.props.handleDragStart;
      handleDragStart && handleDragStart(payload.id, payload.laneId);
    });
    (0, _defineProperty2.default)(this, "shouldAcceptDrop", sourceContainerOptions => {
      return this.props.droppable && sourceContainerOptions.groupName === this.groupName;
    });
    (0, _defineProperty2.default)(this, "onDragEnd", (laneId, result) => {
      const handleDragEnd = this.props.handleDragEnd;
      const addedIndex = result.addedIndex,
            payload = result.payload;

      if (addedIndex != null) {
        this.props.actions.moveCardAcrossLanes({
          fromLaneId: payload.laneId,
          toLaneId: laneId,
          cardId: payload.id,
          index: addedIndex
        });
        handleDragEnd && handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, payload);
      }
    });
    (0, _defineProperty2.default)(this, "renderDragContainer", isDraggingOver => {
      const _this$props2 = this.props,
            laneSortFunction = _this$props2.laneSortFunction,
            boardEditable = _this$props2.boardEditable,
            hideCardDeleteIcon = _this$props2.hideCardDeleteIcon,
            tagStyle = _this$props2.tagStyle,
            cardStyle = _this$props2.cardStyle,
            draggable = _this$props2.draggable,
            cardDraggable = _this$props2.cardDraggable,
            cards = _this$props2.cards,
            cardDragClass = _this$props2.cardDragClass,
            editable = _this$props2.editable,
            id = _this$props2.id;
      const _this$state = this.state,
            addCardMode = _this$state.addCardMode,
            collapsed = _this$state.collapsed;
      const showableCards = collapsed ? [] : cards;
      const cardList = this.sortCards(showableCards, laneSortFunction).map((card, idx) => {
        const cardToRender = _react.default.createElement(_Card.default, (0, _extends2.default)({
          key: card.id,
          index: idx,
          customCardLayout: this.props.customCardLayout,
          customCard: this.props.children,
          tagStyle: tagStyle,
          cardStyle: cardStyle,
          removeCard: this.removeCard,
          onClick: e => this.handleCardClick(e, card),
          onDelete: this.props.onCardDelete,
          editable: boardEditable,
          hideCardDeleteIcon: hideCardDeleteIcon
        }, card));

        return draggable && cardDraggable && (!card.hasOwnProperty('draggable') || card.draggable) ? _react.default.createElement(_Draggable.default, {
          key: card.id
        }, cardToRender) : _react.default.createElement("span", {
          key: card.id
        }, cardToRender);
      });
      return _react.default.createElement(_Base.ScrollableLane, {
        innerRef: this.laneDidMount,
        isDraggingOver: isDraggingOver
      }, _react.default.createElement(_Container.default, {
        orientation: "vertical",
        groupName: this.groupName,
        dragClass: cardDragClass,
        onDragStart: this.onDragStart,
        onDrop: e => this.onDragEnd(id, e),
        onDragEnter: () => this.setState({
          isDraggingOver: true
        }),
        onDragLeave: () => this.setState({
          isDraggingOver: false
        }),
        shouldAcceptDrop: this.shouldAcceptDrop,
        getChildPayload: index => this.props.getCardDetails(id, index)
      }, cardList), boardEditable && editable && !addCardMode && this.renderAddCardLink(), addCardMode && this.renderNewCard());
    });
    (0, _defineProperty2.default)(this, "renderHeader", () => {
      const customLaneHeader = this.props.customLaneHeader;

      if (customLaneHeader) {
        const customLaneElement = _react.default.cloneElement(customLaneHeader, (0, _objectSpread2.default)({}, this.props));

        return _react.default.createElement("span", null, customLaneElement);
      } else {
        const _this$props3 = this.props,
              title = _this$props3.title,
              label = _this$props3.label,
              titleStyle = _this$props3.titleStyle,
              labelStyle = _this$props3.labelStyle;
        return _react.default.createElement(_Base.LaneHeader, {
          onDoubleClick: this.toggleLaneCollapsed
        }, _react.default.createElement(_Base.Title, {
          style: titleStyle
        }, title), label && _react.default.createElement(_Base.RightContent, null, _react.default.createElement("span", {
          style: labelStyle
        }, label)));
      }
    });
    (0, _defineProperty2.default)(this, "renderFooter", () => {
      const _this$props4 = this.props,
            collapsibleLanes = _this$props4.collapsibleLanes,
            cards = _this$props4.cards;
      const collapsed = this.state.collapsed;

      if (collapsibleLanes && cards.length > 0) {
        return _react.default.createElement(_Base.LaneFooter, {
          onClick: this.toggleLaneCollapsed
        }, collapsed ? _react.default.createElement(_Elements.ExpandBtn, null) : _react.default.createElement(_Elements.CollapseBtn, null));
      }
    });
    (0, _defineProperty2.default)(this, "toggleLaneCollapsed", () => {
      this.props.collapsibleLanes && this.setState(state => ({
        collapsed: !state.collapsed
      }));
    });
  }

  sortCards(cards, sortFunction) {
    if (!cards) return [];
    if (!sortFunction) return cards;
    return cards.concat().sort(function (card1, card2) {
      return sortFunction(card1, card2);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!(0, _isEqual.default)(this.props.cards, nextProps.cards)) {
      this.setState({
        currentPage: nextProps.currentPage
      });
    }
  }

  get groupName() {
    const boardId = this.props.boardId;
    return `TrelloBoard${boardId}Lane`;
  }

  render() {
    const _this$state2 = this.state,
          loading = _this$state2.loading,
          isDraggingOver = _this$state2.isDraggingOver;
    const _this$props5 = this.props,
          id = _this$props5.id,
          onLaneClick = _this$props5.onLaneClick,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props5, ["id", "onLaneClick"]);
    return _react.default.createElement(_Base.Section, (0, _extends2.default)({}, otherProps, {
      key: id,
      onClick: () => onLaneClick && onLaneClick(id),
      draggable: false
    }), this.renderHeader(), this.renderDragContainer(isDraggingOver), loading && _react.default.createElement(_Loader.default, null), this.renderFooter());
  }

}

Lane.propTypes = {
  actions: _propTypes.default.object,
  children: _propTypes.default.node,
  id: _propTypes.default.string.isRequired,
  boardId: _propTypes.default.string,
  title: _propTypes.default.node,
  index: _propTypes.default.number,
  laneSortFunction: _propTypes.default.func,
  style: _propTypes.default.object,
  cardStyle: _propTypes.default.object,
  tagStyle: _propTypes.default.object,
  titleStyle: _propTypes.default.object,
  labelStyle: _propTypes.default.object,
  customLaneHeader: _propTypes.default.element,
  customCardLayout: _propTypes.default.bool,
  cards: _propTypes.default.array,
  label: _propTypes.default.string,
  currentPage: _propTypes.default.number,
  draggable: _propTypes.default.bool,
  collapsibleLanes: _propTypes.default.bool,
  droppable: _propTypes.default.bool,
  onLaneScroll: _propTypes.default.func,
  onCardClick: _propTypes.default.func,
  onCardDelete: _propTypes.default.func,
  onCardAdd: _propTypes.default.func,
  onLaneClick: _propTypes.default.func,
  newCardTemplate: _propTypes.default.node,
  addCardLink: _propTypes.default.node,
  editable: _propTypes.default.bool,
  cardDraggable: _propTypes.default.bool,
  cardDragClass: _propTypes.default.string
};
Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: true,
  boardEditable: false,
  onCardAdd: () => {},
  addCardLink: 'Add Card'
};

const mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)(laneActions, dispatch)
});

var _default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Lane);

exports.default = _default;