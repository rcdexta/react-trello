import React, {Component} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import uuidv1 from 'uuid/v1'

import Container from 'rt/dnd/Container'
import Draggable from 'rt/dnd/Draggable'

import * as laneActions from 'rt/actions/LaneActions'

class Lane extends Component {
  state = {
    loading: false,
    currentPage: this.props.currentPage,
    addCardMode: false,
    collapsed: false,
    isDraggingOver: false
  }

  handleScroll = evt => {
    const node = evt.target
    const elemScrollPosition = node.scrollHeight - node.scrollTop - node.clientHeight
    const {onLaneScroll} = this.props
    // In some browsers and/or screen sizes a decimal rest value between 0 and 1 exists, so it should be checked on < 1 instead of < 0
    if (elemScrollPosition < 1 && onLaneScroll && !this.state.loading) {
      const {currentPage} = this.state
      this.setState({loading: true})
      const nextPage = currentPage + 1
      onLaneScroll(nextPage, this.props.id).then(moreCards => {
        if ((moreCards || []).length > 0) {
          this.props.actions.paginateLane({
            laneId: this.props.id,
            newCards: moreCards,
            nextPage: nextPage
          })
        }
        this.setState({loading: false})
      })
    }
  }

  sortCards(cards, sortFunction) {
    if (!cards) return []
    if (!sortFunction) return cards
    return cards.concat().sort(function (card1, card2) {
      return sortFunction(card1, card2)
    })
  }

