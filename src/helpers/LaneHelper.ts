import update from 'immutability-helper'
import {BoardData, Card, Lane} from 'rt/types/Board'

export const LaneHelper = {
  initialiseLanes: (state: BoardData, {lanes}: BoardData) => {
    const newLanes = lanes.map(lane => {
      lane.currentPage = 1
      lane.cards && lane.cards.forEach(c => (c.laneId = lane.id))
      return lane
    })
    return update(state, {lanes: {$set: newLanes}})
  },

  paginateLane: (state: BoardData, {laneId, newCards, nextPage}) => {
    const updatedLanes = LaneHelper.appendCardsToLane(state, {laneId: laneId, newCards: newCards, index: undefined})
    updatedLanes.find(lane => lane.id === laneId).currentPage = nextPage
    return update(state, {lanes: {$set: updatedLanes}})
  },

  appendCardsToLane: (
    state: BoardData,
    {laneId, newCards, index}: {laneId: string; newCards: Card[]; index: number}
  ) => {
    const lane = state.lanes.find(lane => lane.id === laneId)
    newCards = newCards
      .map(c => update(c, {laneId: {$set: laneId}}))
      .filter(c => lane.cards.find(card => card.id === c.id) == null)
    return state.lanes.map(lane => {
      if (lane.id === laneId) {
        if (index !== undefined) {
          return update(lane, {cards: {$splice: [[index, 0, ...newCards]]}})
        } else {
          const cardsToUpdate = [...lane.cards, ...newCards]
          return update(lane, {cards: {$set: cardsToUpdate}})
        }
      } else {
        return lane
      }
    })
  },

  appendCardToLane: (state: BoardData, {laneId, card, index}: {laneId: string; card: Card; index: number}) => {
    const newLanes = LaneHelper.appendCardsToLane(state, {laneId: laneId, newCards: [card], index})
    return update(state, {lanes: {$set: newLanes}})
  },

  addLane: (state: BoardData, lane: Lane) => {
    const newLane = {cards: [], ...lane}
    return update(state, {lanes: {$push: [newLane]}})
  },

  updateLane: (state: BoardData, updatedLane: Partial<Lane>) => {
    const newLanes = state.lanes.map(lane => {
      if (updatedLane.id == lane.id) {
        return {...lane, ...updatedLane}
      } else {
        return lane
      }
    })
    return update(state, {lanes: {$set: newLanes}})
  },

  removeCardFromLane: (state: BoardData, {laneId, cardId}: {laneId: string; cardId: string}) => {
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

  moveCardAcrossLanes: (
    state: BoardData,
    {fromLaneId, toLaneId, cardId, index}: {fromLaneId: string; toLaneId: string; cardId: string; index: number}
  ) => {
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
    return LaneHelper.appendCardToLane(updatedState, {laneId: toLaneId, card: cardToMove, index: index})
  },

  updateCardsForLane: (state, {laneId, cards}) => {
    const lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        return update(lane, {cards: {$set: cards}})
      } else {
        return lane
      }
    })
    return update(state, {lanes: {$set: lanes}})
  },

  updateCardForLane: (state, {laneId, card: updatedCard}: {laneId: string; card: Card}) => {
    const lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        const cards = lane.cards.map(card => {
          if (card.id === updatedCard.id) {
            return {...card, ...updatedCard}
          } else {
            return card
          }
        })
        return update(lane, {cards: {$set: cards}})
      } else {
        return lane
      }
    })
    return update(state, {lanes: {$set: lanes}})
  },

  updateLanes: (state: BoardData, lanes: BoardData['lanes']) => {
    return {...state, ...{lanes: lanes}}
  },

  moveLane: (state: BoardData, {oldIndex, newIndex}: {oldIndex: number; newIndex: number}) => {
    const laneToMove = state.lanes[oldIndex]
    const tempState = update(state, {lanes: {$splice: [[oldIndex, 1]]}})
    return update(tempState, {lanes: {$splice: [[newIndex, 0, laneToMove]]}})
  },

  removeLane: (state: BoardData, {laneId}: {laneId: string}) => {
    const updatedLanes = state.lanes.filter(lane => lane.id !== laneId)
    return update(state, {lanes: {$set: updatedLanes}})
  }
}
