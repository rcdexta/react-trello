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

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Base = require('../styles/Base');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactDnd = require('react-dnd');

var _update = require('react/lib/update');

var _update2 = _interopRequireDefault(_update);

var _DragType = require('../helpers/DragType');

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var laneActions = require('../actions/LaneActions');

var CARD_HEIGHT = 66;
var CARD_MARGIN = 10;
var OFFSET_HEIGHT = 15;

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
      cards: _this.props.cards,
      placeholderIndex: -1
    }, _this.handleScroll = function (evt) {
      var node = evt.target;
      var elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight;
      var onLaneScroll = _this.props.onLaneScroll;

      if (elemScrolPosition <= 0 && onLaneScroll && !_this.state.loading) {
        var currentPage = _this.state.currentPage;

        _this.setState({ loading: true });
        var nextPage = currentPage + 1;
        onLaneScroll(nextPage, _this.props.id).then(function (moreCards) {
          _this.setState({ loading: false });
          _this.props.actions.paginateLane({ laneId: _this.props.id, newCards: moreCards, nextPage: nextPage });
        });
      }
    }, _this.laneDidMount = function (node) {
      if (node) {
        node.addEventListener('scroll', _this.handleScroll);
      }
    }, _this.moveCard = function (dragIndex, hoverIndex) {
      var cards = _this.state.cards;

      var dragCard = cards[dragIndex];

      _this.setState((0, _update2.default)(_this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      }));
    }, _this.sameCards = function (cardsA, cardsB) {
      return cardsA.length === cardsB.length && cardsA.every(function (el, ix) {
        return el.id === cardsB[ix].id;
      });
    }, _this.moveCardAcrossLanes = function (fromLaneId, toLaneId, cardId) {
      _this.props.actions.moveCardAcrossLanes({ fromLaneId: fromLaneId, toLaneId: toLaneId, cardId: cardId });
    }, _this.removeCard = function (laneId, cardId) {
      _this.props.actions.removeCard({ laneId: laneId, cardId: cardId });
    }, _this.renderDragContainer = function () {
      var _this$props = _this.props,
          connectDropTarget = _this$props.connectDropTarget,
          laneSortFunction = _this$props.laneSortFunction,
          onCardClick = _this$props.onCardClick;


      var cardList = _this.sortCards(_this.state.cards, laneSortFunction).map(function (card, idx) {
        return _react2.default.createElement(_Card2.default, (0, _extends3.default)({
          key: card.id,
          index: idx,
          draggable: _this.props.draggable,
          customCardLayout: _this.props.customCardLayout,
          customCard: _this.props.children,
          handleDragStart: _this.props.handleDragStart,
          handleDragEnd: _this.props.handleDragEnd,
          tagStyle: _this.props.tagStyle,
          cardStyle: _this.props.cardStyle,
          moveCard: _this.moveCard,
          moveCardAcrossLanes: _this.moveCardAcrossLanes,
          removeCard: _this.removeCard,
          onClick: function onClick() {
            return onCardClick && onCardClick(card.id, card.metadata);
          }
        }, card));
      });

      if (_this.state.placeholderIndex > -1) {
        cardList.splice(_this.state.placeholderIndex, 0, _react2.default.createElement(_Base.Placeholder, { key: 'placeholder' }));
      }

      return connectDropTarget(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Base.DraggableList,
          null,
          cardList
        )
      ));
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
      if (!this.sameCards(this.props.cards, nextProps.cards)) {
        this.setState({ cards: nextProps.cards, currentPage: nextProps.currentPage });
      }
      if (!nextProps.isOver) {
        this.setState({ placeholderIndex: -1 });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !this.sameCards(this.props.cards, nextProps.cards) || nextState !== this.state;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var loading = this.state.loading;
      var _props = this.props,
          id = _props.id,
          title = _props.title,
          label = _props.label,
          titleStyle = _props.titleStyle,
          onLaneClick = _props.onLaneClick,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['id', 'title', 'label', 'titleStyle', 'onLaneClick']);

      return _react2.default.createElement(
        _Base.Section,
        (0, _extends3.default)({}, otherProps, { key: id, innerRef: this.laneDidMount, onClick: function onClick() {
            return _this2.onLaneClick && _this2.onLaneClick(_this2.id);
          } }),
        _react2.default.createElement(
          _Base.Header,
          null,
          _react2.default.createElement(
            _Base.Title,
            { style: titleStyle },
            title
          ),
          label && _react2.default.createElement(
            _Base.RightContent,
            null,
            label
          )
        ),
        this.renderDragContainer(),
        loading && _react2.default.createElement(_Loader2.default, null)
      );
    }
  }]);
  return Lane;
}(_react.Component);

Lane.propTypes = {
  id: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.node,
  laneSortFunction: _propTypes2.default.func,
  style: _propTypes2.default.object,
  titleStyle: _propTypes2.default.object,
  cards: _propTypes2.default.array,
  label: _propTypes2.default.string,
  onLaneClick: _propTypes2.default.func,
  onLaneScroll: _propTypes2.default.func,
  handleDragStart: _propTypes2.default.func,
  handleDragEnd: _propTypes2.default.func
};

Lane.defaultProps = {
  style: {},
  titleStyle: {},
  label: undefined
};

var cardTarget = {
  drop: function drop(props, monitor, component) {
    var id = props.id;

    var draggedObj = monitor.getItem();
    if (id === draggedObj.laneId) {
      props.actions.updateCards({ laneId: id, cards: component.state.cards });
    }
    component.setState({ placeholderIndex: -1 });
    return {
      laneId: id
    };
  },
  hover: function hover(props, monitor, component) {
    var id = props.id;

    var draggedObj = monitor.getItem();
    if (id === draggedObj.laneId) {
      return;
    }

    var placeholderIndex = getPlaceholderIndex(monitor.getClientOffset().y, (0, _reactDom.findDOMNode)(component).scrollTop);
    component.setState({ placeholderIndex: placeholderIndex });

    return monitor.isOver();

    function getPlaceholderIndex(y, scrollY) {
      // shift placeholder if y position more than card height / 2
      var yPos = y - OFFSET_HEIGHT + scrollY;
      var placeholderIndex = void 0;
      if (yPos < CARD_HEIGHT / 2) {
        placeholderIndex = -1; // place at the start
      } else {
        placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
      }
      return placeholderIndex;
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { actions: (0, _redux.bindActionCreators)(laneActions, dispatch) };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)((0, _reactDnd.DropTarget)(_DragType.DragType.CARD, cardTarget, collect)(Lane));