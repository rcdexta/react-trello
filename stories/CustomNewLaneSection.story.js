import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/data-sort.json')

const NewLaneSection = ({t, onClick}) => <button onClick={onClick}>{t('Add another lane')}</button>

storiesOf('Custom Components', module)
  .add('NewLaneSection', () => <Board editable canAddLanes components={{NewLaneSection: NewLaneSection}} data={data} />, {
})
