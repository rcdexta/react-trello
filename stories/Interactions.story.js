import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import {Board} from '../src'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      cards: [
        {id: 'Card1', title: 'Card1', description: 'foo card', metadata: {id: 'Card1'}},
        {id: 'Card2', title: 'Card2', description: 'bar card', metadata: {id: 'Card2'}}
      ]
    }
  ]
}

storiesOf('React Trello', module).add(
  'Event Handling',
  withInfo('Adding event handlers to cards')(() =>
    <Board
      data={data}
      onCardClick={(cardId, metadata) => alert(`Card with id:${cardId} clicked. Has metadata.id: ${metadata.id}`)}
      onLaneClick={(laneId) => alert(`Lane with id:${laneId} clicked`)}
    />
  )
)
