import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/base.json')

class AsyncBoard extends Component {
  state = {boardData: {lanes: []}}

  async componentDidMount() {
    const response = await this.getBoard()
    this.setState({boardData: response})
  }

  getBoard() {
    return new Promise(resolve => {
      resolve(data)
    })
  }

  render() {
    return <Board data={this.state.boardData} />
  }
}

storiesOf('Advanced Features', module).add('Async Load data', () => <AsyncBoard />, {info: 'Load board data asynchronously after the component has mounted'})
