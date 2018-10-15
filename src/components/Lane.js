import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import isEqual from 'lodash/isEqual'
import Container from '../dnd/Container'
import Draggable from '../dnd/Draggable'
import uuidv1 from 'uuid/v1'

import Loader from './Loader'
import Card from './Card'
import NewCard from './NewCard'
import {AddCardLink, LaneFooter, LaneHeader, RightContent, ScrollableLane, Section, Title} from '../styles/Base'

import * as laneActions from '../actions/LaneActions'
import {CollapseBtn, ExpandBtn} from '../styles/Elements'

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
    const elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight
    const {onLaneScroll} = this.props
    if (elemScrolPosition <= 0 && onLaneScroll && !this.state.loading) {
      const {currentPage} = this.state
      this.setState({loading: true})
      const nextPage = currentPage + 1
      onLaneScroll(nextPage, this.props.id).then(moreCards => {
        if (!moreCards || moreCards.length === 0) {
          // if no cards present, stop retrying until user action
          node.scrollTop = node.scrollTop - 100
        } else {
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
    return cards.concat().sort(function(card1, card2) {
      return sortFunction(card1, card2)
    })
  }

  laneDidMount = node => {
    if (node) {
      node.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.cards, nextProps.cards)) {
      this.setState({
        currentPage: nextProps.currentPage
      })
    }
  }

  removeCard = (laneId, cardId) => {
    this.props.actions.removeCard({laneId: laneId, cardId: cardId})
  }

  handleCardClick = (e, card) => {
    const {onCardClick} = this.props
    onCardClick && onCardClick(card.id, card.metadata, card.laneId)
    e.stopPropagation()
    e.preventDefault()
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

  renderAddCardLink = () => {
    const {addCardLink} = this.props
    if (addCardLink) {
      return <span onClick={this.showEditableCard}>{addCardLink}</span>
    } else {
      return <AddCardLink onClick={this.showEditableCard}>Add Card</AddCardLink>
    }
  }

  renderNewCard = () => {
    const {newCardTemplate, id} = this.props
    if (newCardTemplate) {
      const newCardWithProps = React.cloneElement(newCardTemplate, {
        onCancel: this.hideEditableCard,
        onAdd: this.addNewCard,
        laneId: id
      })
      return <span>{newCardWithProps}</span>
    } else {
      return <NewCard onCancel={this.hideEditableCard} onAdd={this.addNewCard} />
    }
  }

  onDragStart = ({payload}) => {
    const {handleDragStart} = this.props
    handleDragStart && handleDragStart(payload.id, payload.laneId)
  }

  shouldAcceptDrop = sourceContainerOptions => {
    return this.props.droppable && sourceContainerOptions.groupName === 'TrelloLane'
  }

  onDragEnd = (laneId, result) => {
    const {handleDragEnd} = this.props
    const {addedIndex, payload} = result
    if (addedIndex != null) {
      this.props.actions.moveCardAcrossLanes({
        fromLaneId: payload.laneId,
        toLaneId: laneId,
        cardId: payload.id,
        index: addedIndex
      })
      handleDragEnd && handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, payload)
    }
  }

  renderDragContainer = isDraggingOver => {
    const {
      laneSortFunction,
      editable,
      hideCardDeleteIcon,
      tagStyle,
      cardStyle,
      draggable,
      cardDraggable,
      cards,
      cardDragClass,
      id
    } = this.props
    const {addCardMode, collapsed} = this.state

    const showableCards = collapsed ? [] : cards

    const cardList = this.sortCards(showableCards, laneSortFunction).map((card, idx) => {
      const cardToRender = (
        <Card
          key={card.id}
          index={idx}
          customCardLayout={this.props.customCardLayout}
          customCard={this.props.children}
          tagStyle={tagStyle}
          cardStyle={cardStyle}
          removeCard={this.removeCard}
          onClick={e => this.handleCardClick(e, card)}
          onDelete={this.props.onCardDelete}
          editable={editable}
          hideCardDeleteIcon={hideCardDeleteIcon}
          {...card}
        />
      )
      return draggable && cardDraggable ? (
        <Draggable key={card.id}>{cardToRender}</Draggable>
      ) : (
        <span key={card.id}>{cardToRender}</span>
      )
    })

    return (
      <ScrollableLane innerRef={this.laneDidMount} isDraggingOver={isDraggingOver}>
        <Container
          orientation="vertical"
          groupName="TrelloLane"
          dragClass={cardDragClass}
          onDragStart={this.onDragStart}
          onDrop={e => this.onDragEnd(id, e)}
          onDragEnter={() => this.setState({isDraggingOver: true})}
          onDragLeave={() => this.setState({isDraggingOver: false})}
          shouldAcceptDrop={this.shouldAcceptDrop}
          getChildPayload={index => this.props.getCardDetails(id, index)}>
          {cardList}
        </Container>
        {editable && !addCardMode && this.renderAddCardLink()}
        {addCardMode && this.renderNewCard()}
      </ScrollableLane>
    )
  }

  renderHeader = () => {
    const {customLaneHeader} = this.props
    if (customLaneHeader) {
      const customLaneElement = React.cloneElement(customLaneHeader, {...this.props})
      return <span>{customLaneElement}</span>
    } else {
      const {title, label, titleStyle, labelStyle} = this.props
      return (
        <LaneHeader onDoubleClick={this.toggleLaneCollapsed}>
          <Title style={titleStyle}>{title}</Title>
          {label && (
            <RightContent>
              <span style={labelStyle}>{label}</span>
            </RightContent>
          )}
        </LaneHeader>
      )
    }
  }

  renderFooter = () => {
    const {collapsibleLanes, cards} = this.props
    const {collapsed} = this.state
    if (collapsibleLanes && cards.length > 0) {
      return <LaneFooter onClick={this.toggleLaneCollapsed}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</LaneFooter>
    }
  }

  toggleLaneCollapsed = () => {
    this.props.collapsibleLanes && this.setState(state => ({collapsed: !state.collapsed}))
  }

  render() {
    const {loading, isDraggingOver} = this.state
    const {id, onLaneClick, ...otherProps} = this.props
    return (
      <Section {...otherProps} key={id} onClick={() => onLaneClick && onLaneClick(id)} draggable={false}>
        {this.renderHeader()}
        {this.renderDragContainer(isDraggingOver)}
        {loading && <Loader />}
        {this.renderFooter()}
      </Section>
    )
  }
}

Lane.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  title: PropTypes.node,
  index: PropTypes.number,
  laneSortFunction: PropTypes.func,
  style: PropTypes.object,
  cardStyle: PropTypes.object,
  tagStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  customLaneHeader: PropTypes.element,
  customCardLayout: PropTypes.bool,
  cards: PropTypes.array,
  label: PropTypes.string,
  currentPage: PropTypes.number,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  droppable: PropTypes.bool,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  onLaneClick: PropTypes.func,
  newCardTemplate: PropTypes.node,
  addCardLink: PropTypes.node,
  editable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string
}

Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: false,
  onCardAdd: () => {}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(laneActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Lane)
