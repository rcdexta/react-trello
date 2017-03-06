import React, {Component} from 'react'
import Loader from './Loader'
import Card from './Card'
import {Section, Header, Title, RightContent, DraggableList} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const laneActions = require('../actions/lane_actions')

class Lane extends Component {

  state = {loading: false, currentPage: 1}

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

  componentWillReceiveProps (nextProps) {
    this.setState({cards: nextProps.cards})
  }

  laneDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', this.handleScroll)
    }
  };

  sortedCards (cards, sortFunction) {
    if (!cards) return []
    if (!sortFunction) return cards
    return cards.sort(function (card1, card2) {
      return sortFunction(card1, card2)
    })
  }

  render () {
    const {loading} = this.state
    const {id, title, label, cards, laneSortFunction, onCardClick, ...otherProps} = this.props
    return <Section {...otherProps} key={id} innerRef={this.laneDidMount}>
      <Header>
        <Title>{title}</Title>
        <RightContent>{label}</RightContent>
      </Header>
      <DraggableList className='drag-inner-list' data-id={id}>
        {this.sortedCards(cards, laneSortFunction).map((card) => (
          <Card id={card.id}
            key={card.id}
            title={card.title}
            label={card.label}
            description={card.description}
            onClick={() => onCardClick(card.id, card.metadata)} />
        ))
        }
      </DraggableList>
      {loading && <Loader />}
    </Section>
  }
}

Lane.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  laneSortFunction: React.PropTypes.func,
  cards: React.PropTypes.array,
  label: React.PropTypes.string,
  onLaneScroll: React.PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(laneActions, dispatch)})

export default connect(null, mapDispatchToProps)(Lane)
