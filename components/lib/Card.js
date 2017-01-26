import React, {Component} from 'react'

export default class Card extends Component {
  render() {
    const {title, description, rightHeader, ...otherProps} = this.props
    return <article className='card' key={title} {...otherProps}>
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
  description: React.PropTypes.string,
  rightHeader: React.PropTypes.string,
  onClick: React.PropTypes.func,
  id: React.PropTypes.string
}
