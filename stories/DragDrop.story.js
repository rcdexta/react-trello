import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'
import './drag.css'

import Board from '../src'

const data = require('./data/base.json')

storiesOf('Drag-n-Drop', module)
  .add(
    'Basic',
    withInfo('A demonstration of onDragStart and onDragEnd hooks for card and lanes')(() => {
      const handleDragStart = (cardId, laneId) => {
        console.log('drag started')
        console.log(`cardId: ${cardId}`)
        console.log(`laneId: ${laneId}`)
      }

      const handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, card) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
        console.log(`newPosition: ${position}`)
        console.log(`cardDetails:`)
        console.log(card)
      }

      const handleLaneDragStart = laneId => {
        console.log(`lane drag started for ${laneId}`)
      }

      const handleLaneDragEnd = (laneId, newPosition) => {
        console.log(`lane drag ended for ${laneId}`)
        console.log(`New lane position: ${newPosition}`)
      }

      const shouldReceiveNewData = nextData => {
        console.log('data has changed')
        console.log(nextData)
      }

      return (
        <Board
          data={data}
          draggable
          onDataChange={shouldReceiveNewData}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleLaneDragStart={handleLaneDragStart}
          handleLaneDragEnd={handleLaneDragEnd}
        />
      )
    })
  )
  .add(
    'Drag Styling',
    withInfo('Modifying appearance of dragged card')(() => {
      return <Board
        data={data}
        cardDragClass='draggingCard'
        laneDragClass='draggingLane'
        draggable
      />
    })
  )
