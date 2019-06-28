import React from 'react'

import Draggable from './dnd/Draggable'
import Container from './dnd/Container'
import Lane from './controllers/Lane'
import BoardController from './controllers/Board'

import DefaultComponents from 'components/basic'

export {
  Board,
  Lane,
  Container,
  Draggable,
  DefaultComponents
}

const Board = ({ components, ...otherProps }) =>
  <BoardController components={{...DefaultComponents, ...components}} {...otherProps} />

export default Board
