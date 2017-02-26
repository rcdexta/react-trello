import React, {Component} from 'react'
import {CardWrapper, CardHeader, CardTitle, CardRightContent, Detail} from '../styles/Base'

export default class Card extends Component {
  render() {
    const {id, title, description, label, ...otherProps} = this.props
      return <CardWrapper key={id} {...otherProps}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardRightContent>{label}</CardRightContent>
        </CardHeader>
        <Detail>{description}</Detail>
      </CardWrapper>
  }
}

Card.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  metadata: React.PropTypes.object
}
