import React, {Component, CSSProperties, HTMLAttributes} from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import Container from 'rt/dnd/Container'
import {Draggable} from 'rt/dnd/Draggable'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import Lane from './Lane'
import {PopoverWrapper} from 'react-popopo'

import * as boardActions from 'rt/actions/BoardActions'
import * as laneActions from 'rt/actions/LaneActions'
import {createTranslate} from '..'
import {BoardData, Card, Lane as ILane} from 'rt/types/Board'
import {FormState as NewCardFormState} from 'rt/components/NewCardForm'
import * as DefaultComponents from './../components'
import {EventBusHandle} from 'rt/types/EventBus'
export interface BoardContainerProps {
  id?: string
  components?: Partial<typeof DefaultComponents>
  actions?: typeof laneActions & typeof boardActions
  className?: string
  data: BoardData
  reducerData?: BoardData
  onDataChange?: (reducerData: BoardData) => void
  eventBusHandle?: (handle: EventBusHandle) => void
  onLaneScroll?: (requestedPage: any, laneId: any) => Promise<unknown>
  onCardClick?: (cardId: Card['id'], metadata: {id: string}, card: Card) => void
  onBeforeCardDelete?: () => void
  onCardDelete?: (cardId: string, laneId: string) => void
  onCardAdd?: (card: Card, laneId: string) => void
  onCardUpdate?: (cardId: string, data: Card) => void
  onLaneAdd?: (laneAddParams: NewCardFormState) => void
  onLaneDelete?: () => void
  onLaneClick?: (laneId: string) => void
  onLaneUpdate?: (laneId: string, data: ILane) => void
  laneSortFunction?: (cardA: Card, cardB: Card) => number
  draggable?: boolean
  collapsibleLanes?: boolean
  editable?: boolean
  canAddLanes?: boolean
  hideCardDeleteAction?: boolean
  hideCardDeleteIcon?: boolean
  handleDragStart?: (cardId: string, laneId: string) => void
  handleDragEnd?: (
    cardId: Card['id'],
    sourceLandId: ILane['id'],
    targetLaneId: ILane['id'],
    position: number,
    card: Card
  ) => void
  handleLaneDragStart?: (payloadId: string) => void
  handleLaneDragEnd?: (removedIndex: string, addedIndex: string, payload: ILane) => void
  style?: CSSProperties
  tagStyle?: CSSProperties
  laneStyle?: CSSProperties
  cardStyle?: CSSProperties
  laneDraggable?: boolean
  cardDraggable?: boolean
  cardDragClass?: string
  laneDragClass?: string
  laneDropClass?: string
  editLaneTitle?: boolean
  onCardMoveAcrossLanes?: (fromLaneId: string, toLaneId: string, cardId: string, addedIndex: string) => void
  t?: typeof createTranslate
}
class BoardContainer extends Component<BoardContainerProps> {
  state = {
    addLaneMode: false
  }
  static defaultProps: {
    t: (v: any) => any
    onDataChange: () => void
    handleDragStart: () => void
    handleDragEnd: () => void
    handleLaneDragStart: () => void
    handleLaneDragEnd: () => void
    onCardUpdate: () => void
    onLaneAdd: () => void
    onLaneDelete: () => void
    onCardMoveAcrossLanes: () => void
    onLaneUpdate: () => void
    editable: boolean
    canAddLanes: boolean
    hideCardDeleteIcon: boolean
    draggable: boolean
    collapsibleLanes: boolean
    laneDraggable: boolean
    cardDraggable: boolean
    cardDragClass: string
    laneDragClass: string
    laneDropClass: string
  }

