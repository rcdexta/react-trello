import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

const data = require('./data.json');

storiesOf('react-trello', module)

  .add('Drag-n-Drop',
    () => (
      <Board>
        <Lane key='Lane1'
              title='Planned'
              cards={[
                <Card key='Card1'
                      title='Refactor code'
                      description='Review and refactor DnD module'/>,
                <Card key='Card2'
                      title='Deployment script'
                      description='Automate deployment with semantic-release'/>
              ]}>
        </Lane>
        <Lane key='Lane2'
              title='Completed'
              cards={[
                <Card key='Card3'
                      title='Unit Tests'
                      description='Add unit tests for all components'/>
              ]}>
        </Lane>
      </Board>
    ))

