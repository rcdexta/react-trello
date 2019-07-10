import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/collapsible.json')

const CustomAddCardLink =  ({onClick, t}) => <button onClick={onClick}>{t('Click to add card')}</button>

storiesOf('Custom Components', module)
  .add(
    'AddCardLink',
    () => {
      return <Board data={data} editable components={{AddCardLink: CustomAddCardLink}} />
    }
  )
