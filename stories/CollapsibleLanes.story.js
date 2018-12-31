import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/collapsible.json')

storiesOf('Advanced Features', module).add(
  'Collapsible Lanes',
  () => {
    const shouldReceiveNewData = nextData => {
      console.log('data has changed')
      console.log(nextData)
    }

    return <Board data={data} draggable collapsibleLanes onDataChange={shouldReceiveNewData} />
  },
  {info: 'Collapse lanes when double clicking on the lanes'}
)
