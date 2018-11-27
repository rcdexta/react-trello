"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _v = _interopRequireDefault(require("uuid/v1"));

const LaneHelper = {
  initialiseLanes: (state, {
    lanes
  }) => {
    const newLanes = lanes.map(lane => {
      lane.currentPage = 1;
      lane.cards && lane.cards.forEach(c => c.laneId = lane.id);
      return lane;
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: newLanes
      }
    });
  },
  paginateLane: (state, {
    laneId,
    newCards,
    nextPage
  }) => {
    const updatedLanes = LaneHelper.appendCardsToLane(state, {
      laneId: laneId,
      newCards: newCards
    });
    updatedLanes.find(lane => lane.id === laneId).currentPage = nextPage;
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: updatedLanes
      }
    });
  },
  appendCardsToLane: (state, {
    laneId,
    newCards,
    index
  }) => {
    const lane = state.lanes.find(lane => lane.id === laneId);
    newCards = newCards.map(c => (0, _immutabilityHelper.default)(c, {
      laneId: {
        $set: laneId
      }
    })).filter(c => lane.cards.find(card => card.id === c.id) == null);
    return state.lanes.map(lane => {
      if (lane.id === laneId) {
        if (index !== undefined) {
          return (0, _immutabilityHelper.default)(lane, {
            cards: {
              $splice: [[index, 0, ...newCards]]
            }
          });
        } else {
          const cardsToUpdate = [...lane.cards, ...newCards];
          return (0, _immutabilityHelper.default)(lane, {
            cards: {
              $set: cardsToUpdate
            }
          });
        }
      } else {
        return lane;
      }
    });
  },
  appendCardToLane: (state, {
    laneId,
    card,
    index
  }) => {
    const newLanes = LaneHelper.appendCardsToLane(state, {
      laneId: laneId,
      newCards: [card],
      index
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: newLanes
      }
    });
  },
  addLane: (state, lane) => {
    const newLane = (0, _objectSpread2.default)({
      id: (0, _v.default)(),
      cards: []
    }, lane);
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $push: [newLane]
      }
    });
  },
  removeCardFromLane: (state, {
    laneId,
    cardId
  }) => {
    const lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        let newCards = lane.cards.filter(card => card.id !== cardId);
        return (0, _immutabilityHelper.default)(lane, {
          cards: {
            $set: newCards
          }
        });
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: lanes
      }
    });
  },
  moveCardAcrossLanes: (state, {
    fromLaneId,
    toLaneId,
    cardId,
    index
  }) => {
    let cardToMove = null;
    const interimLanes = state.lanes.map(lane => {
      if (lane.id === fromLaneId) {
        cardToMove = lane.cards.find(card => card.id === cardId);
        const newCards = lane.cards.filter(card => card.id !== cardId);
        return (0, _immutabilityHelper.default)(lane, {
          cards: {
            $set: newCards
          }
        });
      } else {
        return lane;
      }
    });
    const updatedState = (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: interimLanes
      }
    });
    return LaneHelper.appendCardToLane(updatedState, {
      laneId: toLaneId,
      card: cardToMove,
      index: index
    });
  },
  updateCardsForLane: (state, {
    laneId,
    cards
  }) => {
    const lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        return (0, _immutabilityHelper.default)(lane, {
          cards: {
            $set: cards
          }
        });
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: lanes
      }
    });
  },
  updateLanes: (state, lanes) => {
    return (0, _objectSpread2.default)({}, state, {
      lanes: lanes
    });
  },
  moveLane: (state, {
    oldIndex,
    newIndex
  }) => {
    const laneToMove = state.lanes[oldIndex];
    const tempState = (0, _immutabilityHelper.default)(state, {
      lanes: {
        $splice: [[oldIndex, 1]]
      }
    });
    return (0, _immutabilityHelper.default)(tempState, {
      lanes: {
        $splice: [[newIndex, 0, laneToMove]]
      }
    });
  }
};
var _default = LaneHelper;
exports.default = _default;