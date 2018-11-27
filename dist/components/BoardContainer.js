"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _Container = _interopRequireDefault(require("../dnd/Container"));

var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _Base = require("../styles/Base");

var _Elements = require("../styles/Elements");

var _Lane = _interopRequireDefault(require("./Lane"));

var _NewLane = _interopRequireDefault(require("./NewLane"));

var boardActions = _interopRequireWildcard(require("../actions/BoardActions"));

var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));

class BoardContainer extends _react.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "state", {
      addLaneMode: false
    });
    (0, _defineProperty2.default)(this, "onDragStart", ({
      payload
    }) => {
      const handleLaneDragStart = this.props.handleLaneDragStart;
      handleLaneDragStart(payload.id);
    });
    (0, _defineProperty2.default)(this, "onLaneDrop", ({
      removedIndex,
      addedIndex,
      payload
    }) => {
      const _this$props = this.props,
            actions = _this$props.actions,
            handleLaneDragEnd = _this$props.handleLaneDragEnd;

      if (removedIndex !== addedIndex) {
        handleLaneDragEnd(removedIndex, addedIndex, payload);
      }
    });
    (0, _defineProperty2.default)(this, "getCardDetails", (laneId, cardIndex) => {
      return this.props.reducerData.lanes.find(lane => lane.id === laneId).cards[cardIndex];
    });
    (0, _defineProperty2.default)(this, "getLaneDetails", index => {
      return this.props.reducerData.lanes[index];
    });
    (0, _defineProperty2.default)(this, "wireEventBus", () => {
      const _this$props2 = this.props,
            actions = _this$props2.actions,
            eventBusHandle = _this$props2.eventBusHandle;
      let eventBus = {
        publish: event => {
          switch (event.type) {
            case 'ADD_CARD':
              return actions.addCard({
                laneId: event.laneId,
                card: event.card
              });

            case 'REMOVE_CARD':
              return actions.removeCard({
                laneId: event.laneId,
                cardId: event.cardId
              });

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
    });
    (0, _defineProperty2.default)(this, "hideEditableLane", () => {
      this.setState({
        addLaneMode: false
      });
    });
    (0, _defineProperty2.default)(this, "showEditableLane", () => {
      this.setState({
        addLaneMode: true
      });
    });
    (0, _defineProperty2.default)(this, "addNewLane", params => {
      this.hideEditableLane();
      this.props.actions.addLane(params);
    });
    (0, _defineProperty2.default)(this, "renderNewLane", () => {
      const newLaneTemplate = this.props.newLaneTemplate;

      if (newLaneTemplate) {
        const newCardWithProps = _react.default.cloneElement(newLaneTemplate, {
          onCancel: this.hideEditableLane,
          onAdd: this.addNewLane
        });

        return _react.default.createElement("span", null, newCardWithProps);
      } else {
        return _react.default.createElement(_NewLane.default, {
          onCancel: this.hideEditableLane,
          onAdd: this.addNewLane
        });
      }
    });
  }

  componentDidMount() {
    const _this$props3 = this.props,
          actions = _this$props3.actions,
          eventBusHandle = _this$props3.eventBusHandle;
    actions.loadBoard(this.props.data);

    if (eventBusHandle) {
      this.wireEventBus();
    }
  }

  componentWillReceiveProps(nextProps) {
    // nextProps.data changes when external Board input props change and nextProps.reducerData changes due to event bus or UI changes
    const _this$props4 = this.props,
          data = _this$props4.data,
          reducerData = _this$props4.reducerData,
          onDataChange = _this$props4.onDataChange;

    if (nextProps.reducerData && !(0, _isEqual.default)(reducerData, nextProps.reducerData)) {
      onDataChange(nextProps.reducerData);
    }

    if (nextProps.data && !(0, _isEqual.default)(nextProps.data, data)) {
      this.props.actions.loadBoard(nextProps.data);
      onDataChange(nextProps.data);
    }
  }

  get groupName() {
    const id = this.props.id;
    return `TrelloBoard${id}`;
  }

  render() {
    const _this$props5 = this.props,
          id = _this$props5.id,
          reducerData = _this$props5.reducerData,
          draggable = _this$props5.draggable,
          laneDraggable = _this$props5.laneDraggable,
          laneDragClass = _this$props5.laneDragClass,
          style = _this$props5.style,
          addLaneTitle = _this$props5.addLaneTitle,
          editable = _this$props5.editable,
          canAddLanes = _this$props5.canAddLanes,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props5, ["id", "reducerData", "draggable", "laneDraggable", "laneDragClass", "style", "addLaneTitle", "editable", "canAddLanes"]);
    const addLaneMode = this.state.addLaneMode; // Stick to whitelisting attributes to segregate board and lane props

    const passthroughProps = (0, _pick.default)(this.props, ['onLaneScroll', 'onCardClick', 'onCardDelete', 'onCardAdd', 'onLaneClick', 'addCardLink', 'laneSortFunction', 'draggable', 'cardDraggable', 'collapsibleLanes', 'editable', 'canAddLanes', 'hideCardDeleteIcon', 'customCardLayout', 'customLaneHeader', 'tagStyle', 'handleDragStart', 'handleDragEnd', 'cardDragClass', 'children', 'addLaneTitle', 'addCardTitle', 'newLaneTemplate', 'newCardTemplate']);
    passthroughProps.boardEditable = passthroughProps.editable;
    delete passthroughProps.editable;
    return _react.default.createElement(_Base.BoardDiv, (0, _extends2.default)({
      style: style
    }, otherProps, {
      draggable: false
    }), _react.default.createElement(_Container.default, {
      orientation: "horizontal",
      onDragStart: this.onDragStart,
      dragClass: laneDragClass,
      onDrop: this.onLaneDrop,
      lockAxis: "x",
      getChildPayload: index => this.getLaneDetails(index),
      groupName: this.groupName
    }, reducerData.lanes.map((lane, index) => {
      const id = lane.id,
            droppable = lane.droppable,
            otherProps = (0, _objectWithoutProperties2.default)(lane, ["id", "droppable"]);

      const laneToRender = _react.default.createElement(_Lane.default, (0, _extends2.default)({
        key: id,
        boardId: this.groupName,
        id: id,
        getCardDetails: this.getCardDetails,
        index: index,
        droppable: droppable === undefined ? true : droppable
      }, otherProps, passthroughProps));

      return draggable && laneDraggable ? _react.default.createElement(_Draggable.default, {
        key: lane.id
      }, laneToRender) : _react.default.createElement("span", {
        key: lane.id
      }, laneToRender);
    })), canAddLanes && _react.default.createElement(_Container.default, {
      orientation: "horizontal"
    }, editable && !addLaneMode ? _react.default.createElement(_Base.LaneSection, {
      style: {
        width: 200
      }
    }, _react.default.createElement(_Elements.NewLaneButton, {
      onClick: this.showEditableLane
    }, addLaneTitle)) : addLaneMode && this.renderNewLane()));
  }

}

