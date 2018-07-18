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

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _DeleteButton = require('./widgets/DeleteButton');

var _DeleteButton2 = _interopRequireDefault(_DeleteButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Card);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call.apply(_ref, [this].concat(args))), _this), _this.removeCard = function (e) {
      var _this$props = _this.props,
          id = _this$props.id,
          laneId = _this$props.laneId,
          removeCard = _this$props.removeCard,
          onDelete = _this$props.onDelete;

      removeCard(laneId, id);
      onDelete(id, laneId);
      e.stopPropagation();
    }, _this.renderBody = function () {
      if (_this.props.customCardLayout) {
        var _this$props2 = _this.props,
            customCard = _this$props2.customCard,
            otherProps = (0, _objectWithoutProperties3.default)(_this$props2, ['customCard']);

        return _react2.default.cloneElement(customCard, (0, _extends3.default)({}, otherProps));
      } else {
        var _this$props3 = _this.props,
            title = _this$props3.title,
            description = _this$props3.description,
            label = _this$props3.label,
            tags = _this$props3.tags;

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
          cardStyle = _props.cardStyle,
          editable = _props.editable,
          hideCardDeleteIcon = _props.hideCardDeleteIcon,
          customCardLayout = _props.customCardLayout,
          dragStyle = _props.dragStyle,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['id', 'cardStyle', 'editable', 'hideCardDeleteIcon', 'customCardLayout', 'dragStyle']);

      var style = customCardLayout ? (0, _extends3.default)({}, cardStyle, { padding: 0 }) : cardStyle;
      return _react2.default.createElement(
        _Base.MovableCardWrapper,
        (0, _extends3.default)({
          key: id,
          'data-id': id,
          style: (0, _extends3.default)({}, style, dragStyle)
        }, otherProps),
        this.renderBody(),
        editable && !hideCardDeleteIcon && _react2.default.createElement(_DeleteButton2.default, { onClick: this.removeCard })
      );
    }
  }]);
  return Card;
}(_react.Component);

Card.defaultProps = {
  cardStyle: {},
  customCardLayout: false,
  onDelete: function onDelete() {},
  editable: false,
  dragStyle: {}
};

Card.propTypes = {
  id: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string,
  index: _propTypes2.default.number,
  description: _propTypes2.default.string,
  label: _propTypes2.default.string,
  tags: _propTypes2.default.array,
  laneId: _propTypes2.default.string.isRequired,
  removeCard: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,
  metadata: _propTypes2.default.object,
  cardStyle: _propTypes2.default.object,
  dragStyle: _propTypes2.default.object,
  tagStyle: _propTypes2.default.object,
  customCardLayout: _propTypes2.default.bool,
  customCard: _propTypes2.default.node,
  editable: _propTypes2.default.bool
};

exports.default = Card;