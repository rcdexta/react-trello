import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import {Board} from '../src'

const data = require('./data.json')

import './board.css'

storiesOf('React Trello', module).add(
  'Board Styling',
  withInfo('Change the background and other css styles for the board container')(() =>
    <Board data={data} style={{paddingTop: 60, paddingLeft: 40}} className='boardContainer'/>
  )
)
