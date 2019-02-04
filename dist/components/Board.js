"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _BoardContainer = _interopRequireDefault(require("./BoardContainer"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _BoardReducer = _interopRequireDefault(require("../reducers/BoardReducer"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _Base = require("../styles/Base");

const middlewares = process.env.REDUX_LOGGING ? [_reduxLogger.default] : [];

class Board extends _react.Component {
  constructor() {
    super();
    (0, _defineProperty2.default)(this, "getStore", () => {
      //When you create multiple boards, unique stores are created for isolation
      return (0, _redux.createStore)(_BoardReducer.default, (0, _redux.applyMiddleware)(...middlewares));
    });
    this.store = this.getStore();
    this.id = (0, _v.default)();
  }

  render() {
    return _react.default.createElement(_reactRedux.Provider, {
      store: this.store
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Base.GlobalStyle, null), _react.default.createElement(_BoardContainer.default, (0, _extends2.default)({
      className: "react-trello-board"
    }, this.props, {
      id: this.id
    }))));
  }

}

exports.default = Board;