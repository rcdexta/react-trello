'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Base = require('../styles/Base');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _Lane = require('./Lane');

var _Lane2 = _interopRequireDefault(_Lane);

var _reactSmoothDnd = require('react-smooth-dnd');

var _BoardActions = require('../actions/BoardActions');

var boardActions = _interopRequireWildcard(_BoardActions);

var _LaneActions = require('../actions/LaneActions');

var laneActions = _interopRequireWildcard(_LaneActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoardContainer = function (_Component) {
  (0, _inherits3.default)(BoardContainer, _Component);

  function BoardContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BoardContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BoardContainer.__proto__ || (0, _getPrototypeOf2.default)(BoardContainer)).call.apply(_ref, [this].concat(args))), _this), _this.wireEventBus = function () {
      var _this$props = _this.props,
          actions = _this$props.actions,
          eventBusHandle = _this$props.eventBusHandle;

      var eventBus = {
        publish: function publish(event) {
          switch (event.type) {
            case 'ADD_CARD':
              return actions.addCard({ laneId: event.laneId, card: event.card });
            case 'REMOVE_CARD':
              return actions.removeCard({ laneId: event.laneId, cardId: event.cardId });
            case 'REFRESH_BOARD':
              return actions.loadBoard(event.data);
            case 'MOVE_CARD':
              return actions.moveCardAcrossLanes({
                fromLaneId: event.fromLaneId,
                toLaneId: event.toLaneId,
                cardId: event.cardId,
                index: event.index
              });
            case 'UPDATE_LANES':
              return actions.updateLanes(event.lanes);
          }
        }
      };
      eventBusHandle(eventBus);
    }, _this.getCardDetails = function (laneId, cardIndex) {
      return _this.props.reducerData.lanes.find(function (lane) {
        return lane.id === laneId;
      }).cards[cardIndex];
    }, _this.onDragStart = function (_ref2) {
      var payload = _ref2.payload;
      var handleLaneDragStart = _this.props.handleLaneDragStart;

      handleLaneDragStart(payload.id);
    }, _this.onLaneDrop = function (_ref3) {
      var removedIndex = _ref3.removedIndex,
          addedIndex = _ref3.addedIndex,
          payload = _ref3.payload;
      var _this$props2 = _this.props,
          actions = _this$props2.actions,
          handleLaneDragEnd = _this$props2.handleLaneDragEnd;

      actions.moveLane({ oldIndex: removedIndex, newIndex: addedIndex });
      handleLaneDragEnd(payload.id, addedIndex);
    }, _this.getLaneDetails = function (index) {
      return _this.props.reducerData.lanes[index];
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BoardContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          actions = _props.actions,
          eventBusHandle = _props.eventBusHandle;

      actions.loadBoard(this.props.data);
      if (eventBusHandle) {
        this.wireEventBus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // nextProps.data changes when external Board input props change and nextProps.reducerData changes due to event bus or UI changes
      var _props2 = this.props,
          data = _props2.data,
          reducerData = _props2.reducerData,
          onDataChange = _props2.onDataChange;

      if (nextProps.reducerData && !(0, _isEqual2.default)(reducerData, nextProps.reducerData)) {
        onDataChange(nextProps.reducerData);
      }
      if (nextProps.data && !(0, _isEqual2.default)(nextProps.data, data)) {
        this.props.actions.loadBoard(nextProps.data);
        onDataChange(nextProps.data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          id = _props3.id,
          reducerData = _props3.reducerData,
          draggable = _props3.draggable,
          laneDraggable = _props3.laneDraggable,
          laneDragClass = _props3.laneDragClass,
          style = _props3.style,
          otherProps = (0, _objectWithoutProperties3.default)(_props3, ['id', 'reducerData', 'draggable', 'laneDraggable', 'laneDragClass', 'style']);
      // Stick to whitelisting attributes to segregate board and lane props

      var passthroughProps = (0, _pick2.default)(this.props, ['onLaneScroll', 'onCardClick', 'onCardDelete', 'onCardAdd', 'onLaneClick', 'addCardLink', 'laneSortFunction', 'draggable', 'cardDraggable', 'collapsibleLanes', 'editable', 'hideCardDeleteIcon', 'customCardLayout', 'newCardTemplate', 'customLaneHeader', 'tagStyle', 'handleDragStart', 'handleDragEnd', 'cardDragClass', 'children']);

      return _react2.default.createElement(
        _Base.BoardDiv,
        (0, _extends3.default)({ style: style }, otherProps, { draggable: false }),
        _react2.default.createElement(
          _reactSmoothDnd.Container,
          {
            orientation: 'horizontal',
            onDragStart: this.onDragStart,
            dragClass: laneDragClass,
            onDrop: this.onLaneDrop,
            lockAxis: 'x',
            getChildPayload: function getChildPayload(index) {
              return _this2.getLaneDetails(index);
            },
            groupName: 'TrelloBoard' + id },
          reducerData.lanes.map(function (lane, index) {
            var id = lane.id,
                droppable = lane.droppable,
                otherProps = (0, _objectWithoutProperties3.default)(lane, ['id', 'droppable']);

            var laneToRender = _react2.default.createElement(_Lane2.default, (0, _extends3.default)({
              key: id,
              id: id,
              getCardDetails: _this2.getCardDetails,
              index: index,
              droppable: droppable === undefined ? true : droppable
            }, otherProps, passthroughProps));
            return draggable && laneDraggable ? _react2.default.createElement(
              _reactSmoothDnd.Draggable,
              { key: lane.id },
              laneToRender
            ) : _react2.default.createElement(
              'span',
              { key: lane.id },
              laneToRender
            );
          })
        )
      );
    }
  }]);
  return BoardContainer;
}(_react.Component);

