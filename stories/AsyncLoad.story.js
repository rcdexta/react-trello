import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/base.json')

class AsyncBoard extends Component {
  state = {boardData: {lanes: [{id: 'loading', title: 'loading..', cards: []}]}}

  componentDidMount() {
    setTimeout(this.getBoard.bind(this), 1000)
  }

  getBoard() {
    this.setState({boardData: data})
  }

  render() {
    return <Board data={this.state.boardData} />
  }
}

storiesOf('Advanced Features', module).add('Async Load data', () => <AsyncBoard />, {info: 'Load board data asynchronously after the component has mounted'})
