import React, {Component} from 'react'

export default class Card extends Component {
  render() {
    const {title, description, rightHeader} = this.props
    return <article className='card'>
      <header>
        <span className='title'>{title}</span>
        <span className='rightContent'>{rightHeader}</span>
      </header>
      <div className='detail'>{description}</div>
    </article>
  }
}

Card.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
}
