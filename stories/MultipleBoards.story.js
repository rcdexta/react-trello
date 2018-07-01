import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data1 = require('./data/base.json')
const data2 = require('./data/other-board')

const containerStyles = {
  height: 500,
  padding: 20
}

storiesOf('Multiple Boards', module).add(
  'Two Boards',
  withInfo('Have two boards rendering their own data')(() => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={containerStyles}>
          <Board data={data1} draggable />
        </div>
        <div style={containerStyles}>
          <Board data={data2} draggable />
        </div>
      </div>
    )
  })
)