BoardContainer.propTypes = {
  id: _propTypes2.default.string,
  actions: _propTypes2.default.object,
  data: _propTypes2.default.object.isRequired,
  reducerData: _propTypes2.default.object,
  onDataChange: _propTypes2.default.func,
  eventBusHandle: _propTypes2.default.func,
  onLaneScroll: _propTypes2.default.func,
  onCardClick: _propTypes2.default.func,
  onCardDelete: _propTypes2.default.func,
  onCardAdd: _propTypes2.default.func,
  addCardLink: _propTypes2.default.node,
  onLaneClick: _propTypes2.default.func,
  laneSortFunction: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  collapsibleLanes: _propTypes2.default.bool,
  editable: _propTypes2.default.bool,
  hideCardDeleteIcon: _propTypes2.default.bool,
  handleDragStart: _propTypes2.default.func,
  handleDragEnd: _propTypes2.default.func,
  handleLaneDragStart: _propTypes2.default.func,
  handleLaneDragEnd: _propTypes2.default.func,
  customCardLayout: _propTypes2.default.bool,
  newCardTemplate: _propTypes2.default.node,
  customLaneHeader: _propTypes2.default.element,
  style: _propTypes2.default.object,
  tagStyle: _propTypes2.default.object,
  laneDraggable: _propTypes2.default.bool,
  cardDraggable: _propTypes2.default.bool,
  cardDragClass: _propTypes2.default.string,
  laneDragClass: _propTypes2.default.string
};

BoardContainer.defaultProps = {
  onDataChange: function onDataChange() {},
  handleDragStart: function handleDragStart() {},
  handleDragEnd: function handleDragEnd() {},
  handleLaneDragStart: function handleLaneDragStart() {},
  handleLaneDragEnd: function handleLaneDragEnd() {},
  editable: false,
  hideCardDeleteIcon: false,
  draggable: false,
  collapsibleLanes: false,
  laneDraggable: true,
  cardDraggable: true,
  cardDragClass: 'react_trello_dragClass',
  laneDragClass: 'react_trello_dragLaneClass'
};

var mapStateToProps = function mapStateToProps(state) {
  return state.lanes ? { reducerData: state } : {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { actions: (0, _redux.bindActionCreators)((0, _extends3.default)({}, boardActions, laneActions), dispatch) };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BoardContainer);