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

var _Base = require('../styles/Base');

var _DragType = require('../helpers/DragType');

var _reactDnd = require('react-dnd');

var _reactDom = require('react-dom');

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flow = require('lodash.flow');

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Card);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call.apply(_ref, [this].concat(args))), _this), _this.renderBody = function () {
      if (_this.props.customCardLayout) {
        var customCardWithProps = _react2.default.cloneElement(_this.props.customCard, (0, _extends3.default)({}, _this.props));
        return _react2.default.createElement(
          'span',
          null,
          customCardWithProps
        );
      } else {
        var _this$props = _this.props,
            title = _this$props.title,
            description = _this$props.description,
            label = _this$props.label,
            tags = _this$props.tags;

        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            _Base.CardHeader,
            null,
            _react2.default.createElement(
              _Base.CardTitle,
              null,
              title
            ),
            _react2.default.createElement(
              _Base.CardRightContent,
              null,
              label
            )
          ),
          _react2.default.createElement(
            _Base.Detail,
            null,
            description
          ),
          tags && _react2.default.createElement(
            _Base.Footer,
            null,
            tags.map(function (tag) {
              return _react2.default.createElement(_Tag2.default, (0, _extends3.default)({ key: tag.title }, tag, { tagStyle: _this.props.tagStyle }));
            })
          )
        );
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Card, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          isDragging = _props.isDragging,
          cardStyle = _props.cardStyle,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['id', 'connectDragSource', 'connectDropTarget', 'isDragging', 'cardStyle']);

      var opacity = isDragging ? 0 : 1;
      var background = isDragging ? '#CCC' : '#E3E3E3';
      return connectDragSource(connectDropTarget(_react2.default.createElement(
        'div',
        { style: { background: background } },
        _react2.default.createElement(
          _Base.CardWrapper,
          (0, _extends3.default)({ key: id, 'data-id': id }, otherProps, { style: (0, _extends3.default)({}, cardStyle, { opacity: opacity }) }),
          this.renderBody()
        )
      )));
    }
  }]);
  return Card;
}(_react.Component);

var cardSource = {
  canDrag: function canDrag(props) {
    return props.draggable;
  },
  beginDrag: function beginDrag(props) {
    props.handleDragStart && props.handleDragStart(props.id, props.laneId);
    return {
      id: props.id,
      laneId: props.laneId,
      index: props.index,
      card: props
    };
  },
  endDrag: function endDrag(props, monitor) {
    var item = monitor.getItem();
    var dropResult = monitor.getDropResult();
    if (dropResult && dropResult.laneId !== item.laneId) {
      props.moveCardAcrossLanes(item.laneId, dropResult.laneId, item.id);
    }
    props.handleDragEnd && props.handleDragEnd(item.id, item.laneId, dropResult ? dropResult.laneId : item.laneId);
  }
};

var cardTarget = {
  hover: function hover(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;
    var sourceListId = monitor.getItem().laneId;

    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();

    // Get vertical middle
    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    var clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    var hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (props.laneId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

Card.defaultProps = {
  cardStyle: {},
  customCardLayout: false
};

Card.propTypes = {
  id: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string,
  description: _propTypes2.default.string,
  label: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  metadata: _propTypes2.default.object,
  connectDragSource: _propTypes2.default.func.isRequired,
  isDragging: _propTypes2.default.bool.isRequired,
  handleDragStart: _propTypes2.default.func,
  handleDragEnd: _propTypes2.default.func,
  customCardLayout: _propTypes2.default.bool,
  customCard: _propTypes2.default.node
};

exports.default = flow((0, _reactDnd.DropTarget)(_DragType.DragType.CARD, cardTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}), (0, _reactDnd.DragSource)(_DragType.DragType.CARD, cardSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}))(Card);