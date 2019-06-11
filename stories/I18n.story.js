import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'
import defaultTranslation from '../src/helpers/defaultTranslation'

const data = require('./data/base.json')
const smallData = require('./data/data-sort')

const customTranslation = (key) => {
  return '*' + defaultTranslation(key) + '*'
}

storiesOf('Internationalization (I81n)', module).add(
  'Custom texts',
  () => {
    return (
      <Board
        data={smallData}
        t={customTranslation}
        editable
        canAddLanes
        draggable
        />
    )
  },
  {info: 'Have custom text titles'}
)
