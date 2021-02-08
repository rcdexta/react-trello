import Lh from 'rt/helpers/LaneHelper'

const boardReducer = (state = {lanes: []}, action) => {
  const {payload, type} = action
  switch (type) {
    case 'LOAD_BOARD':
      return Lh.initialiseLanes(state, payload)
    case 'ADD_CARD':
      return Lh.appendCardToLane(state, payload)
    case 'REMOVE_CARD':
      return Lh.removeCardFromLane(state, payload)
    case 'MOVE_CARD':
      return Lh.moveCardAcrossLanes(state, payload)
    case 'UPDATE_CARDS':
      return Lh.updateCardsForLane(state, payload)
    case 'UPDATE_CARD':
      return Lh.updateCardForLane(state, payload)
    case 'UPDATE_LANES':
      return Lh.updateLanes(state, payload)
    case 'UPDATE_LANE':
      return Lh.updateLane(state, payload)
    case 'PAGINATE_LANE':
      return Lh.paginateLane(state, payload)
    case 'MOVE_LANE':
      return Lh.moveLane(state, payload)
    case 'REMOVE_LANE':
      return Lh.removeLane(state, payload)
    case 'ADD_LANE':
      return Lh.addLane(state, payload)
    default:
      return state
  }
}

export default boardReducer
