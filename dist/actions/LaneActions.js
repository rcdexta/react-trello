'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveLane = exports.paginateLane = exports.updateLanes = exports.updateCards = exports.moveCardAcrossLanes = exports.removeCard = exports.addCard = undefined;

var _reduxActions = require('redux-actions');

var addCard = exports.addCard = (0, _reduxActions.createAction)('ADD_CARD');
var removeCard = exports.removeCard = (0, _reduxActions.createAction)('REMOVE_CARD');
var moveCardAcrossLanes = exports.moveCardAcrossLanes = (0, _reduxActions.createAction)('MOVE_CARD');
var updateCards = exports.updateCards = (0, _reduxActions.createAction)('UPDATE_CARDS');
var updateLanes = exports.updateLanes = (0, _reduxActions.createAction)('UPDATE_LANES');
var paginateLane = exports.paginateLane = (0, _reduxActions.createAction)('PAGINATE_LANE');
var moveLane = exports.moveLane = (0, _reduxActions.createAction)('MOVE_LANE');