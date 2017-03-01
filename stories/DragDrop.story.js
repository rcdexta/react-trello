import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

const data = require('./data.json');

function handleDragStart(cardId, laneId) {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

function handleDragEnd(cardId, sourceLaneId, targetLaneId) {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

storiesOf('react-trello', module)

  .add('Drag-n-Drop',
    () => (
      <Board
        data={data}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    ))

