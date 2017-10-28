import React, {Component} from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data.json')

class AsyncBoard extends Component {
  state = {boardData: {lanes: []}}

  async componentWillMount () {
    const response = await this.getBoard()
    this.setState({boardData: response})
  }

  getBoard () {
    return new Promise(resolve => {
      resolve(data)
    })
  }

  render () {
    return <Board data={this.state.boardData}/>
  }
}

storiesOf('React Trello', module).add(
  'Async Load data',
  withInfo('Load board data asynchronously after the component has mounted')(() => <AsyncBoard />)
)
