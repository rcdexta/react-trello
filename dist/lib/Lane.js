'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lane = function (_Component) {
  _inherits(Lane, _Component);

  function Lane() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Lane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Lane.__proto__ || Object.getPrototypeOf(Lane)).call.apply(_ref, [this].concat(args))), _this), _this.state = { cards: _this.props.cards, loading: false }, _this.handleScroll = function (evt) {
      var node = evt.target;
      var elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight;
      var onScroll = _this.props.onScroll;

      if (elemScrolPosition <= 0 && onScroll) {
        (function () {
          var cards = _this.state.cards;

          _this.setState({ loading: true });
          onScroll(_this.lastCardId()).then(function (moreCards) {
            _this.setState({ cards: [].concat(_toConsumableArray(cards), _toConsumableArray(moreCards)), loading: false });
          });
        })();
      }
    }, _this.laneDidMount = function (node) {
      if (node) {
        node.addEventListener('scroll', _this.handleScroll);
      }
    }, _this.lastCardId = function () {
      var cards = _this.state.cards;

      return cards[cards.length - 1].props.id;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Lane, [{
    key: 'render',
    value: function render() {
      var loading = this.state.loading;

      var _props = this.props,
          title = _props.title,
          rightHeader = _props.rightHeader,
          cards = _props.cards,
          otherProps = _objectWithoutProperties(_props, ['title', 'rightHeader', 'cards']);

      return _react2.default.createElement(
        'section',
        _extends({ className: 'list' }, otherProps, { ref: this.laneDidMount }),
        _react2.default.createElement(
          'header',
          null,
          _react2.default.createElement(
            'span',
            { className: 'title' },
            title
          ),
          _react2.default.createElement(
            'span',
            { className: 'rightContent' },
            rightHeader
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'drag-inner-list' },
          this.state.cards
        ),
        loading && _react2.default.createElement(_Loader2.default, null)
      );
    }
  }]);

  return Lane;
}(_react.Component);

exports.default = Lane;


Lane.propTypes = {
  title: _react2.default.PropTypes.string.isRequired,
  cards: _react2.default.PropTypes.array,
  rightHeader: _react2.default.PropTypes.string,
  onScroll: _react2.default.PropTypes.func
};