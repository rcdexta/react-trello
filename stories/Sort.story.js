import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/data-sort.json')

storiesOf('Basic Functions', module)
  .add(
    'Sorted Lane',
    () => <Board data={data} laneSortFunction={(card1, card2) => new Date(card1.metadata.completedAt) - new Date(card2.metadata.completedAt)} />,
    {info: 'A lane sorted by completed at ascending'}
  )
  .add(
    'Reverse Sorted Lane',
    () => <Board data={data} laneSortFunction={(card1, card2) => new Date(card2.metadata.completedAt) - new Date(card1.metadata.completedAt)} />,
    {info: 'A lane sorted by completed at descending'}
  )
