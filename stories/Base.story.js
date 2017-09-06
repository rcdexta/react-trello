import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import {Board} from '../src'

const data = require('./data.json')

storiesOf('React Trello', module).add(
  'Full Board example',
  withInfo('A complete Trello board with multiple lanes fed as json data')(() =>
      <Board data={data} />
  )
)