  laneDidMount = node => {
    if (node) {
      node.addEventListener('scroll', this.handleScroll)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.cards, nextProps.cards)) {
      this.setState({
        currentPage: nextProps.currentPage
      })
    }
  }

  removeCard = cardId => {
    if (this.props.onBeforeCardDelete && typeof this.props.onBeforeCardDelete === 'function') {
      this.props.onBeforeCardDelete(() => {
        this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id)
        this.props.actions.removeCard({laneId: this.props.id, cardId: cardId})
      })
    } else {
      this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id)
      this.props.actions.removeCard({laneId: this.props.id, cardId: cardId})
    }
  }

  handleCardClick = (e, card) => {
    const {onCardClick} = this.props
    onCardClick && onCardClick(card.id, card.metadata, card.laneId)
    e.stopPropagation()
  }

  showEditableCard = () => {
    this.setState({addCardMode: true})
  }

  hideEditableCard = () => {
    this.setState({addCardMode: false})
  }

  addNewCard = params => {
    const laneId = this.props.id
    const id = uuidv1()
    this.hideEditableCard()
    let card = {id, ...params}
    this.props.actions.addCard({laneId, card})
    this.props.onCardAdd(card, laneId)
  }

  onDragStart = ({payload}) => {
    const {handleDragStart} = this.props
    handleDragStart && handleDragStart(payload.id, payload.laneId)
  }

  shouldAcceptDrop = sourceContainerOptions => {
    return this.props.droppable && sourceContainerOptions.groupName === this.groupName
  }

  get groupName() {
    const {boardId} = this.props
    return `TrelloBoard${boardId}Lane`
  }

  onDragEnd = (laneId, result) => {
    const {handleDragEnd} = this.props
    const {addedIndex, payload} = result

    if (this.state.isDraggingOver) {
      this.setState({isDraggingOver: false})
    }

    if (addedIndex != null) {
      const newCard = {...cloneDeep(payload), laneId}
      const response = handleDragEnd ? handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, newCard) : true
      if (response === undefined || !!response) {
        this.props.actions.moveCardAcrossLanes({
          fromLaneId: payload.laneId,
          toLaneId: laneId,
          cardId: payload.id,
          index: addedIndex
        })
        this.props.onCardMoveAcrossLanes(payload.laneId, laneId, payload.id, addedIndex)
      }
      return response
    }
  }

  updateCard = updatedCard => {
    this.props.actions.updateCard({laneId: this.props.id, card: updatedCard})
    this.props.onCardUpdate(this.props.id, updatedCard)
  }

  renderDragContainer = isDraggingOver => {
    const {
      id,
      cards,
      laneSortFunction,
      editable,
      hideCardDeleteIcon,
      cardDraggable,
      cardDragClass,
      cardDropClass,
      tagStyle,
      cardStyle,
      components,
      t
    } = this.props
    const {addCardMode, collapsed} = this.state

    const showableCards = collapsed ? [] : cards

    const cardList = this.sortCards(showableCards, laneSortFunction).map((card, idx) => {
      const onDeleteCard = () => this.removeCard(card.id)
      const cardToRender = (
        <components.Card
          key={card.id}
          index={idx}
          style={card.style || cardStyle}
          className="react-trello-card"
          onDelete={onDeleteCard}
          onClick={e => this.handleCardClick(e, card)}
          onChange={updatedCard => this.updateCard(updatedCard)}
          showDeleteButton={!hideCardDeleteIcon}
          tagStyle={tagStyle}
          cardDraggable={cardDraggable}
          editable={editable}
          t={t}
          {...card}
        />
      )
      return cardDraggable && (!card.hasOwnProperty('draggable') || card.draggable) ? (
        <Draggable key={card.id}>{cardToRender}</Draggable>
      ) : (
        <span key={card.id}>{cardToRender}</span>
      )
    })

    return (
      <components.ScrollableLane ref={this.laneDidMount} isDraggingOver={isDraggingOver}>
        <Container
          orientation="vertical"
          groupName={this.groupName}
          dragClass={cardDragClass}
          dropClass={cardDropClass}
          onDragStart={this.onDragStart}
          onDrop={e => this.onDragEnd(id, e)}
          onDragEnter={() => this.setState({isDraggingOver: true})}
          onDragLeave={() => this.setState({isDraggingOver: false})}
          shouldAcceptDrop={this.shouldAcceptDrop}
          getChildPayload={index => this.props.getCardDetails(id, index)}>
          {cardList}
        </Container>
        {editable && !addCardMode && <components.AddCardLink onClick={this.showEditableCard} t={t} laneId={id} />}
        {addCardMode && (
          <components.NewCardForm onCancel={this.hideEditableCard} t={t} laneId={id} onAdd={this.addNewCard} />
        )}
      </components.ScrollableLane>
    )
  }

  removeLane = () => {
    const {id} = this.props
    this.props.actions.removeLane({laneId: id})
    this.props.onLaneDelete(id)
  }

  updateTitle = value => {
    this.props.actions.updateLane({id: this.props.id, title: value})
    this.props.onLaneUpdate(this.props.id, {title: value})
  }

  renderHeader = pickedProps => {
    const {components} = this.props
    return (
      <components.LaneHeader
        {...pickedProps}
        onDelete={this.removeLane}
        onDoubleClick={this.toggleLaneCollapsed}
        updateTitle={this.updateTitle}
      />
    )
  }

  toggleLaneCollapsed = () => {
    this.props.collapsibleLanes && this.setState(state => ({collapsed: !state.collapsed}))
  }

  render() {
    const {loading, isDraggingOver, collapsed} = this.state
    const {
      id,
      cards,
      collapsibleLanes,
      components,
      onLaneClick,
      onLaneScroll,
      onCardClick,
      onCardAdd,
      onBeforeCardDelete,
      onCardDelete,
      onLaneDelete,
      onLaneUpdate,
      onCardUpdate,
      onCardMoveAcrossLanes,
      ...otherProps
    } = this.props
    const allClassNames = classNames('react-trello-lane', this.props.className || '')
    const showFooter = collapsibleLanes && cards.length > 0
    return (
      <components.Section
        {...otherProps}
        key={id}
        onClick={() => onLaneClick && onLaneClick(id)}
        draggable={false}
        className={allClassNames}>
        {this.renderHeader({id, cards, ...otherProps})}
        {this.renderDragContainer(isDraggingOver)}
        {loading && <components.Loader />}
        {showFooter && <components.LaneFooter onClick={this.toggleLaneCollapsed} collapsed={collapsed} />}
      </components.Section>
    )
  }
}

Lane.propTypes = {
  actions: PropTypes.object,
  id: PropTypes.string.isRequired,
  boardId: PropTypes.string,
  title: PropTypes.node,
  index: PropTypes.number,
  laneSortFunction: PropTypes.func,
  style: PropTypes.object,
  cardStyle: PropTypes.object,
  tagStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  cards: PropTypes.array,
  label: PropTypes.string,
  currentPage: PropTypes.number,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  droppable: PropTypes.bool,
  onCardMoveAcrossLanes: PropTypes.func,
  onCardClick: PropTypes.func,
  onBeforeCardDelete: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  onCardUpdate: PropTypes.func,
  onLaneDelete: PropTypes.func,
  onLaneUpdate: PropTypes.func,
  onLaneClick: PropTypes.func,
  onLaneScroll: PropTypes.func,
  editable: PropTypes.bool,
  laneDraggable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string,
  cardDropClass: PropTypes.string,
  canAddLanes: PropTypes.bool,
  t: PropTypes.func.isRequired
}

Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: false,
  onLaneUpdate: () => {},
  onCardAdd: () => {},
  onCardUpdate: () => {}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(laneActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Lane)
