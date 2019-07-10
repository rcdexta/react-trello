import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/collapsible.json')

const LaneFooter = ({onClick, collapsed}) => <div onClick={onClick}>{collapsed ? 'click to expand' : 'click to collapse'}</div>

storiesOf('Custom Components', module).
  add('LaneFooter', () => <Board collapsibleLanes components={{LaneFooter: LaneFooter}} data={data} />)
