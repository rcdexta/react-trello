import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

const data = require('./data-sort.json');

storiesOf('react-trello', module)

  .addWithInfo('Sorted Lane',
    'A lane sorted by completed at ascending',
    () => (
      <Board data={data}
             laneSortFunction={(card1, card2) => new Date(card1.metadata.completedAt) - new Date(card2.metadata.completedAt)}/>
    ))

  .addWithInfo('Reverse Sorted Lane',
    'A lane sorted by completed at descending',
    () => (
      <Board data={data}
             laneSortFunction={(card1, card2) => new Date(card2.metadata.completedAt) - new Date(card1.metadata.completedAt)}/>

    ));
