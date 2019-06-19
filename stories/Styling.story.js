import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

import './board.css'

const data = require('./data/base.json')

storiesOf('Styling', module).add(
  'Board Styling',
  () => <Board data={data} style={{padding: '30px 20px', fontFamily: 'Verdana'}} className="boardContainer" />,
  {info: 'Change the background and other css styles for the board container'}
)

const dataWithLaneStyles = {
  lanes: [
    {
      id: 'PLANNED',
      title: 'Planned Tasks',
      label: '20/70',
      style: {width: 280, backgroundColor: '#3179ba', color: '#fff', boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)'},
      cards: [
        {
          id: 'Milk',
          title: 'Buy milk',
          label: '15 mins',
          description: '2 Gallons of milk at the Deli store'
        },
        {
          id: 'Plan2',
          title: 'Dispose Garbage',
          label: '10 mins',
          description: 'Sort out recyclable and waste as needed'
        }
      ]
    }
  ]
}

storiesOf('Styling', module).add('Lane Styling', () => <Board data={dataWithLaneStyles} style={{backgroundColor: '#eee'}} />, {
  info: 'Change the look and feel of the lane'
})
