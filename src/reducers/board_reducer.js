import Lh from '../helpers/lane_helper'

const boardReducer = (state = {lanes: []}, action) => {
  switch (action.type) {
    case 'LOAD_BOARD':
      return action.payload
    case 'UPDATE_LANE':
      return Lh.appendCardsToLane(state, action.payload)
    case 'ADD_CARD':
      return Lh.appendCardToLane(state, action.payload)
    case 'REMOVE_CARD':
      return Lh.removeCardFromLane(state, action.payload)
    case 'MOVE_CARD':
      return Lh.moveCardAcrossLanes(state, action.payload)
    default:
      return state
  }
}

export default boardReducer
