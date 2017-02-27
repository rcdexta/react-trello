const appendCardsToLane = (state, {laneId, newCards}) => {
  const lanes = state.lanes.map((lane) => {
    if (lane.id === laneId) {
      lane.cards = [...lane.cards, ...newCards]
      return lane
    }
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
      return lane
    }
  })
  return {...state, ...lanes}
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
    default:
      return state
  }
}

export default boardReducer
