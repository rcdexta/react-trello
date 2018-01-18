import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data.json')

storiesOf('Drag-n-Drop', module).add(
  'Basic',
  withInfo('A demonstration of onDragStart and onDragEnd hooks')(() => {
    const handleDragStart = (cardId, laneId) => {
      console.log('drag started')
      console.log(`cardId: ${cardId}`)
      console.log(`laneId: ${laneId}`)
    }

    const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
      console.log('drag ended')
      console.log(`cardId: ${cardId}`)
      console.log(`sourceLaneId: ${sourceLaneId}`)
      console.log(`targetLaneId: ${targetLaneId}`)
    }

    const shouldReceiveNewData = nextData => {
      console.log('data has changed')
      console.log(nextData)
    }

    return (
      <Board
        data={data}
        draggable={true}
        onDataChange={shouldReceiveNewData}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
    )
  })
)
