import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Container from '../dnd/Container'
import Draggable from '../dnd/Draggable'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import {BoardDiv, LaneSection} from '../styles/Base'
import {NewLaneButton} from '../styles/Elements'
import Lane from './Lane'
import NewLane from './NewLane'
import { PopoverWrapper } from '@terebentina/react-popover'

import * as boardActions from '../actions/BoardActions'
import * as laneActions from '../actions/LaneActions'

class BoardContainer extends Component {
  state = {
    addLaneMode: false
  }

  componentDidMount() {
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

  onDragStart = ({payload}) => {
    const {handleLaneDragStart} = this.props
    handleLaneDragStart(payload.id)
  }

  onLaneDrop = ({removedIndex, addedIndex, payload}) => {
    const {actions, handleLaneDragEnd} = this.props
    if (removedIndex !== addedIndex) {
      actions.moveLane({oldIndex: removedIndex, newIndex: addedIndex})
      handleLaneDragEnd(removedIndex, addedIndex, payload)
    }
  }
  getCardDetails = (laneId, cardIndex) => {
    return this.props.reducerData.lanes.find(lane => lane.id === laneId).cards[cardIndex]
  }
  getLaneDetails = index => {
    return this.props.reducerData.lanes[index]
  }

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
          case 'MOVE_CARD':
            return actions.moveCardAcrossLanes({
              fromLaneId: event.fromLaneId,
              toLaneId: event.toLaneId,
              cardId: event.cardId,
              index: event.index
            })
          case 'UPDATE_LANES':
            return actions.updateLanes(event.lanes)
        }
      }
    }
    eventBusHandle(eventBus)
  }

  // + add
  hideEditableLane = () => {
    this.setState({addLaneMode: false})
  }

  showEditableLane = () => {
    this.setState({addLaneMode: true})
  }

  addNewLane = params => {
    this.hideEditableLane()
    this.props.actions.addLane(params)
    this.props.onLaneAdd(params)
  }

  renderNewLane = () => {
    const {newLaneTemplate} = this.props
    if (newLaneTemplate) {
      const newCardWithProps = React.cloneElement(newLaneTemplate, {
        onCancel: this.hideEditableLane,
        onAdd: this.addNewLane
      })
      return <span>{newCardWithProps}</span>
    } else {
      return <NewLane onCancel={this.hideEditableLane} onAdd={this.addNewLane} />
    }
  }

  get groupName() {
    const {id} = this.props
    return `TrelloBoard${id}`
  }

  render() {
    const {id, reducerData, draggable, laneDraggable, laneDragClass, style, onDataChange, onLaneScroll, onCardClick, onLaneClick, onLaneAdd, onCardDelete, onCardAdd, addLaneTitle, editable, canAddLanes, ...otherProps} = this.props
    const {addLaneMode} = this.state
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
      'cardDraggable',
      'collapsibleLanes',
      'editable',
      'canAddLanes',
      'hideCardDeleteIcon',
      'customCardLayout',
      'customLaneHeader',
      'tagStyle',
      'handleDragStart',
      'handleDragEnd',
      'cardDragClass',
      'children',
      'addLaneTitle',
      'addCardTitle',
      'newLaneTemplate',
      'newCardTemplate'
    ])

    return (
      <BoardDiv style={style} {...otherProps} draggable={false}>
        <PopoverWrapper>
        <Container
          orientation="horizontal"
          onDragStart={this.onDragStart}
          dragClass={laneDragClass}
          dropClass=""
          onDrop={this.onLaneDrop}
          lockAxis="x"
          getChildPayload={index => this.getLaneDetails(index)}
          groupName={this.groupName}>
          {reducerData.lanes.map((lane, index) => {
            const {id, droppable, ...otherProps} = lane
            const laneToRender = (
              <Lane
                key={id}
                boardId={this.groupName}
                id={id}
                getCardDetails={this.getCardDetails}
                index={index}
                droppable={droppable === undefined ? true : droppable}
                {...otherProps}
                {...passthroughProps}
              />
            )
            return draggable && laneDraggable ? <Draggable key={lane.id}>{laneToRender}</Draggable> : <span key={lane.id}>{laneToRender}</span>
          })}
        </Container>
        </PopoverWrapper>
        {canAddLanes && (
          <Container orientation="horizontal">
            {editable && !addLaneMode ? (
              <LaneSection style={{width: 200}}>
                <NewLaneButton onClick={this.showEditableLane}>{addLaneTitle}</NewLaneButton>
              </LaneSection>
            ) : (
              addLaneMode && this.renderNewLane()
            )}
          </Container>
        )}
      </BoardDiv>
    )
  }
}

BoardContainer.propTypes = {
  id: PropTypes.string,
  actions: PropTypes.object,
  data: PropTypes.object.isRequired,
  reducerData: PropTypes.object,
  onDataChange: PropTypes.func,
  eventBusHandle: PropTypes.func,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  addCardLink: PropTypes.node,
  onLaneAdd: PropTypes.func,
  onLaneClick: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  editable: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  hideCardDeleteIcon: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleLaneDragStart: PropTypes.func,
  handleLaneDragEnd: PropTypes.func,
  customCardLayout: PropTypes.bool,
  customLaneHeader: PropTypes.element,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  laneDraggable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string,
  laneDragClass: PropTypes.string,
  addLaneTitle: PropTypes.string,
  addCardTitle: PropTypes.string,
  newLaneTemplate: PropTypes.node
}

BoardContainer.defaultProps = {
  onDataChange: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleLaneDragStart: () => {},
  handleLaneDragEnd: () => {},
  onLaneAdd: () => {},
  editable: false,
  canAddLanes: false,
  hideCardDeleteIcon: false,
  draggable: false,
  collapsibleLanes: false,
  laneDraggable: true,
  cardDraggable: true,
  cardDragClass: 'react_trello_dragClass',
  laneDragClass: 'react_trello_dragLaneClass',
  addLaneTitle: '+ Add another lane',
  addCardTitle: 'Add Card'
}

const mapStateToProps = state => {
  return state.lanes ? {reducerData: state} : {}
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer)
