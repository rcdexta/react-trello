import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/collapsible.json')

storiesOf('Advanced Features', module).add(
  'Collapsible Lanes',
  withInfo('Collapse lanes when double clicking on the lanes')(() => {
    const shouldReceiveNewData = nextData => {
      console.log('data has changed')
      console.log(nextData)
    }

    return (
      <Board
        data={data}
        draggable
        collapsibleLanes
        onDataChange={shouldReceiveNewData}
      />
    )
  })
)
