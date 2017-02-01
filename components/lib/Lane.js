import React, {Component} from 'react'
import Loader from './Loader'
import Card from './Card'

export default class Lane extends Component {

  state = {cards: this.props.cards, loading: false}

  componentWillReceiveProps(nextProps) {
    this.setState({cards: nextProps.cards})
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
    const {title, rightHeader} = this.props
    return <section className='lane'>
      <header>
        <span className='title'>{title}</span>
        <span className='rightContent'>{rightHeader}</span>
      </header>
      <div className="drag-inner-list">
        {this.state.cards.map((card) => (
          <Card key={card.key}
                title={card.title}
                description={card.description}/>
        ))
        }
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
