import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

const lane = require('./data-sort.json');

storiesOf('react-trello', module)

  .addWithInfo('Event Handling Through Lane',
    'Adding event handlers to each card through lane card click method',
    () => (
        <Board>
        <Lane id={lane.key} title={lane.description} cards={lane.cards} onCardClick={(m) => alert(JSON.stringify(m))}>
        </Lane>
        </Board>
        ))

