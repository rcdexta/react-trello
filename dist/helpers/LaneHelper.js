'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LaneHelper = {
  initialiseLanes: function initialiseLanes(state, _ref) {
    var lanes = _ref.lanes;

    var newLanes = lanes.map(function (lane) {
      lane.currentPage = 1;
      lane.cards && lane.cards.forEach(function (c) {
        return c.laneId = lane.id;
      });
      return lane;
    });
    return (0, _immutabilityHelper2.default)(state, { lanes: { $set: newLanes } });
  },

  paginateLane: function paginateLane(state, _ref2) {
    var laneId = _ref2.laneId,
        newCards = _ref2.newCards,
        nextPage = _ref2.nextPage;

    var updatedLanes = LaneHelper.appendCardsToLane(state, { laneId: laneId, newCards: newCards });
    updatedLanes.find(function (lane) {
      return lane.id === laneId;
    }).currentPage = nextPage;
    return (0, _immutabilityHelper2.default)(state, { lanes: { $set: updatedLanes } });
  },

  appendCardsToLane: function appendCardsToLane(state, _ref3) {
    var laneId = _ref3.laneId,
        newCards = _ref3.newCards,
        index = _ref3.index;

    var lane = state.lanes.find(function (lane) {
      return lane.id === laneId;
    });
    newCards = newCards.map(function (c) {
      return (0, _immutabilityHelper2.default)(c, { laneId: { $set: laneId } });
    }).filter(function (c) {
      return lane.cards.find(function (card) {
        return card.id === c.id;
      }) == null;
    });
    return state.lanes.map(function (lane) {
      if (lane.id === laneId) {
        if (index !== undefined) {
          return (0, _immutabilityHelper2.default)(lane, { cards: { $splice: [[index, 0].concat((0, _toConsumableArray3.default)(newCards))] } });
        } else {
          var cardsToUpdate = [].concat((0, _toConsumableArray3.default)(lane.cards), (0, _toConsumableArray3.default)(newCards));
          return (0, _immutabilityHelper2.default)(lane, { cards: { $set: cardsToUpdate } });
        }
      } else {
        return lane;
      }
    });
  },

  appendCardToLane: function appendCardToLane(state, _ref4) {
    var laneId = _ref4.laneId,
        card = _ref4.card,
        index = _ref4.index;

    var newLanes = LaneHelper.appendCardsToLane(state, { laneId: laneId, newCards: [card], index: index });
    return (0, _immutabilityHelper2.default)(state, { lanes: { $set: newLanes } });
  },

  removeCardFromLane: function removeCardFromLane(state, _ref5) {
    var laneId = _ref5.laneId,
        cardId = _ref5.cardId;

    var lanes = state.lanes.map(function (lane) {
      if (lane.id === laneId) {
        var newCards = lane.cards.filter(function (card) {
          return card.id !== cardId;
        });
        return (0, _immutabilityHelper2.default)(lane, { cards: { $set: newCards } });
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper2.default)(state, { lanes: { $set: lanes } });
  },

  moveCardAcrossLanes: function moveCardAcrossLanes(state, _ref6) {
    var fromLaneId = _ref6.fromLaneId,
        toLaneId = _ref6.toLaneId,
        cardId = _ref6.cardId,
        index = _ref6.index;

    var cardToMove = null;
    var interimLanes = state.lanes.map(function (lane) {
      if (lane.id === fromLaneId) {
        cardToMove = lane.cards.find(function (card) {
          return card.id === cardId;
        });
        var newCards = lane.cards.filter(function (card) {
          return card.id !== cardId;
        });
        return (0, _immutabilityHelper2.default)(lane, { cards: { $set: newCards } });
      } else {
        return lane;
      }
    });
    var updatedState = (0, _immutabilityHelper2.default)(state, { lanes: { $set: interimLanes } });
    return LaneHelper.appendCardToLane(updatedState, { laneId: toLaneId, card: cardToMove, index: index });
  },

  updateCardsForLane: function updateCardsForLane(state, _ref7) {
    var laneId = _ref7.laneId,
        cards = _ref7.cards;

    var lanes = state.lanes.map(function (lane) {
      if (lane.id === laneId) {
        return (0, _immutabilityHelper2.default)(lane, { cards: { $set: cards } });
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper2.default)(state, { lanes: { $set: lanes } });
  },

  updateLanes: function updateLanes(state, lanes) {
    return (0, _extends3.default)({}, state, { lanes: lanes });
  },

  moveLane: function moveLane(state, _ref8) {
    var oldIndex = _ref8.oldIndex,
        newIndex = _ref8.newIndex;

    var laneToMove = state.lanes[oldIndex];
    var tempState = (0, _immutabilityHelper2.default)(state, { lanes: { $splice: [[oldIndex, 1]] } });
    return (0, _immutabilityHelper2.default)(tempState, { lanes: { $splice: [[newIndex, 0, laneToMove]] } });
  }
};

exports.default = LaneHelper;