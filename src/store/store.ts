import produce from 'immer'
import {BoardData, Card, Lane} from 'rt/types/Board'
import create from 'zustand'

export interface State {
  data: BoardData
  initializeLanes: (lanes: BoardData['lanes']) => void
  refreshBoard: (lanes?: Lane[]) => void
  addCard: (card: Card, laneId: string, index?: number) => void
  removeCard: (laneId: string, cardId: string) => void
  moveCard: (fromLaneId: string, toLaneId: string, cardId: string, index: number) => void
  updateCards: (laneId: string, cards: Card[]) => void
  updateCard: (laneId: string, card: Card) => void
  updateLanes: (lanes: Lane[]) => void
  updateLane: (lane: Partial<Lane>) => void
  paginateLane: (laneId: string, newCards: Card[], nextPage: number) => void
  moveLane: (fromIndex: number, toIndex: number) => void
  removeLane: (laneId: string) => void
  addLane: (lane: Lane) => void
}
export const store = create<State>()(set => ({
  data: {lanes: []},
  initializeLanes: (lanes: Lane[]) =>
    set(state => ({
      data: produce(state.data, draft => {
        draft.lanes = lanes.map(lane => {
          return {...lane, currentPage:1, cards: lane.cards?.map(c => ({...c, laneId: lane.id}))}
        })
      })
    })),
  refreshBoard: (lanes = []) => set(() => ({data: {lanes}})),
  addCard: (card, laneId, index) =>
    set(
      produce<State>(state => {
        const lane = state.data.lanes.find(l => l.id === laneId)
        if (!lane) throw new Error('Lane not found')
        lane.cards[index || 0] = card
      })
    ),
  removeCard: (laneId, cardId) =>
    set(
      produce<State>(state => {
        const lane = state.data.lanes.find(l => l.id === laneId)
        if (!lane) throw new Error('Lane not found')
        const index = lane.cards.findIndex(c => c.id === cardId)
        if (index !== -1) lane.cards.splice(index, 1)
      })
    ),
  moveCard: (fromLaneId, toLaneId, cardId, index) =>
    set(
      produce<State>(state => {
        const fromLane = state.data.lanes.find(l => l.id === fromLaneId)
        if (!fromLane) throw new Error('fromLane not found')
        const toLane = state.data.lanes.find(l => l.id === toLaneId)
        if (!toLane) throw new Error('toLane not found')
        const cardIndex = fromLane.cards.findIndex(c => c.id === cardId)
        if (cardIndex !== -1) {
          const card = fromLane.cards[cardIndex]
          fromLane.cards.splice(cardIndex, 1)
          if (index !== undefined) {
            toLane.cards.splice(index, 0, card)
            return
          }
          toLane.cards.push(card)
        }
      })
    ),

  updateCards: (laneId, cards) =>
    set(
      produce<State>(state => {
        const lane = state.data.lanes.find(l => l.id === laneId)
        if (!lane) throw new Error('Lane not found')
        lane.cards = cards
      })
    ),
  updateCard: (laneId, card) =>
    set(
      produce<State>(state => {
        const lane = state.data.lanes.find(l => l.id === laneId)
        if (!lane) throw new Error('Lane not found')
        const index = lane.cards.findIndex(c => c.id === card.id)
        if (index !== -1) lane.cards[index] = card
      })
    ),
  updateLanes: lanes =>
    set(
      produce<State>(state => {
        state.data.lanes = lanes
      })
    ),

  updateLane: lane =>
    set(
      produce<State>(state => {
        lane = {...lane, ...state.data.lanes.find(l => l.id === lane.id)}
      })
    ),
  paginateLane: (laneId, newCards, nextPage) =>
    set(
      produce<State>(state => {
        state.data.lanes.map(l => (l.id === laneId ? {...l, cards: [...l.cards, ...newCards], nextPage} : l))
      })
    ),
  moveLane: (fromIndex, toIndex) =>
    set(
      produce<State>(state => {
        const lane = state.data.lanes[fromIndex]
        state.data.lanes.splice(fromIndex, 1)
        state.data.lanes.splice(toIndex, 0, lane)
      })
    ),
  removeLane: laneId =>
    set(
      produce<State>(state => {
        const index = state.data.lanes.findIndex(l => l.id === laneId)
        if (index !== -1) state.data.lanes.splice(index, 1)
      })
    ),
  addLane: lane =>
    set(
      produce<State>(state => {
        state.data.lanes.push(lane)
      })
    )
}))
