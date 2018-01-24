import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/drag-drop.json')

storiesOf('Drag-n-Drop', module).add(
  'Restrict lanes',
  withInfo('Use droppable property to prevent some lanes from being droppable')(() => {
    return (
      <Board
        data={data}
        draggable
      />
    )
  })
)
