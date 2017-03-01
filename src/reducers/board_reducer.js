const appendCardsToLane = (state, {laneId, newCards}) => {
  const lanes = state.lanes.map((lane) => {
    if (lane.id === laneId) {
      lane.cards = [...lane.cards, ...newCards]
    }
    return lane
  })
  return {...state, ...lanes}
}

const appendCardToLane = (state, {laneId, card}) => {
  return appendCardsToLane(state, {laneId: laneId, newCards: [card]})
}

const removeCardFromLane = (state, {laneId, cardId}) => {
  const lanes = state.lanes.map((lane) => {
    if (lane.id === laneId) {
      lane.cards = lane.cards.filter((card) => card.id !== cardId)
    }
    return lane
  })
  return {...state, ...lanes}
}

const moveCardAcrossLanes = (state, {fromLaneId, toLaneId, cardId}) => {
  let cardToMove = null
  const interimLanes = state.lanes.map((lane) => {
    if (lane.id === fromLaneId) {
      cardToMove = lane.cards.find((card) => card.id === cardId)
      lane.cards = lane.cards.filter((card) => card.id !== cardId)
    }
    return lane
  })
  return appendCardToLane({lanes: interimLanes}, {laneId: toLaneId, card: cardToMove})
}

const boardReducer = (state = {lanes: []}, action) => {
  switch (action.type) {
    case 'LOAD_BOARD':
      return action.payload
    case 'UPDATE_LANE':
      return appendCardsToLane(state, action.payload)
    case 'ADD_CARD':
      return appendCardToLane(state, action.payload)
    case 'REMOVE_CARD':
      return removeCardFromLane(state, action.payload)
    case 'MOVE_CARD':
      return moveCardAcrossLanes(state, action.payload)
    default:
      return state
  }
}

export default boardReducer
