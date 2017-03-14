import React, {Component, PropTypes} from 'react'
import Loader from './Loader'
import Card from './Card'
import {Section, Header, Title, RightContent, DraggableList} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {DropTarget} from 'react-dnd'
import update from 'react/lib/update'
import {DragType} from '../helpers/DragType'

const laneActions = require('../actions/LaneActions')

class Lane extends Component {

  state = {loading: false, currentPage: 1, cards: this.props.cards}

  handleScroll = (evt) => {
    const node = evt.target
    const elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight
    const {onLaneScroll} = this.props
    if (elemScrolPosition <= 0 && onLaneScroll && !this.state.loading) {
      const {currentPage} = this.state
      this.setState({loading: true})
      const nextPage = currentPage + 1
      onLaneScroll(nextPage, this.props.id)
        .then((moreCards) => {
          this.setState({loading: false, currentPage: nextPage})
          this.props.actions.updateLane({laneId: this.props.id, newCards: moreCards})
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

  laneDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', this.handleScroll)
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const {cards} = this.state
    const dragCard = cards[dragIndex]

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))
  }

  sameCards = (cardsA, cardsB) => {
    return cardsA.length === cardsB.length && cardsA.every((el, ix) => el.id === cardsB[ix].id)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.sameCards(this.props.cards, nextProps.cards)) {
      this.setState({cards: nextProps.cards})
    }
  }

  removeCard = (listId, cardId) => {
    this.props.actions.removeCard({laneId: listId, cardId: cardId})
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !this.sameCards(this.props.cards, nextProps.cards) || nextState !== this.state
  }

  renderDragContainer = () => {
    const {connectDropTarget, laneSortFunction, onCardClick, id} = this.props
    return connectDropTarget(
      <div>
        <DraggableList>
          {
            this.sortCards(this.state.cards, laneSortFunction).map((card, idx) => (
              <Card id={card.id}
                key={card.id}
                index={idx}
                listId={id}
                draggable={this.props.draggable}
                handleDragStart={this.props.handleDragStart}
                handleDragEnd={this.props.handleDragEnd}
                title={card.title}
                moveCard={this.moveCard}
                removeCard={this.removeCard}
                label={card.label}
                description={card.description}
                onClick={() => onCardClick && onCardClick(card.id, card.metadata)} />
            ))
          }
        </DraggableList>
      </div>
    )
  }

  render () {
    const {loading} = this.state
    const {id, title, label, ...otherProps} = this.props
    return <Section {...otherProps} key={id} innerRef={this.laneDidMount}>
      <Header>
        <Title>{title}</Title>
        <RightContent>{label}</RightContent>
      </Header>
      {this.renderDragContainer()}
      {loading && <Loader />}
    </Section>
  }
}

Lane.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  laneSortFunction: PropTypes.func,
  cards: PropTypes.array,
  label: PropTypes.string,
  onLaneScroll: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func
}

const cardTarget = {
  drop (props, monitor, component) {
    const {id} = props
    const draggedObj = monitor.getItem()
    if (id !== draggedObj.listId) {
      props.actions.addCard({laneId: id, card: draggedObj.card})
    } else {
      props.actions.updateCards({laneId: id, cards: component.state.cards})
    }
    return {
      listId: id
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(laneActions, dispatch)})

export default connect(null, mapDispatchToProps)(DropTarget(DragType.CARD, cardTarget, collect)(Lane))
