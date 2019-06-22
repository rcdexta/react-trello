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
import DefaultNewLane from './NewLane'
import { PopoverWrapper } from '@terebentina/react-popover'
import defaultTranslation from '../helpers/defaultTranslation'

import * as boardActions from '../actions/BoardActions'
import * as laneActions from '../actions/LaneActions'

import uuidv1 from 'uuid/v1'

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
          case 'UPDATE_LANE':
            return actions.updateLane(event.lane)
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
    const lane = { ...params, id: uuidv1() }
    this.props.actions.addLane(lane)
    this.props.onLaneAdd(lane)
  }

  get groupName() {
    const {id} = this.props
    return `TrelloBoard${id}`
  }

  render() {
    const {
      id, reducerData, draggable, laneDraggable, laneDragClass, style, onDataChange, onLaneScroll, onCardMoveAcrossLanes, onCardClick, onLaneClick, onLaneAdd, onLaneDelete, onCardDelete, onCardAdd, editable, canAddLanes, t, inlineEditLaneTitle, onLaneUpdate, NewLane,
      ...otherProps
    } = this.props
    const {addLaneMode} = this.state
    // Stick to whitelisting attributes to segregate board and lane props
    const passthroughProps = pick(this.props, [
      'onCardMoveAcrossLanes',
      'onLaneScroll',
      'onLaneDelete',
      'onCardClick',
      'onCardDelete',
      'onCardAdd',
      'onLaneClick',
      'AddCardLink',
      'laneSortFunction',
      'draggable',
      'cardDraggable',
      'collapsibleLanes',
      'editable',
      'canAddLanes',
      'cardDeletable',
      'Card',
      'LaneHeader',
      'NewCard',
      'tagStyle',
      'handleDragStart',
      'handleDragEnd',
      'cardDragClass',
      'children',
      't'
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
                inlineEditTitle={inlineEditLaneTitle}
                onLaneUpdate={onLaneUpdate}
                key={id}
                boardId={this.groupName}
                id={id}
                getCardDetails={this.getCardDetails}
                index={index}
                droppable={droppable === undefined ? true : droppable}
                style={lane.style || {}}
                labelStyle={lane.labelStyle || {}}
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
                <NewLaneButton onClick={this.showEditableLane}>{t('Add another lane')}</NewLaneButton>
              </LaneSection>
            ) : ( addLaneMode && <NewLane onCancel={this.hideEditableLane} onAdd={this.addNewLane} t={t}/>)
         }

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
  onLaneAdd: PropTypes.func,
  onLaneDelete: PropTypes.func,
  onLaneClick: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  editable: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  cardDeletable: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleLaneDragStart: PropTypes.func,
  handleLaneDragEnd: PropTypes.func,
  Card: PropTypes.element,
  LaneHeader: PropTypes.element,
  AddCardLink: PropTypes.element,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  laneDraggable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string,
  laneDragClass: PropTypes.string,
  onLaneUpdate: PropTypes.func,
  inlineEditLaneTitle: PropTypes.bool,
  t: PropTypes.func.isRequired
}

BoardContainer.defaultProps = {
  NewLane: DefaultNewLane,
  onDataChange: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleLaneDragStart: () => {},
  handleLaneDragEnd: () => {},
  onLaneAdd: () => {},
  onLaneDelete: () => {},
  onCardMoveAcrossLanes: () => {},
  editable: false,
  canAddLanes: false,
  cardDeletable: true,
  draggable: false,
  collapsibleLanes: false,
  inlineEditLaneTitle: false,
  laneDraggable: true,
  cardDraggable: true,
  cardDragClass: 'react_trello_dragClass',
  laneDragClass: 'react_trello_dragLaneClass',
  t: defaultTranslation,
}

const mapStateToProps = state => {
  return state.lanes ? {reducerData: state} : {}
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer)
