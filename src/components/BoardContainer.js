import React, {Component} from 'react'
import {BoardDiv} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import dragula from 'dragula'
import Lane from './Lane'

const boardActions = require('../actions/board_actions')
const laneActions = require('../actions/lane_actions')

class BoardContainer extends Component {

  state = {data: this.props.data}

  handleDragDrop = () => {
    dragula([...document.querySelectorAll('.drag-inner-list')])
      .on('drag', (el) => {
        const cardId = el.dataset.id
        const sourceLaneId = el.parentNode.dataset.id
        this.props.onDragStart(cardId, sourceLaneId)
        el.classList.add('is-moving')
      })
      .on('drop', (el, target, source, sibling) => {
        el.classList.remove('is-moving')
        const cardId = el.dataset.id
        const fromLaneId = source.dataset.id
        const toLaneId = target.dataset.id
        this.props.onDragEnd(cardId, fromLaneId, toLaneId)
        // this.props.actions.moveCard({fromLaneId: fromLaneId, toLaneId: toLaneId, cardId: cardId})
      })
  }

  wireEventBus = () => {
    let eventBus = {
      publish: (event) => {
        switch (event.type) {
          case 'ADD_CARD':
            this.props.actions.addCard({laneId: event.laneId, card: event.card})
          case 'REMOVE_CARD':
            this.props.actions.removeCard({laneId: event.laneId, cardId: event.cardId})
        }
      }
    }
    this.props.eventBusHandle(eventBus)
  }

  componentDidMount () {
    this.props.actions.loadBoard(this.props.data)

    if (this.props.draggable) {
      this.handleDragDrop()
    }

    if (this.props.eventBusHandle) {
      this.wireEventBus()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.newData) {
      const dataToUpdate = this.state.data
      dataToUpdate.lanes = nextProps.newData.lanes
      this.setState({data: dataToUpdate})
    }
  }

  render () {
    const {data} = this.state
    return <BoardDiv>
      {
        data.lanes.map((lane) => {
          const {id, ...otherProps} = lane
          return <Lane key={id}
            id={id}
            {...otherProps}
            onCardClick={this.props.onCardClick}
            onLaneScroll={this.props.onLaneScroll}
            laneSortFunction={this.props.laneSortFunction}
          />
        })}
    </BoardDiv>
  }
}

BoardContainer.propTypes = {
  data: React.PropTypes.object.isRequired,
  onLaneScroll: React.PropTypes.func,
  onCardClick: React.PropTypes.func,
  eventBusHandle: React.PropTypes.func,
  laneSortFunction: React.PropTypes.func,
  draggable: React.PropTypes.bool,
  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {newData: state}
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