BoardContainer.propTypes = {
  id: _propTypes.default.string,
  actions: _propTypes.default.object,
  data: _propTypes.default.object.isRequired,
  reducerData: _propTypes.default.object,
  onDataChange: _propTypes.default.func,
  eventBusHandle: _propTypes.default.func,
  onLaneScroll: _propTypes.default.func,
  onCardClick: _propTypes.default.func,
  onCardDelete: _propTypes.default.func,
  onCardAdd: _propTypes.default.func,
  addCardLink: _propTypes.default.node,
  onLaneClick: _propTypes.default.func,
  laneSortFunction: _propTypes.default.func,
  draggable: _propTypes.default.bool,
  collapsibleLanes: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  canAddLanes: _propTypes.default.bool,
  hideCardDeleteIcon: _propTypes.default.bool,
  handleDragStart: _propTypes.default.func,
  handleDragEnd: _propTypes.default.func,
  handleLaneDragStart: _propTypes.default.func,
  handleLaneDragEnd: _propTypes.default.func,
  customCardLayout: _propTypes.default.bool,
  customLaneHeader: _propTypes.default.element,
  style: _propTypes.default.object,
  tagStyle: _propTypes.default.object,
  laneDraggable: _propTypes.default.bool,
  cardDraggable: _propTypes.default.bool,
  cardDragClass: _propTypes.default.string,
  laneDragClass: _propTypes.default.string,
  addLaneTitle: _propTypes.default.string,
  addCardTitle: _propTypes.default.string,
  newLaneTemplate: _propTypes.default.node
};
BoardContainer.defaultProps = {
  onDataChange: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleLaneDragStart: () => {},
  handleLaneDragEnd: () => {},
  editable: false,
  canAddLanes: false,
  hideCardDeleteIcon: false,
  draggable: false,
  collapsibleLanes: false,
  laneDraggable: true,
  cardDraggable: true,
  cardDragClass: 'react_trello_dragClass',
  laneDragClass: 'react_trello_dragLaneClass',
  addLaneTitle: '+ Add another lane',
  addCardTitle: 'Add Card'
};

const mapStateToProps = state => {
  return state.lanes ? {
    reducerData: state
  } : {};
};

const mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)((0, _objectSpread2.default)({}, boardActions, laneActions), dispatch)
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BoardContainer);

exports.default = _default;