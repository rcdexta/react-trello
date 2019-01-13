import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      cards: [
        {id: 'Card1', title: 'Card1', description: 'foo card', metadata: {id: 'Card1'}},
        {id: 'Card2', title: 'Card2', description: 'bar card', metadata: {id: 'Card2'}}
      ]
    },
    {
      id: 'lane2',
      title: 'Executing',
      cards: [{id: 'Card3', title: 'Card3', description: 'foobar card', metadata: {id: 'Card3'}}]
    }
  ]
}

storiesOf('Advanced Features', module).add(
  'Event Handling',
  () => (
    <Board
      draggable
      data={data}
      onCardClick={(cardId, metadata, laneId) => alert(`Card with id:${cardId} clicked. Has metadata.id: ${metadata.id}. Card in lane: ${laneId}`)}
      onLaneClick={laneId => alert(`Lane with id:${laneId} clicked`)}
    />
  ),
  {info: 'Adding event handlers to cards'}
)
