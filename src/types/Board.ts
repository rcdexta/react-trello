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
}

export interface Card {
  id: string
  title?: string
  label?: string
  description?: string
  laneId?: string
}

export interface Style {
  width: number
}
