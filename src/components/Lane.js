import React, {Component} from 'react'
import Loader from './Loader'
import PropTypes from 'prop-types'
import Card from './Card'
import {Section, Header, Title, RightContent, DraggableList, Placeholder} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {DropTarget} from 'react-dnd'
import update from 'immutability-helper'
import {DragType} from '../helpers/DragType'
import {findDOMNode} from 'react-dom'

const laneActions = require('../actions/LaneActions')

const CARD_HEIGHT = 66
const CARD_MARGIN = 10
const OFFSET_HEIGHT = 15

class Lane extends Component {
  state = {
    loading: false,
    currentPage: this.props.currentPage,
    cards: this.props.cards,
    placeholderIndex: -1
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
          node.scrollTop = node.scrollTop - 50
        } else {
          this.props.actions.paginateLane({laneId: this.props.id, newCards: moreCards, nextPage: nextPage})
        }
        this.setState({loading: false})
      })
    }
  }

  sortCards (cards, sortFunction) {
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

  moveCard = (dragIndex, hoverIndex) => {
    const {cards} = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
  }

  sameCards = (cardsA, cardsB) => {
    return (
      cardsA.length === cardsB.length &&
      cardsA.every(
        (el, ix) =>
          el.id === cardsB[ix].id &&
          el.title === cardsB[ix].title &&
          el.label === cardsB[ix].label &&
          el.description === cardsB[ix].description
      )
    )
  }

  componentWillReceiveProps (nextProps) {
    if (!this.sameCards(this.props.cards, nextProps.cards)) {
      this.setState({cards: nextProps.cards, currentPage: nextProps.currentPage})
    }
    if (!nextProps.isOver) {
      this.setState({placeholderIndex: -1})
    }
  }

  moveCardAcrossLanes = (fromLaneId, toLaneId, cardId) => {
    this.props.actions.moveCardAcrossLanes({fromLaneId: fromLaneId, toLaneId: toLaneId, cardId: cardId})
  }

  removeCard = (laneId, cardId) => {
    this.props.actions.removeCard({laneId: laneId, cardId: cardId})
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !this.sameCards(this.props.cards, nextProps.cards) || nextState !== this.state
  }

  handleCardClick = (e, card) => {
    const {onCardClick} = this.props
    onCardClick && onCardClick(card.id, card.metadata, card.laneId)
    e.stopPropagation()
  }

  renderDragContainer = () => {
    const {connectDropTarget, laneSortFunction} = this.props

    const cardList = this.sortCards(this.state.cards, laneSortFunction).map((card, idx) =>
      <Card
        key={card.id}
        index={idx}
        draggable={this.props.draggable}
        customCardLayout={this.props.customCardLayout}
        customCard={this.props.children}
        handleDragStart={this.props.handleDragStart}
        handleDragEnd={this.props.handleDragEnd}
        tagStyle={this.props.tagStyle}
        cardStyle={this.props.cardStyle}
        moveCard={this.moveCard}
        moveCardAcrossLanes={this.moveCardAcrossLanes}
        removeCard={this.removeCard}
        onClick={e => this.handleCardClick(e, card)}
        {...card}
      />
    )

    if (this.state.placeholderIndex > -1) {
      cardList.splice(this.state.placeholderIndex, 0, <Placeholder key='placeholder' />)
    }

    return connectDropTarget(
      <div>
        <DraggableList>
          {cardList}
        </DraggableList>
      </div>
    )
  }

  renderHeader = () => {
    if (this.props.customLaneHeader) {
      const customLaneElement = React.cloneElement(this.props.customLaneHeader, {...this.props})
      return (
        <span>
          {customLaneElement}
        </span>
      )
    } else {
      const {title, label, titleStyle, labelStyle} = this.props
      return (
        <Header>
          <Title style={titleStyle}>
            {title}
          </Title>
          {label &&
            <RightContent>
              <span style={labelStyle}>
                {label}
              </span>
            </RightContent>}
        </Header>
      )
    }
  }

  render () {
    const {loading} = this.state
    const {id, onLaneClick, ...otherProps} = this.props
    return (
      <Section {...otherProps} key={id} innerRef={this.laneDidMount} onClick={() => onLaneClick && onLaneClick(id)}>
        {this.renderHeader()}
        {this.renderDragContainer()}
        {loading && <Loader />}
      </Section>
    )
  }
}

Lane.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node,
  laneSortFunction: PropTypes.func,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  cards: PropTypes.array,
  label: PropTypes.string,
  onLaneScroll: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func
}

Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined
}

const cardTarget = {
  drop (props, monitor, component) {
    const {id} = props
    const draggedObj = monitor.getItem()
    if (id === draggedObj.laneId) {
      props.actions.updateCards({laneId: id, cards: component.state.cards})
    }
    component.setState({placeholderIndex: -1})
    return {
      laneId: id
    }
  },

  hover (props, monitor, component) {
    const {id} = props
    const draggedObj = monitor.getItem()
    if (id === draggedObj.laneId) {
      return
    }

    const placeholderIndex = getPlaceholderIndex(monitor.getClientOffset().y, findDOMNode(component).scrollTop)
    component.setState({placeholderIndex})

    return monitor.isOver()

    function getPlaceholderIndex (y, scrollY) {
      // shift placeholder if y position more than card height / 2
      const yPos = y - OFFSET_HEIGHT + scrollY
      let placeholderIndex
      if (yPos < CARD_HEIGHT / 2) {
        placeholderIndex = -1 // place at the start
      } else {
        placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN))
      }
      return placeholderIndex
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(laneActions, dispatch)})

export default connect(null, mapDispatchToProps)(DropTarget(DragType.CARD, cardTarget, collect)(Lane))
