import React from 'react'
import {storiesOf} from '@storybook/react'
import debug from './helpers/debug'

import Board from '../src'

const data = require('./data/collapsible.json')

storiesOf('Advanced Features', module).add(
  'Collapsible Lanes',
  () => {
    const shouldReceiveNewData = nextData => {
      debug('data has changed')
      debug(nextData)
    }

    return <Board data={data} draggable collapsibleLanes onDataChange={shouldReceiveNewData} />
  },
  {info: 'Collapse lanes when double clicking on the lanes'}
)
