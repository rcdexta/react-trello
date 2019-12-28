import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/data-sort.json')

function compare(a, b) {
  if (a.title > b.title) {
    return 1
  }
  if (a.title < b.title) {
    return -1
  }

  return 0
}

storiesOf('Basic Functions', module)
  .add('Sorted Lane', () => <Board data={data} laneSortFunction={(card1, card2) => compare(card1, card2)} />, {
    info: 'A lane sorted by completed at ascending'
  })
  .add(
    'Reverse Sorted Lane',
    () => (
      <Board
        data={data}
        laneSortFunction={(card1, card2) => new Date(card2.metadata.completedAt) - new Date(card1.metadata.completedAt)}
      />
    ),
    {info: 'A lane sorted by completed at descending'}
  )
