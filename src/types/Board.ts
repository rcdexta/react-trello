import {CSSProperties} from 'react'

export interface BoardData {
  lanes: Lane[]
}

export interface Lane {
  id: string
  title?: string
  label?: string
  style: Style
  cards: Card[]
  currentPage: number
  droppable?: boolean
  labelStyle?: CSSProperties
  cardStyle?: CSSProperties
  disallowAddingCard?: boolean
}

export interface Card {
  id: string
  title?: string
  label?: string
  description?: string
  laneId?: string
  style?: string
  draggable?: boolean
}

export interface Style {
  width: number
}
