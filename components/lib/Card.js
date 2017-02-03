import React, {Component} from 'react'
import {CardWrapper, CardHeader, CardTitle, CardRightContent, Detail} from '../styles/Base'

export default class Card extends Component {
  render() {
    const {title, description, rightHeader, ...otherProps} = this.props
      return <CardWrapper key={title} {...otherProps}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardRightContent>{rightHeader}</CardRightContent>
        </CardHeader>
        <Detail>{description}</Detail>
      </CardWrapper>
  }
}

Card.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  rightHeader: React.PropTypes.string,
  onClick: React.PropTypes.func,
  id: React.PropTypes.string
}
