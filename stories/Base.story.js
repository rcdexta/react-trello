import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/base.json')

storiesOf('Basic Functions', module).add('Full Board example', () => <Board data={data} />, {
  info: 'A complete Trello board with multiple lanes fed as json data'
})
