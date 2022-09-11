import update, {Spec} from 'immutability-helper'
import {BoardData, Card, Lane} from 'rt/types/Board'
import {PartialExcept} from 'rt/types/utilities'

type LaneHelperType =
  | 'initialiseLanes'
  | 'appendCardToLane'
  | 'appendCardsToLane'
  | 'removeCardFromLane'
  | 'moveCardAcrossLanes'
  | 'updateCardsForLane'
  | 'updateCardForLane'
  | 'updateLanes'
  | 'updateLane'
  | 'paginateLane'
  | 'moveLane'
  | 'removeLane'
  | 'addLane'
type LaneHelperParams<TType extends LaneHelperType, TPayload> = {
  type?: TType
  state: BoardData
  payload: TPayload
}

export const initialiseLanes = ({
  state,
  payload: {lanes}
}: LaneHelperParams<'initialiseLanes', {lanes: BoardData['lanes']}>) => {
  const newLanes = lanes.map(lane => {
    lane.currentPage = 1
    lane.cards && lane.cards.forEach(c => (c.laneId = lane.id))
    return lane
  })
  return update(state, {lanes: {$set: newLanes}})
}

export const paginateLane = ({
  state,
  payload: {laneId, newCards, nextPage}
}: LaneHelperParams<'paginateLane', {laneId: string; newCards: Card[]; nextPage: number}>) => {
  const updatedLanes = appendCardsToLane({state, payload: {laneId: laneId, newCards: newCards, index: undefined}})
  updatedLanes.find(lane => lane.id === laneId).currentPage = nextPage
  return update(state, {lanes: {$set: updatedLanes}})
}

export const appendCardsToLane = ({
  state,
  payload: {index, laneId, newCards}
}: LaneHelperParams<'appendCardsToLane', {laneId: string; newCards: Card[]; index: number}>) => {
  const lane = state.lanes.find(lane => lane.id === laneId)
  newCards = newCards
    .map(c => update(c, {laneId: {$set: laneId}}))
    .filter(c => lane.cards.find(card => card.id === c.id) == null)
  return state.lanes.map(lane => {
    if (lane.id === laneId) {
      if (index !== undefined) {
        return update<Lane, Spec<any, any>>(lane, {
          cards: {$splice: [[index, 0, ...newCards]]}
        })
      } else {
        const cardsToUpdate = [...lane.cards, ...newCards]
        return update(lane, {cards: {$set: cardsToUpdate}})
      }
    } else {
      return lane
    }
  })
}

export const appendCardToLane = ({
  state,
  payload: {card, index, laneId}
}: LaneHelperParams<'appendCardToLane', {laneId: string; card: Card; index: number}>) => {
  const newLanes = appendCardsToLane({state, payload: {laneId: laneId, newCards: [card], index}})
  return update(state, {lanes: {$set: newLanes}})
}

export const addLane = ({state, payload: {lane}}: LaneHelperParams<'addLane', {lane: Lane}>) => {
  const newLane = {cards: [], ...lane}
  return update(state, {lanes: {$push: [newLane]}})
}

export const updateLane = ({
  state,
  payload: {updatedLane}
}: LaneHelperParams<'updateLane', {updatedLane: PartialExcept<Lane, 'id'>}>) => {
  const newLanes = state.lanes.map(lane => {
    if (updatedLane.id === lane.id) {
      return {...lane, ...updatedLane}
    } else {
      return lane
    }
  })
  return update(state, {lanes: {$set: newLanes}})
}

export const removeCardFromLane = ({
  state,
  payload: {laneId, cardId}
}: LaneHelperParams<'removeCardFromLane', {laneId: string; cardId: string}>) => {
  const lanes = state.lanes.map(lane => {
    if (lane.id === laneId) {
      let newCards = lane.cards.filter(card => card.id !== cardId)
      return update(lane, {cards: {$set: newCards}})
    } else {
      return lane
    }
  })
  return update(state, {lanes: {$set: lanes}})
}

export const moveCardAcrossLanes = ({
  state,
  payload: {fromLaneId, cardIndex, toLaneId, cardId}
}: LaneHelperParams<
  'moveCardAcrossLanes',
  {fromLaneId: string; toLaneId: string; cardId: string; cardIndex: number}
>) => {
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
  return appendCardToLane({state: updatedState, payload: {laneId: toLaneId, card: cardToMove, index: cardIndex}})
}

export const updateCardsForLane = ({
  state,
  payload: {cards, laneId}
}: LaneHelperParams<'updateCardsForLane', {laneId: string; cards: Card[]}>) => {
  const lanes = state.lanes.map(lane => {
    if (lane.id === laneId) {
      return update(lane, {cards: {$set: cards}})
    } else {
      return lane
    }
  })
  return update(state, {lanes: {$set: lanes}})
}

export const updateCardForLane = ({
  state,
  payload: {laneId, card: updatedCard}
}: LaneHelperParams<'updateCardForLane', {laneId: string; card: Card}>) => {
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
}

export const updateLanes = ({
  state,
  payload: {lanes}
}: LaneHelperParams<'updateLanes', {state: BoardData; lanes: BoardData['lanes']}>) => {
  return {...state, ...{lanes: lanes}}
}

export const moveLane = ({
  state,
  payload: {newIndex, oldIndex}
}: LaneHelperParams<'moveLane', {oldIndex: number; newIndex: number}>) => {
  const laneToMove = state.lanes[oldIndex]
  const tempState = update(state, {lanes: {$splice: [[oldIndex, 1]]}})
  return update(tempState, {lanes: {$splice: [[newIndex, 0, laneToMove]]}})
}

export const removeLane = ({state, payload: {laneId}}: LaneHelperParams<'removeLane', {laneId: string}>) => {
  const updatedLanes = state.lanes.filter(lane => lane.id !== laneId)
  return update(state, {lanes: {$set: updatedLanes}})
}
