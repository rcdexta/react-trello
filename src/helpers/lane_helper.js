const LaneHelper = {

  appendCardsToLane: (state, {laneId, newCards}) => {
    const lanes = state.lanes.map((lane) => {
      if (lane.id === laneId) {
        lane.cards = [...lane.cards, ...newCards]
      }
      return lane
    })
    return {...state, ...lanes}
  },

  appendCardToLane: (state, {laneId, card}) => {
    return LaneHelper.appendCardsToLane(state, {laneId: laneId, newCards: [card]})
  },

  removeCardFromLane: (state, {laneId, cardId}) => {
    const lanes = state.lanes.map((lane) => {
      if (lane.id === laneId) {
        lane.cards = lane.cards.filter((card) => card.id !== cardId)
      }
      return lane
    })
    return {...state, ...lanes}
  },

  moveCardAcrossLanes: (state, {fromLaneId, toLaneId, cardId}) => {
    let cardToMove = null
    const interimLanes = state.lanes.map((lane) => {
      if (lane.id === fromLaneId) {
        cardToMove = lane.cards.find((card) => card.id === cardId)
        lane.cards = lane.cards.filter((card) => card.id !== cardId)
      }
      return lane
    })
    return LaneHelper.appendCardToLane({lanes: interimLanes}, {laneId: toLaneId, card: cardToMove})
  }
}

export default LaneHelper
