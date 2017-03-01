import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

const data = require('./data.json');


storiesOf('react-trello', module)

  .addWithInfo('Drag-n-Drop',
    'A demonstration of onDragStart and onDragEnd hooks',
    () => {
    
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

      return <Board
        data={data}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    }
  )

