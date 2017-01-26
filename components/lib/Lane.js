import React, {Component} from 'react'

export default class Lane extends Component {
  render() {
    const {title, rightHeader} = this.props
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
  title: React.PropTypes.string.isRequired,
  rightHeader: React.PropTypes.string
}
