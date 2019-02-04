"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveLane = exports.paginateLane = exports.updateLanes = exports.updateCards = exports.moveCardAcrossLanes = exports.removeCard = exports.addCard = void 0;

var _reduxActions = require("redux-actions");

const addCard = (0, _reduxActions.createAction)('ADD_CARD');
exports.addCard = addCard;
const removeCard = (0, _reduxActions.createAction)('REMOVE_CARD');
exports.removeCard = removeCard;
const moveCardAcrossLanes = (0, _reduxActions.createAction)('MOVE_CARD');
exports.moveCardAcrossLanes = moveCardAcrossLanes;
const updateCards = (0, _reduxActions.createAction)('UPDATE_CARDS');
exports.updateCards = updateCards;
const updateLanes = (0, _reduxActions.createAction)('UPDATE_LANES');
exports.updateLanes = updateLanes;
const paginateLane = (0, _reduxActions.createAction)('PAGINATE_LANE');
exports.paginateLane = paginateLane;
const moveLane = (0, _reduxActions.createAction)('MOVE_LANE');
exports.moveLane = moveLane;