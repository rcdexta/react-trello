import {LaneHelper as Lh} from 'rt/helpers/LaneHelper'

const MapLaneHelperToReducer = {
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

const boardReducer = <K extends keyof typeof MapLaneHelperToReducer>(
  state = {lanes: []},
  {
    payload,
    type
  }: {
    payload: Parameters<typeof Lh[typeof MapLaneHelperToReducer[K]]>['1']
    type: K
  }
) => {
  /**
   * Switch statements cannot narrow a union :(
   */
  switch (type) {
    case 'LOAD_BOARD':
      const initialiseLanesPayload = payload as Parameters<typeof Lh.initialiseLanes>['1']
      return Lh.initialiseLanes(state, initialiseLanesPayload)
    case 'ADD_CARD':
      const appendCardToLanePayload = payload as Parameters<typeof Lh.appendCardToLane>['1']
      return Lh.appendCardToLane(state, appendCardToLanePayload)
    case 'REMOVE_CARD':
      const removeCardFromLanePayload = payload as Parameters<typeof Lh.removeCardFromLane>['1']
      return Lh.removeCardFromLane(state, removeCardFromLanePayload)
    case 'MOVE_CARD':
      const moveCardAcrossLanesPayload = payload as Parameters<typeof Lh.moveCardAcrossLanes>['1']
      return Lh.moveCardAcrossLanes(state, moveCardAcrossLanesPayload)
    case 'UPDATE_CARDS':
      const updateCardsForLanePayload = payload as Parameters<typeof Lh.updateCardsForLane>['1']
      return Lh.updateCardsForLane(state, updateCardsForLanePayload)
    case 'UPDATE_CARD':
      const updateCardForLanePayload = payload as Parameters<typeof Lh.updateCardForLane>['1']
      return Lh.updateCardForLane(state, updateCardForLanePayload)
    case 'UPDATE_LANES':
      const updateLanesPayload = payload as Parameters<typeof Lh.updateLanes>['1']
      return Lh.updateLanes(state, updateLanesPayload)
    case 'UPDATE_LANE':
      const updateLanePayload = payload as Parameters<typeof Lh.updateLane>['1']
      return Lh.updateLane(state, updateLanePayload)
    case 'PAGINATE_LANE':
      const paginateLanePayload = payload as Parameters<typeof Lh.paginateLane>['1']
      return Lh.paginateLane(state, paginateLanePayload)
    case 'MOVE_LANE':
      const moveLanePayload = payload as Parameters<typeof Lh.moveLane>['1']
      return Lh.moveLane(state, moveLanePayload)
    case 'REMOVE_LANE':
      const removeLanePayload = payload as Parameters<typeof Lh.removeLane>['1']
      return Lh.removeLane(state, removeLanePayload)
    case 'ADD_LANE':
      const addLanePayload = payload as Parameters<typeof Lh.addLane>['1']
      return Lh.addLane(state, addLanePayload)
    default:
      return state
  }
}

export default boardReducer
