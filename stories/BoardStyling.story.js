import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

const data = require('./data.json');

storiesOf('react-trello', module)

  .addWithInfo('Board Styling',
    'Change the background and other css styles for the board container',
    () => (
      <Board data={data} style={{backgroundColor: '#4BBF6B', paddingTop: 60, paddingLeft: 40}}/>
    ));
