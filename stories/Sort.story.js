import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/data-sort.json')

storiesOf('Basic Functions', module)
  .add(
    'Sorted Lane',
    withInfo('A lane sorted by completed at ascending')(() =>
      <Board
        data={data}
        laneSortFunction={(card1, card2) => new Date(card1.metadata.completedAt) - new Date(card2.metadata.completedAt)}
      />
    )
  )
  .add(
    'Reverse Sorted Lane',
    withInfo('A lane sorted by completed at descending')(() =>
      <Board
        data={data}
        laneSortFunction={(card1, card2) => new Date(card2.metadata.completedAt) - new Date(card1.metadata.completedAt)}
      />
    )
  )
