import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

const data = require('./data.json');

storiesOf('react-trello', module)

  .addWithInfo('Full Board example',
    'A complete Trello board with multiple lanes fed as json data',
    () => (
      <Board data={data}/>
    ));
