import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./drag-drop.json')

storiesOf('Advanced Features', module).add(
  'Restrict Drag-n-Drop',
  withInfo('Use droppable property to pervent some lanes from being droppable')(() => {
    return (
      <Board
        data={data}
        draggable={true}
      />
    )
  })
)
