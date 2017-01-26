import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

const data = require('./data.json');

storiesOf('react-kanban', module)

  .addWithInfo('Simple Example',
    'A simple Trello board with a single lane',
    () => (
      <Board>
        <Lane key='Lane1'
              title='Planned Tasks'>
          <Card key='Card1'
                title='Board and Lane'
                description='Trello board and Lane as components'
                rightHeader='2 days'/>
          <Card key='Card2'
                title='Card as component'
                description='Model a simple card component'
                rightHeader='1 day'/>
        </Lane>
      </Board>
    ))

  .addWithInfo('Bigger Board',
    'A complete Trello board with multiple lanes',
    () => (
      <Board>
        {data.lanes.map((lane) => {
          return <Lane key={lane.key}
                       title={lane.description}
                       rightHeader={`${lane.overdueCount}/${lane.totalCount}`}>
            {
              lane.cards && lane.cards.map((card) => {
                return <Card key={card.title}
                             title={card.title}
                             description={card.description}
                             rightHeader={card.sla}/>
              })
            }
          </Lane>
        })}
      </Board>
    ));
