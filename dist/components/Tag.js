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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function (_Component) {
  (0, _inherits3.default)(Tag, _Component);

  function Tag() {
    (0, _classCallCheck3.default)(this, Tag);
    return (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tag, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          color = _props.color,
          bgcolor = _props.bgcolor,
          tagStyle = _props.tagStyle,
          otherProps = (0, _objectWithoutProperties3.default)(_props, ['title', 'color', 'bgcolor', 'tagStyle']);

      var style = (0, _extends3.default)({ color: color || 'white', backgroundColor: bgcolor || 'orange' }, tagStyle);
      return _react2.default.createElement(
        _Base.TagSpan,
        (0, _extends3.default)({ style: style }, otherProps),
        title
      );
    }
  }]);
  return Tag;
}(_react.Component);

Tag.propTypes = {
  title: _propTypes2.default.string.isRequired,
  color: _propTypes2.default.string,
  bgcolor: _propTypes2.default.string,
  tagStyle: _propTypes2.default.object
};

exports.default = Tag;