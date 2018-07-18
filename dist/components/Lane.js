'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _reactSmoothDnd = require('react-smooth-dnd');

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _NewCard = require('./NewCard');

var _NewCard2 = _interopRequireDefault(_NewCard);

var _Base = require('../styles/Base');

var _LaneActions = require('../actions/LaneActions');

var laneActions = _interopRequireWildcard(_LaneActions);

var _Elements = require('../styles/Elements');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lane = function (_Component) {
  (0, _inherits3.default)(Lane, _Component);

  function Lane() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Lane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Lane.__proto__ || (0, _getPrototypeOf2.default)(Lane)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      loading: false,
      currentPage: _this.props.currentPage,
      addCardMode: false,
      collapsed: false,
      isDraggingOver: false
    }, _this.handleScroll = function (evt) {
      var node = evt.target;
      var elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight;
      var onLaneScroll = _this.props.onLaneScroll;

      if (elemScrolPosition <= 0 && onLaneScroll && !_this.state.loading) {
        var currentPage = _this.state.currentPage;

        _this.setState({ loading: true });
        var nextPage = currentPage + 1;
        onLaneScroll(nextPage, _this.props.id).then(function (moreCards) {
          if (!moreCards || moreCards.length === 0) {
            // if no cards present, stop retrying until user action
            node.scrollTop = node.scrollTop - 100;
          } else {
            _this.props.actions.paginateLane({
              laneId: _this.props.id,
              newCards: moreCards,
              nextPage: nextPage
            });
          }
          _this.setState({ loading: false });
        });
      }
    }, _this.laneDidMount = function (node) {
      if (node) {
        node.addEventListener('scroll', _this.handleScroll);
      }
    }, _this.removeCard = function (laneId, cardId) {
      _this.props.actions.removeCard({ laneId: laneId, cardId: cardId });
    }, _this.handleCardClick = function (e, card) {
      var onCardClick = _this.props.onCardClick;

      onCardClick && onCardClick(card.id, card.metadata, card.laneId);
      e.stopPropagation();
      e.preventDefault();
    }, _this.showEditableCard = function () {
      _this.setState({ addCardMode: true });
    }, _this.hideEditableCard = function () {
      _this.setState({ addCardMode: false });
    }, _this.addNewCard = function (params) {
      var laneId = _this.props.id;
      var id = (0, _v2.default)();
      _this.hideEditableCard();
      var card = (0, _extends3.default)({}, params, { id: id });
      _this.props.actions.addCard({ laneId: laneId, card: card });
      _this.props.onCardAdd(card, laneId);
    }, _this.renderAddCardLink = function () {
      var addCardLink = _this.props.addCardLink;

      if (addCardLink) {
        return _react2.default.createElement(
          'span',
          { onClick: _this.showEditableCard },
          addCardLink
        );
      } else {
        return _react2.default.createElement(
          _Base.AddCardLink,
          { onClick: _this.showEditableCard },
          'Add Card'
        );
      }
    }, _this.renderNewCard = function () {
      var newCardTemplate = _this.props.newCardTemplate;

      if (newCardTemplate) {
        var newCardWithProps = _react2.default.cloneElement(newCardTemplate, {
          onCancel: _this.hideEditableCard,
          onAdd: _this.addNewCard
        });
        return _react2.default.createElement(
          'span',
          null,
          newCardWithProps
        );
      } else {
        return _react2.default.createElement(_NewCard2.default, { onCancel: _this.hideEditableCard, onAdd: _this.addNewCard });
      }
    }, _this.onDragStart = function (_ref2) {
      var payload = _ref2.payload;
      var handleDragStart = _this.props.handleDragStart;

      handleDragStart && handleDragStart(payload.id, payload.laneId);
    }, _this.shouldAcceptDrop = function (sourceContainerOptions) {
      return _this.props.droppable && sourceContainerOptions.groupName === 'TrelloLane';
    }, _this.onDragEnd = function (laneId, result) {
      var handleDragEnd = _this.props.handleDragEnd;
      var addedIndex = result.addedIndex,
          payload = result.payload;

      if (addedIndex != null) {
        _this.props.actions.moveCardAcrossLanes({
          fromLaneId: payload.laneId,
          toLaneId: laneId,
          cardId: payload.id,
          index: addedIndex
        });
        handleDragEnd && handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, payload);
      }
    }, _this.renderDragContainer = function (isDraggingOver) {
      var _this$props = _this.props,
          laneSortFunction = _this$props.laneSortFunction,
          editable = _this$props.editable,
          hideCardDeleteIcon = _this$props.hideCardDeleteIcon,
          tagStyle = _this$props.tagStyle,
          cardStyle = _this$props.cardStyle,
          draggable = _this$props.draggable,
          cardDraggable = _this$props.cardDraggable,
          cards = _this$props.cards,
          cardDragClass = _this$props.cardDragClass,
          id = _this$props.id;
      var _this$state = _this.state,
          addCardMode = _this$state.addCardMode,
          collapsed = _this$state.collapsed;


      var showableCards = collapsed ? [] : cards;

      var cardList = _this.sortCards(showableCards, laneSortFunction).map(function (card, idx) {
        var cardToRender = _react2.default.createElement(_Card2.default, (0, _extends3.default)({
          key: card.id,
          index: idx,
          customCardLayout: _this.props.customCardLayout,
          customCard: _this.props.children,
          tagStyle: tagStyle,
          cardStyle: cardStyle,
          removeCard: _this.removeCard,
          onClick: function onClick(e) {
            return _this.handleCardClick(e, card);
          },
          onDelete: _this.props.onCardDelete,
          editable: editable,
          hideCardDeleteIcon: hideCardDeleteIcon
        }, card));
        return draggable && cardDraggable ? _react2.default.createElement(
          _reactSmoothDnd.Draggable,
          { key: card.id },
          cardToRender
        ) : _react2.default.createElement(
          'span',
          { key: card.id },
          cardToRender
        );
      });

      return _react2.default.createElement(
        _Base.ScrollableLane,
        { innerRef: _this.laneDidMount, isDraggingOver: isDraggingOver },
        _react2.default.createElement(
          _reactSmoothDnd.Container,
          {
            orientation: 'vertical',
            groupName: 'TrelloLane',
            dragClass: cardDragClass,
            onDragStart: _this.onDragStart,
            onDrop: function onDrop(e) {
              return _this.onDragEnd(id, e);
            },
            onDragEnter: function onDragEnter() {
              return _this.setState({ isDraggingOver: true });
            },
            onDragLeave: function onDragLeave() {
              return _this.setState({ isDraggingOver: false });
            },
            shouldAcceptDrop: _this.shouldAcceptDrop,
            getChildPayload: function getChildPayload(index) {
              return _this.props.getCardDetails(id, index);
            } },
          cardList
        ),
        editable && !addCardMode && _this.renderAddCardLink(),
        addCardMode && _this.renderNewCard()
      );
    }, _this.renderHeader = function () {
      var customLaneHeader = _this.props.customLaneHeader;

      if (customLaneHeader) {
        var customLaneElement = _react2.default.cloneElement(customLaneHeader, (0, _extends3.default)({}, _this.props));
        return _react2.default.createElement(
          'span',
          null,
          customLaneElement
        );
      } else {
        var _this$props2 = _this.props,
            title = _this$props2.title,
            label = _this$props2.label,
            titleStyle = _this$props2.titleStyle,
            labelStyle = _this$props2.labelStyle;

        return _react2.default.createElement(
          _Base.LaneHeader,
          { onDoubleClick: _this.toggleLaneCollapsed },
          _react2.default.createElement(
            _Base.Title,
            { style: titleStyle },
            title
          ),
          label && _react2.default.createElement(
            _Base.RightContent,
            null,
            _react2.default.createElement(
              'span',
              { style: labelStyle },
              label
            )
          )
        );
      }
    }, _this.renderFooter = function () {
      var _this$props3 = _this.props,
          collapsibleLanes = _this$props3.collapsibleLanes,
          cards = _this$props3.cards;
      var collapsed = _this.state.collapsed;

      if (collapsibleLanes && cards.length > 0) {
        return _react2.default.createElement(
          _Base.LaneFooter,
          { onClick: _this.toggleLaneCollapsed },
          collapsed ? _react2.default.createElement(_Elements.ExpandBtn, null) : _react2.default.createElement(_Elements.CollapseBtn, null)
        );
      }
    }, _this.toggleLaneCollapsed = function () {
      _this.props.collapsibleLanes && _this.setState(function (state) {
        return { collapsed: !state.collapsed };
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Lane, [{
    key: 'sortCards',
    value: function sortCards(cards, sortFunction) {
      if (!cards) return [];
      if (!sortFunction) return cards;
      return cards.concat().sort(function (card1, card2) {
        return sortFunction(card1, card2);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _isEqual2.default)(this.props.cards, nextProps.cards)) {
        this.setState({
          currentPage: nextProps.currentPage
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          loading = _state.loading,
          isDraggingOver = _state.isDraggingOver;
      var _props = this.props,
          id = _props.id,
          onLaneClick = _props.onLaneClick,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['id', 'onLaneClick']);

      return _react2.default.createElement(
        _Base.Section,
        (0, _extends3.default)({}, otherProps, { key: id, onClick: function onClick() {
            return onLaneClick && onLaneClick(id);
          }, draggable: false }),
        this.renderHeader(),
        this.renderDragContainer(isDraggingOver),
        loading && _react2.default.createElement(_Loader2.default, null),
        this.renderFooter()
      );
    }
  }]);
  return Lane;
}(_react.Component);

Lane.propTypes = {
  actions: _propTypes2.default.object,
  children: _propTypes2.default.node,
  id: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.node,
  index: _propTypes2.default.number,
  laneSortFunction: _propTypes2.default.func,
  style: _propTypes2.default.object,
  cardStyle: _propTypes2.default.object,
  tagStyle: _propTypes2.default.object,
  titleStyle: _propTypes2.default.object,
  labelStyle: _propTypes2.default.object,
  customLaneHeader: _propTypes2.default.element,
  customCardLayout: _propTypes2.default.bool,
  cards: _propTypes2.default.array,
  label: _propTypes2.default.string,
  currentPage: _propTypes2.default.number,
  draggable: _propTypes2.default.bool,
  collapsibleLanes: _propTypes2.default.bool,
  droppable: _propTypes2.default.bool,
  onLaneScroll: _propTypes2.default.func,
  onCardClick: _propTypes2.default.func,
  onCardDelete: _propTypes2.default.func,
  onCardAdd: _propTypes2.default.func,
  onLaneClick: _propTypes2.default.func,
  newCardTemplate: _propTypes2.default.node,
  addCardLink: _propTypes2.default.node,
  editable: _propTypes2.default.bool,
  cardDraggable: _propTypes2.default.bool,
  cardDragClass: _propTypes2.default.string
};

Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: false,
  onCardAdd: function onCardAdd() {}
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(laneActions, dispatch)
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Lane);