'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _BoardContainer = require('./BoardContainer');

var _BoardContainer2 = _interopRequireDefault(_BoardContainer);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _BoardReducer = require('../reducers/BoardReducer');

var _BoardReducer2 = _interopRequireDefault(_BoardReducer);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = process.env.NODE_ENV === 'development' ? [_reduxLogger2.default] : [];
var store = (0, _redux.createStore)(_BoardReducer2.default, _redux.applyMiddleware.apply(undefined, middlewares));

var Board = function (_Component) {
  (0, _inherits3.default)(Board, _Component);

  function Board() {
    (0, _classCallCheck3.default)(this, Board);
    return (0, _possibleConstructorReturn3.default)(this, (Board.__proto__ || (0, _getPrototypeOf2.default)(Board)).apply(this, arguments));
  }

  (0, _createClass3.default)(Board, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_BoardContainer2.default, this.props)
      );
    }
  }]);
  return Board;
}(_react.Component);

exports.default = Board;