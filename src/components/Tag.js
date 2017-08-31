import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TagSpan} from '../styles/Base'

export default class Tag extends Component {
  render () {
    const {title, color, bgcolor, tagStyle, ...otherProps} = this.props
    const style = {color: color || 'white', backgroundColor: bgcolor || 'orange', ...tagStyle}
    return <TagSpan style={style} {...otherProps}>{title}</TagSpan>
  }
}

Tag.PropTypes = {
  title: PropTypes.array.isRequired,
  color: PropTypes.string,
  bgcolor: PropTypes.string
}
