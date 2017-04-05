import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

storiesOf('react-trello', module)

  .addWithInfo('Tags',
    'Customizable tags for each card',
    () => {

      const data = {
        lanes: [{
          id: 'lane1',
          title: 'Planned Tasks',
          cards: [{id: 'Card1', title: 'Card1', description: 'foo card', metadata: 'foo',
            tags: [{title: 'High', color: 'white', bgcolor: '#EB5A46'},
                   {title: 'Tech Debt', color: 'white', bgcolor: '#0079BF'},
                   {title: 'Very long tag that is', color: 'white', bgcolor: '#61BD4F'},
              {title: 'One more', color: 'white', bgcolor: '#61BD4F'}]},
            {id: 'Card2', title: 'Card2', description: 'bar card', metadata: 'bar', tags: [{title: 'Low', color: 'white', bgcolor: 'orange'}]}]
        }]
      }

      return <Board data={data}/>
    }
  )
