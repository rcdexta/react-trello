'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LaneHelper = require('../helpers/LaneHelper');

var _LaneHelper2 = _interopRequireDefault(_LaneHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardReducer = function boardReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { lanes: [] };
  var action = arguments[1];
  var payload = action.payload,
      type = action.type;

  switch (type) {
    case 'LOAD_BOARD':
      return _LaneHelper2.default.initialiseLanes(state, payload);
    case 'ADD_CARD':
      return _LaneHelper2.default.appendCardToLane(state, payload);
    case 'REMOVE_CARD':
      return _LaneHelper2.default.removeCardFromLane(state, payload);
    case 'MOVE_CARD':
      return _LaneHelper2.default.moveCardAcrossLanes(state, payload);
    case 'UPDATE_CARDS':
      return _LaneHelper2.default.updateCardsForLane(state, payload);
    case 'UPDATE_LANES':
      return _LaneHelper2.default.updateLanes(state, payload);
    case 'PAGINATE_LANE':
      return _LaneHelper2.default.paginateLane(state, payload);
    case 'MOVE_LANE':
      return _LaneHelper2.default.moveLane(state, payload);
    default:
      return state;
  }
};

exports.default = boardReducer;