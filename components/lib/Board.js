import React, { Component } from 'react'
import dragula from 'dragula'

export default class Board extends Component {

  componentDidMount() {
    dragula([...document.querySelectorAll('.drag-inner-list')])
      .on('drag', function(el) {
        // add 'is-moving' class to element being dragged
        el.classList.add('is-moving');
      })
      .on('dragend', function(el) {
        // remove 'is-moving' class from element after dragging has stopped
        el.classList.remove('is-moving');

        // add the 'is-moved' class for 600ms then remove it
        window.setTimeout(function() {
          el.classList.add('is-moved');
          window.setTimeout(function() {
            el.classList.remove('is-moved');
          }, 600);
        }, 100);
      });
  }

  render() {
    return <div className='board'>
      {this.props.children}
    </div>
  }
}

Board.propTypes = {
  children: React.PropTypes.node
}
