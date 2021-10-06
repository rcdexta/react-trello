import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import update from 'immutability-helper'
import debug from './helpers/debug'

import Board from '../src'

const data = require('./data/base.json')

class RealtimeBoard extends Component {
  state = {boardData: data, eventBus: undefined}

  setEventBus = handle => {
    this.state.eventBus = handle
  }

  completeMilkEvent = () => {
    this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
    })
  }

  addBlockedEvent = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
    })
  }

  addCardWithIndex = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'WIP',
      card: { id: 'AddWithIndex', title: 'Urgent Task', label: '5 mins', description: 'Everything is down' },
      index: 0
    })
  }

  modifyLaneTitle = () => {
    const data = this.state.boardData
    const newData = update(data, {lanes: {1: {title: {$set: 'New Lane Title'}}}})
    this.setState({boardData: newData})
  }

  modifyCardTitle = () => {
    const data = this.state.boardData
    const newData = update(data, {lanes: {1: {cards: {0: {title: {$set: 'New Card Title'}}}}}})
    this.setState({boardData: newData})
  }

  updateCard = () => {
    this.state.eventBus.publish({
      type: 'UPDATE_CARD',
      laneId: 'PLANNED',
      card: {id: 'Plan2', title: 'UPDATED Dispose Garbage', label: '45 mins', description: 'UPDATED Sort out recyclable and waste as needed'}
    })
  }

  prioritizeWriteBlog = () => {
    this.state.eventBus.publish({
      type: 'MOVE_CARD',
      fromLaneId: 'PLANNED',
      toLaneId: 'WIP',
      cardId: 'Plan3',
      index: 0
    })
  }

  shouldReceiveNewData = nextData => {
    debug('data has changed')
    debug(nextData)
  }

  render() {
    return (
      <div>
        <button onClick={this.completeMilkEvent} style={{margin: 5}}>
          Complete Buy Milk
        </button>
        <button onClick={this.addBlockedEvent} style={{margin: 5}}>
          Add Blocked
        </button>
        <button onClick={this.addCardWithIndex} style={{margin: 5}}>
          Add Card At Given Index
        </button>
        <button onClick={this.modifyLaneTitle} style={{margin: 5}}>
          Modify Lane Title
        </button>
        <button onClick={this.modifyCardTitle} style={{margin: 5}}>
          Modify Card Title
        </button>
        <button onClick={this.prioritizeWriteBlog} style={{margin: 5}}>
          Prioritize Write Blog
        </button>
        <button onClick={this.updateCard} style={{margin: 5}}>
          Update Dispose Garbage
        </button>
        <Board data={this.state.boardData} onDataChange={this.shouldReceiveNewData} eventBusHandle={this.setEventBus} />
      </div>
    )
  }
}

storiesOf('Advanced Features', module).add('Realtime Events', () => <RealtimeBoard />, {
  info: 'This is an illustration of external events that modify the cards in the board'
})
