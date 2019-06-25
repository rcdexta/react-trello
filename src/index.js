import React from 'react'

import Draggable from './dnd/Draggable'
import Container from './dnd/Container'
import Lane from './controllers/Lane'
import Board from './controllers/Board'

import DefaultComponents from 'components/basic'

export {
  Board,
  Lane,
  Container,
  Draggable,
  DefaultComponents
}

export default ({ components, ...otherProps }) =>
  <Board components={{...DefaultComponents, ...components}} {...otherProps} />
