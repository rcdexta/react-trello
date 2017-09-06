import update from 'immutability-helper'

const LaneHelper = {
  initialiseLanes: (state, {lanes}) => {
    const newLanes = lanes.map(lane => {
      lane.currentPage = 1
      lane.cards && lane.cards.forEach(c => (c.laneId = lane.id))
      return lane
    })
    return update(state, {lanes: {$set: newLanes}})
  },

  paginateLane: (state, {laneId, newCards, nextPage}) => {
    const updatedLanes = LaneHelper.appendCardsToLane(state, {laneId: laneId, newCards: newCards})
    updatedLanes.find(lane => lane.id === laneId).currentPage = nextPage
    return update(state, {lanes: {$set: updatedLanes}})
  },

  appendCardsToLane: (state, {laneId, newCards, index}) => {
    newCards = newCards.map(c => update(c, {laneId: {$set: laneId}}))
    return state.lanes.map(lane => {
      if (lane.id === laneId) {
        let cards = null
        if (index !== undefined) {
          cards = lane.cards.splice(index, 0, ...newCards)
        } else {
          cards = [...lane.cards, ...newCards]
        }
        return update(lane, {cards: {$set: cards}})
      } else {
        return lane
      }
    })
  },

  appendCardToLane: (state, {laneId, card, index}) => {
    const newLanes = LaneHelper.appendCardsToLane(state, {laneId: laneId, newCards: [card], index})
    return update(state, {lanes: {$set: newLanes}})
  },

  removeCardFromLane: (state, {laneId, cardId}) => {
    const lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        let newCards = lane.cards.filter(card => card.id !== cardId)
        return update(lane, {cards: {$set: newCards}})
      } else {
        return lane
      }
    })
    return update(state, {lanes: {$set: lanes}})
  },

  moveCardAcrossLanes: (state, {fromLaneId, toLaneId, cardId}) => {
    let cardToMove = null
    const interimLanes = state.lanes.map(lane => {
      if (lane.id === fromLaneId) {
        cardToMove = lane.cards.find(card => card.id === cardId)
        const newCards = lane.cards.filter(card => card.id !== cardId)
        return update(lane, {cards: {$set: newCards}})
      } else {
        return lane
      }
    })
    const updatedState = update(state, {lanes: {$set: interimLanes}})
    return LaneHelper.appendCardToLane(updatedState, {laneId: toLaneId, card: cardToMove})
  },

  updateCardsForLane: (state, {laneId, cards}) => {
    state.lanes.map(lane => {
      if (lane.id === laneId) {
        lane.cards = cards
      }
      return lane
    })
    return state
  },

  updateLanes: (state, lanes) => {
    return {...state, ...{lanes: lanes}}
  }
}

export default LaneHelper
