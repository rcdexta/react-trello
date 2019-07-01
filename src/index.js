import React from 'react'

import Draggable from './dnd/Draggable'
import Container from './dnd/Container'
import BoardContainer from './controllers/BoardContainer'
import Board from './controllers/Board'
import Lane from './controllers/Lane'
import deprecationWarnings from './helpers/deprecationWarnings'
import DefaultComponents from './components'

export {
  Draggable,
  Container,
  BoardContainer,
  Board,
  Lane
}

export { DefaultComponents as components }

export default ({ components, ...otherProps }) => {
  deprecationWarnings(otherProps);
  return <Board components={{...DefaultComponents, ...components}} {...otherProps} />
}
