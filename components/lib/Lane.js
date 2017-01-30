import React, {Component} from 'react'
import Loader from './Loader'

export default class Lane extends Component {

  state = {cards: this.props.cards, loading: false}

  handleScroll = (evt) => {
    const node = evt.target
    const elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight
    const {onScroll} = this.props
    if (elemScrolPosition <= 0 && onScroll) {
      const {cards} = this.state
      this.setState({loading: true})
      onScroll(this.lastCardId()).then((moreCards) => {
        this.setState({cards: [...cards, ...moreCards], loading: false})
      })
    }
  }

  laneDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', this.handleScroll);
    }
  };

  lastCardId = () => {
    const {cards} = this.state
    return cards[cards.length - 1].props.id
  }

  render() {
    const {loading} = this.state
    const {title, rightHeader, cards, ...otherProps} = this.props
    return <section className='list' {...otherProps} ref={this.laneDidMount}>
      <header>
        <span className='title'>{title}</span>
        <span className='rightContent'>{rightHeader}</span>
      </header>
      <div className="drag-inner-list">
        {this.state.cards}
      </div>
      {loading && <Loader/>}

    </section>
  }
}

Lane.propTypes = {
  title: React.PropTypes.string.isRequired,
  cards: React.PropTypes.array,
  rightHeader: React.PropTypes.string,
  onScroll: React.PropTypes.func
}
