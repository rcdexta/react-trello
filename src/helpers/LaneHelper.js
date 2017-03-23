const LaneHelper = {

  initialiseLanes: (state, {lanes}) => {
    const updatedLanes = lanes.map((lane) => {
      lane.currentPage = 1
      return lane
    })
    return {lanes: updatedLanes}
  },

  paginateLane: (state, {laneId, newCards, nextPage}) => {
    const updatedLanes = LaneHelper.appendCardsToLane(state, {laneId: laneId, newCards: newCards})
    updatedLanes.find((lane) => lane.id === laneId).currentPage = nextPage
    return {...state, ...updatedLanes}
  },

  appendCardsToLane: (state, {laneId, newCards}) => {
    const lanes = state.lanes.map((lane) => {
      if (lane.id === laneId) {
        lane.cards = [...lane.cards, ...newCards]
      }
      return lane
    })
    return lanes
  },

  appendCardToLane: (state, {laneId, card}) => {
    const updatedLanes = LaneHelper.appendCardsToLane(state, {laneId: laneId, newCards: [card]})
    return {...state, ...updatedLanes}
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
  },

  updateCardsForLane: (state, {laneId, cards}) => {
    const lanes = state.lanes.map((lane) => {
      if (lane.id === laneId) {
        lane.cards = cards
      }
      return lane
    })
    return {...state, ...lanes}
  },

  updateLanes: (state, lanes) => {
    return {...state, ...{lanes: lanes}}
  }
}

export default LaneHelper
