import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

storiesOf('Basic Functions', module).add(
  'Tags',
  () => {
    const data = {
      lanes: [
        {
          id: 'lane1',
          title: 'Planned Tasks',
          cards: [
            {
              id: 'Card1',
              title: 'Card1',
              description: 'foo card',
              metadata: {cardId: 'Card1'},
              tags: [
                {title: 'High', color: 'white', bgcolor: '#EB5A46'},
                {title: 'Tech Debt', color: 'white', bgcolor: '#0079BF'},
                {title: 'Very long tag that is', color: 'white', bgcolor: '#61BD4F'},
                {title: 'One more', color: 'white', bgcolor: '#61BD4F'}
              ]
            },
            {id: 'Card2', title: 'Card2', description: 'bar card', metadata: {cardId: 'Card2'}, tags: [{title: 'Low'}]}
          ]
        }
      ]
    }
    return <Board data={data} tagStyle={{fontSize: '80%'}} />
  },
  {info: 'Customizable tags for each card'}
)
