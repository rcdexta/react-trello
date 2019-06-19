import React from 'react'
import PropTypes from 'prop-types'
import {InlineInput} from '../../styles/Base'
import autosize from 'autosize';

class InlintTextareaController extends React.Component {
  onFocus = (e) => e.target.select()

  // This is the way to select all text if mouse clicked
  onMouseDown = (e) => {
    if (document.activeElement != e.target) {
      e.preventDefault()
      focus()
    }
  }

  onBlur = () => {
    this.saveValue()
  }

  onKeyDown = (e) => {
    if(e.keyCode == 13) {
      this.refInput.blur()
      e.preventDefault()
    }
    if(e.keyCode == 27) {
      this.setValue('')
      this.props.onCancel()
      this.refInput.blur()
      e.preventDefault()
    }

    if(e.keyCode == 9 && this.getValue().length == 0) {
      this.props.onCancel()
      this.refInput.blur()
      e.preventDefault()
    }
  }

  getValue = () => this.refInput.value
  setValue = (value) => this.refInput.value = value

  saveValue = () => {
    if (this.getValue() != this.props.value) {
      this.props.onSave(this.getValue())
    }
  }

  focus = () => this.refInput.focus()

  componentDidMount = () => {
    if (this.props.autoResize) {
      autosize(this.refInput)
    }
  }

  render() {
    const {autoFocus, resize, border, autoResize, value, placeholder} = this.props

    return <InlineInput
      style={{resize: resize}}
      ref={ref => (this.refInput = ref)}
      border={border}
      onMouseDown={this.onMouseDown}
      onFocus={this.onFocus}
      onKeyDown={this.onKeyDown}
      placeholder={value.length == 0 ? undefined : placeholder}
      defaultValue={value}
      rows={1}
      autoResize={autoResize}
      autoFocus={autoFocus}
    />
  }
}

InlintTextareaController.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  border: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoResize: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal']),
}

InlintTextareaController.defaultProps = {
  inputRef: () => {},
  onSave: () => {},
  onCancel: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  autoResize: false,
  resize: 'none'
}

export default InlintTextareaController