  componentDidMount() {
    const {actions, eventBusHandle} = this.props

    actions.loadBoard(this.props.data)
    if (eventBusHandle) {
      this.wireEventBus()
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    return this.props.reducerData?.lanes.find(lane => lane.id === laneId).cards[cardIndex]
  }
  getLaneDetails = index => {
    return this.props.reducerData?.lanes[index]
  }

  wireEventBus = () => {
    const {actions, eventBusHandle} = this.props
    const eventBus = {
      publish: event => {
        switch (event.type) {
          case 'ADD_CARD':
            return actions.addCard({laneId: event.laneId, card: event.card})
          case 'UPDATE_CARD':
            return actions.updateCard({laneId: event.laneId, card: event.card})
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
          case 'UPDATE_CARDS':
            return actions.updateCards({laneId: event.laneId, cards: event.cards})
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
    this.props.actions.addLane(params)
    this.props.onLaneAdd(params)
  }

  get groupName() {
    const {id} = this.props
    return `TrelloBoard${id}`
  }

  render() {
    const {
      id,
      components,
      reducerData,
      draggable = false,
      laneDraggable = true,
      laneDragClass = 'react_trello_dragLaneClass',
      laneDropClass = '',
      style,
      onDataChange = () => {},
      onCardAdd,
      onCardUpdate = () => {},
      onCardClick,
      onBeforeCardDelete,
      onCardDelete,
      onLaneScroll,
      onLaneClick,
      onLaneAdd = () => {},
      onLaneDelete = () => {},
      onLaneUpdate,
      editable = false,
      canAddLanes = false,
      laneStyle,
      onCardMoveAcrossLanes = () => {},
      t,
      ...otherProps
    } = this.props

    const {addLaneMode} = this.state
    // Stick to whitelisting attributes to segregate board and lane props
    const passthroughProps = pick(this.props, [
      'onCardMoveAcrossLanes',
      'onLaneScroll',
      'onLaneDelete',
      'onLaneUpdate',
      'onCardClick',
      'onBeforeCardDelete',
      'onCardDelete',
      'onCardAdd',
      'onCardUpdate',
      'onLaneClick',
      'laneSortFunction',
      'draggable',
      'laneDraggable',
      'cardDraggable',
      'collapsibleLanes',
      'canAddLanes',
      'hideCardDeleteIcon',
      'tagStyle',
      'handleDragStart',
      'handleDragEnd',
      'cardDragClass',
      'editLaneTitle',
      't'
    ])

    return (
      <components.BoardWrapper style={style} {...otherProps} draggable={false}>
        <PopoverWrapper>
          <Container
            orientation="horizontal"
            className={this.props.className}
            onDragStart={this.onDragStart}
            dragClass={laneDragClass}
            dropClass={laneDropClass}
            onDrop={this.onLaneDrop}
            lockAxis="x"
            getChildPayload={index => this.getLaneDetails(index)}
            groupName={this.groupName}>
            {reducerData?.lanes.map((lane, index) => {
              const {id, droppable, ...otherProps} = lane
              const laneToRender = (
                <Lane
                  key={id}
                  boardId={this.groupName}
                  components={components}
                  id={id}
                  getCardDetails={this.getCardDetails}
                  index={index}
                  droppable={droppable === undefined ? true : droppable}
                  style={laneStyle || lane.style || {}}
                  labelStyle={lane.labelStyle || {}}
                  cardStyle={this.props.cardStyle || lane.cardStyle}
                  editable={editable && !lane.disallowAddingCard}
                  {...otherProps}
                  {...passthroughProps}
                />
              )
              return draggable && laneDraggable ? <Draggable key={lane.id}>{laneToRender}</Draggable> : laneToRender
            })}
          </Container>
        </PopoverWrapper>
        {canAddLanes && (
          <Container orientation="horizontal">
            {editable && !addLaneMode ? (
              <components.NewLaneSection t={t} onClick={this.showEditableLane} />
            ) : (
              addLaneMode && <components.NewLaneForm onCancel={this.hideEditableLane} onAdd={this.addNewLane} t={t} />
            )}
          </Container>
        )}
      </components.BoardWrapper>
    )
  }
}

BoardContainer.defaultProps = {
  t: v => v,
  onDataChange: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleLaneDragStart: () => {},
  handleLaneDragEnd: () => {},
  onCardUpdate: () => {},
  onLaneAdd: () => {},
  onLaneDelete: () => {},
  onCardMoveAcrossLanes: () => {},
  onLaneUpdate: () => {},
  editable: false,
  canAddLanes: false,
  hideCardDeleteIcon: false,
  draggable: false,
  collapsibleLanes: false,
  laneDraggable: true,
  cardDraggable: true,
  cardDragClass: 'react_trello_dragClass',
  laneDragClass: 'react_trello_dragLaneClass',
  laneDropClass: ''
}

const mapStateToProps = (state: BoardData) => {
  return state?.lanes ? {reducerData: state} : {}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
