import React, { Component } from 'react'
import './Board.scss'

export default class Board extends Component {
  render () {
    return <div className='board'>
      {this.props.children}
    </div>
  }
}

Board.propTypes = {
  children: React.PropTypes.node
}
