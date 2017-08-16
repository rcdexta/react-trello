import React, {Component, PropTypes} from 'react'
import {BoardDiv} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {DragDropContext} from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import Lane from './Lane'

const boardActions = require('../actions/BoardActions')
const laneActions = require('../actions/LaneActions')

class BoardContainer extends Component {

  wireEventBus = () => {
    let eventBus = {
      publish: (event) => {
        switch (event.type) {
          case 'ADD_CARD':
            return this.props.actions.addCard({laneId: event.laneId, card: event.card})
          case 'REMOVE_CARD':
            return this.props.actions.removeCard({laneId: event.laneId, cardId: event.cardId})
          case 'REFRESH_BOARD':
            return this.props.actions.loadBoard(event.data)
        }
      }
    }
    this.props.eventBusHandle(eventBus)
  }

  componentWillMount () {
    this.props.actions.loadBoard(this.props.data)
    if (this.props.eventBusHandle) {
      this.wireEventBus()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data) {
      this.props.onDataChange && this.props.onDataChange(nextProps.data)
    }
  }

  render () {
    const {data, style} = this.props
    return <BoardDiv style={style}>
      {
        data.lanes.map((lane) => {
          const {id, ...otherProps} = lane
          const {tagStyle, draggable, handleDragStart, handleDragEnd, onCardClick, onLaneScroll, laneSortFunction, customCardLayout, cardStyle, children} = this.props
          return <Lane key={`${id}`}
            id={id}
            {...otherProps}
            {...{tagStyle, draggable, handleDragStart, handleDragEnd, onCardClick, onLaneScroll, laneSortFunction, customCardLayout, cardStyle, children}}
          />
        })}
    </BoardDiv>
  }
}

BoardContainer.propTypes = {
  data: PropTypes.object.isRequired,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  eventBusHandle: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  onDataChange: PropTypes.func,
  customCardLayout: PropTypes.bool,
  style: PropTypes.object
}

const mapStateToProps = (state) => {
  return state.lanes ? {data: state} : {}
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(MultiBackend(HTML5toTouch))(BoardContainer))
