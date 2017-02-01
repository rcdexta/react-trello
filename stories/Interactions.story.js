import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

const data = require('./data.json');

storiesOf('react-trello', module)

  .addWithInfo('Events',
    'Adding event handlers to the card',
    () => (
      <div>
        <button onClick={addOneCard}>Add Card</button>
        <Board>
          {lanes.map((lane) => (
            <Lane key={lane.title}
                  title={lane.title}
                  cards={lane.cards} />
          ))}
        </Board>
      </div>
    ))

