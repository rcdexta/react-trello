import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/drag-drop.json')

storiesOf('Drag-n-Drop', module).add(
  'Restrict lanes',
  () => {
    return <Board data={data} draggable />
  },
  {info: 'Use droppable property to prevent some lanes from being droppable'}
)

storiesOf('Drag-n-Drop', module).add(
  'Drag Cards not Lanes',
  () => {
    return <Board data={data} draggable laneDraggable={false} />
  },
  {info: 'Use props to disable dragging lanes but enable card dragging'}
)
