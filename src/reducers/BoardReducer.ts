import {BoardData} from 'rt/types/Board'
import {
  appendCardToLane,
  initialiseLanes,
  removeCardFromLane,
  addLane,
  moveCardAcrossLanes,
  moveLane,
  paginateLane,
  removeLane,
  updateCardForLane,
  updateCardsForLane,
  updateLane,
  updateLanes
} from 'rt/helpers/LaneHelper'

export const MapLaneHelperToReducer = {
  LOAD_BOARD: 'initialiseLanes',
  ADD_CARD: 'appendCardToLane',
  REMOVE_CARD: 'removeCardFromLane',
  MOVE_CARD: 'moveCardAcrossLanes',
  UPDATE_CARDS: 'updateCardsForLane',
  UPDATE_CARD: 'updateCardForLane',
  UPDATE_LANES: 'updateLanes',
  UPDATE_LANE: 'updateLane',
  PAGINATE_LANE: 'paginateLane',
  MOVE_LANE: 'moveLane',
  REMOVE_LANE: 'removeLane',
  ADD_LANE: 'addLane'
} as const

const boardReducer = (
  state: BoardData = {lanes: []},
  {
    payload,
    type
  }: {
    payload: any
    type: keyof typeof MapLaneHelperToReducer
  }
) => {
  switch (type) {
    case 'LOAD_BOARD':
      return initialiseLanes({state, payload})
    case 'ADD_CARD':
      return appendCardToLane({state, payload})
    case 'REMOVE_CARD':
      return removeCardFromLane({state, payload})
    case 'MOVE_CARD':
      return moveCardAcrossLanes({state, payload})
    case 'UPDATE_CARDS':
      return updateCardsForLane({state, payload})
    case 'UPDATE_CARD':
      return updateCardForLane({state, payload})
    case 'UPDATE_LANES':
      return updateLanes({state, payload})
    case 'UPDATE_LANE':
      return updateLane({state, payload})
    case 'PAGINATE_LANE':
      return paginateLane({state, payload})
    case 'MOVE_LANE':
      return moveLane({state, payload})
    case 'REMOVE_LANE':
      return removeLane({state, payload})
    case 'ADD_LANE':
      return addLane({state, payload})
    default:
      return state
  }
}

export default boardReducer
