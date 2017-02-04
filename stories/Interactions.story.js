import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

const data = require('./data.json');

storiesOf('react-trello', module)

  .addWithInfo('Event Handling',
    'Adding event handlers to each card',
    () => (
      <div>
        <Board>
          <Lane key='Lane1'
                title='Planned Tasks'>
            <Card key='Card1'
                  title='Board and Lane'
                  description='Trello board and Lane as components'
                  onClick={() => alert('You chose wisely!')}/>
            <Card key='Card2'
                  title='Card as component'
                  description='Model a simple card component'
                  onClick={() => alert('Continue creating additional dialogues?')}/>
          </Lane>
        </Board>
      </div>
    ))

