import React, {Component} from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import {BoardDiv} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Lane from './Lane'

import * as boardActions from '../actions/BoardActions'
import * as laneActions from '../actions/LaneActions'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

class BoardContainer extends Component {
  wireEventBus = () => {
    const {actions, eventBusHandle} = this.props
    let eventBus = {
      publish: event => {
        switch (event.type) {
          case 'ADD_CARD':
            return actions.addCard({laneId: event.laneId, card: event.card})
          case 'REMOVE_CARD':
            return actions.removeCard({laneId: event.laneId, cardId: event.cardId})
          case 'REFRESH_BOARD':
            return actions.loadBoard(event.data)
        }
      }
    }
    eventBusHandle(eventBus)
  }

  componentWillMount() {
    const {actions, eventBusHandle} = this.props
    actions.loadBoard(this.props.data)
    if (eventBusHandle) {
      this.wireEventBus()
    }
  }

  componentWillReceiveProps(nextProps) {
    // nextProps.data changes when external Board input props change and nextProps.reducerData changes due to event bus or UI changes
    const {data, reducerData, onDataChange} = this.props
    if (nextProps.reducerData && !isEqual(reducerData, nextProps.reducerData)) {
      onDataChange(nextProps.reducerData)
    }
    if (nextProps.data && !isEqual(nextProps.data, data)) {
      this.props.actions.loadBoard(nextProps.data)
      onDataChange(nextProps.data)
    }
  }

  onDragStart = initial => {
    console.log('onDragStart')
    console.log(initial)
  }

  onDragEnd = result => {
    console.log('onDragEnd')
    console.log(result)
    const {source, destination, draggableId} = result
		destination && this.props.actions.moveCardAcrossLanes({fromLaneId: source.droppableId, toLaneId: destination.droppableId, cardId: draggableId, index: destination.index})
  }

  render() {
    const {reducerData, style, ...otherProps} = this.props
    // Stick to whitelisting attributes to segregate board and lane props
    const passthroughProps = pick(this.props, [
      'onLaneScroll',
      'onCardClick',
      'onCardDelete',
      'onCardAdd',
      'onLaneClick',
      'addCardLink',
      'laneSortFunction',
      'draggable',
      'editable',
      'handleDragStart',
      'handleDragEnd',
      'customCardLayout',
      'newCardTemplate',
      'customLaneHeader',
      'tagStyle',
      'children'
    ])

    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <BoardDiv style={style} {...otherProps}>
          {reducerData.lanes.map((lane, index) => {
            const {id, droppable, ...otherProps} = lane
            return (
              <Lane
                key={`${id}`}
                id={id}
                index={index}
                droppable={droppable === undefined ? true : droppable}
                {...otherProps}
                {...passthroughProps}
              />
            )
          })}
        </BoardDiv>
      </DragDropContext>
    )
  }
}

BoardContainer.propTypes = {
  data: PropTypes.object.isRequired,
  onDataChange: PropTypes.func,
  eventBusHandle: PropTypes.func,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  addCardLink: PropTypes.node,
  onLaneClick: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  customCardLayout: PropTypes.bool,
  newCardTemplate: PropTypes.node,
  customLaneHeader: PropTypes.element,
  style: PropTypes.object,
  tagStyle: PropTypes.object
}

BoardContainer.defaultProps = {
  onDataChange: () => {},
  editable: false,
  draggable: false
}

const mapStateToProps = state => {
  return state.lanes ? {reducerData: state} : {}
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
