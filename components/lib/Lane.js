import React, {Component} from 'react'

export default class Lane extends Component {
  render() {
    const {title, rightHeader, cards} = this.props
    return <section className='list'>
      <header>
        <span className='title'>{title}</span>
        <span className='rightContent'>{rightHeader}</span>
      </header>
      {this.props.children}
    </section>
  }
}

Lane.propTypes = {
  key: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  rightHeader: React.PropTypes.string,
  cards: React.PropTypes.array
}
