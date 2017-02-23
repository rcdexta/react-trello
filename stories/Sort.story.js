import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

const lane = require('./data-sort.json');

storiesOf('react-trello', module)

.addWithInfo('Sorted Lane',
    'A lane sorted by completed at ascending',
    () => (
      <Board>
        <Lane id={lane.key} title={lane.description} cards={lane.cards} sortFunction={(o1,o2) => new Date(o1.completedAt) - new Date(o2.completedAt)}>
        </Lane>
      </Board>
    ))

  .addWithInfo('Reverse Sorted Lane',
    'A lane sorted by completed at descending',
    () => (
        <Board>
        <Lane id={lane.key} title={lane.description} cards={lane.cards} sortFunction={(o1,o2) => new Date(o2.completedAt) - new Date(o1.completedAt)}>
        </Lane>
        </Board>
    ));
