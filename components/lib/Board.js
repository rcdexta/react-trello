import React, { Component } from 'react'

const Board = ({ children }) => (
  <div className='board'>
    {children}
  </div>
);

Board.propTypes = {
  children: React.PropTypes.node
}

export default Board
