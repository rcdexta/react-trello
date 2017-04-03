import React, {Component, PropTypes} from 'react'
import {TagSpan} from '../styles/Base'

export default class Tag extends Component {

  render () {
    const {title, color, bgcolor} = this.props
    const style = {color: color || 'white', backgroundColor: bgcolor || 'orange'}
    return <TagSpan style={style}>{title}</TagSpan>
  }

}

Tag.PropTypes = {
  title: PropTypes.array.isRequired,
  color: PropTypes.string,
  bgcolor: PropTypes.string
}
