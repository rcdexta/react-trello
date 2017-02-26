const appendCardsToLane = (state, {laneId, newCards}) => {
  const lanes = state.lanes.map((lane) => {
    if (lane.id === laneId) {
      lane.cards = [...lane.cards, ...newCards]
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
    default:
      return state
  }
}


export default boardReducer