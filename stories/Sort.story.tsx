import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

// const data = require('./data/data-sort.json')
import data from './data/data-sort.json'
storiesOf('Basic Functions', module)
  .add(
    'Sorted Lane',
    () => (
      <Board
        data={data}
        laneSortFunction={(card1, card2) =>
          new Date(card1.metadata.completedAt).getTime() - new Date(card2.metadata.completedAt).getTime()
        }
      />
    ),
    {info: 'A lane sorted by completed at ascending'}
  )
  .add(
    'Reverse Sorted Lane',
    () => (
      <Board
        data={data}
        laneSortFunction={(card1, card2) =>
          new Date(card2.metadata.completedAt).getTime() - new Date(card1.metadata.completedAt).getTime()
        }
      />
    ),
    {info: 'A lane sorted by completed at descending'}
  )
