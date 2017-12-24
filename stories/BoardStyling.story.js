import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data.json')

import './board.css'

storiesOf('Advanced Features', module).add(
  'Board Styling',
  withInfo('Change the background and other css styles for the board container')(() =>
    <Board data={data} style={{}} className='boardContainer'/>
  )
)
