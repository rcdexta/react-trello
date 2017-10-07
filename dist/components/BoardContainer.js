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

var _Base = require('../styles/Base');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactDnd = require('react-dnd');

var _reactDndMultiBackend = require('react-dnd-multi-backend');

var _reactDndMultiBackend2 = _interopRequireDefault(_reactDndMultiBackend);

var _HTML5toTouch = require('react-dnd-multi-backend/lib/HTML5toTouch');

var _HTML5toTouch2 = _interopRequireDefault(_HTML5toTouch);

var _Lane = require('./Lane');

var _Lane2 = _interopRequireDefault(_Lane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardActions = require('../actions/BoardActions');
var laneActions = require('../actions/LaneActions');

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
      var eventBus = {
        publish: function publish(event) {
          switch (event.type) {
            case 'ADD_CARD':
              return _this.props.actions.addCard({ laneId: event.laneId, card: event.card });
            case 'REMOVE_CARD':
              return _this.props.actions.removeCard({ laneId: event.laneId, cardId: event.cardId });
            case 'REFRESH_BOARD':
              return _this.props.actions.loadBoard(event.data);
          }
        }
      };
      _this.props.eventBusHandle(eventBus);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BoardContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.actions.loadBoard(this.props.data);
      if (this.props.eventBusHandle) {
        this.wireEventBus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data && nextProps.data !== this.props.data) {
        this.props.actions.loadBoard(nextProps.data);
        this.props.onDataChange && this.props.onDataChange(nextProps.data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          reducerData = _props.reducerData,
          style = _props.style,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['reducerData', 'style']);

      return _react2.default.createElement(
        _Base.BoardDiv,
        (0, _extends3.default)({ style: style }, otherProps),
        reducerData.lanes.map(function (lane) {
          var id = lane.id,
              otherProps = (0, _objectWithoutProperties3.default)(lane, ['id']);
          var _props2 = _this2.props,
              tagStyle = _props2.tagStyle,
              draggable = _props2.draggable,
              handleDragStart = _props2.handleDragStart,
              handleDragEnd = _props2.handleDragEnd,
              onCardClick = _props2.onCardClick,
              onLaneClick = _props2.onLaneClick,
              onLaneScroll = _props2.onLaneScroll,
              laneSortFunction = _props2.laneSortFunction,
              customCardLayout = _props2.customCardLayout,
              cardStyle = _props2.cardStyle,
              children = _props2.children;

          return _react2.default.createElement(_Lane2.default, (0, _extends3.default)({ key: '' + id,
            id: id
          }, otherProps, { tagStyle: tagStyle, draggable: draggable, handleDragStart: handleDragStart, handleDragEnd: handleDragEnd, onCardClick: onCardClick, onLaneClick: onLaneClick, onLaneScroll: onLaneScroll, laneSortFunction: laneSortFunction, customCardLayout: customCardLayout, cardStyle: cardStyle, children: children }));
        })
      );
    }
  }]);
  return BoardContainer;
}(_react.Component);

BoardContainer.propTypes = {
  data: _propTypes2.default.object.isRequired,
  onLaneScroll: _propTypes2.default.func,
  onCardClick: _propTypes2.default.func,
  onLaneClick: _propTypes2.default.func,
  eventBusHandle: _propTypes2.default.func,
  laneSortFunction: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  handleDragStart: _propTypes2.default.func,
  handleDragEnd: _propTypes2.default.func,
  onDataChange: _propTypes2.default.func,
  customCardLayout: _propTypes2.default.bool,
  style: _propTypes2.default.object
};

var mapStateToProps = function mapStateToProps(state) {
  return state.lanes ? { reducerData: state } : {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { actions: (0, _redux.bindActionCreators)((0, _extends3.default)({}, boardActions, laneActions), dispatch) };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactDnd.DragDropContext)((0, _reactDndMultiBackend2.default)(_HTML5toTouch2.default))(BoardContainer));