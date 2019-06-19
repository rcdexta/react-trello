import React from 'react'
import PropTypes from 'prop-types'
import {InlineInput} from '../../styles/Base'
import autosize from 'autosize';

class InlintTextareaController extends React.Component {
  onBlur = () => {
    this.saveValue()
  }

  onKeyDown = (e) => {
    if(e.keyCode == 13) {
      this.refInput.blur()
      e.preventDefault()
    }
    if(e.keyCode == 27) {
      this.cancel()
      e.preventDefault()
    }

    if(e.keyCode == 9) {
      if (this.getValue().length == 0) {
        this.cancel()
      } else {
        this.props.onSave()
      }
      e.preventDefault()
    }
  }

  cancel = () => {
    this.setValue('')
    this.props.onCancel()
    this.refInput.blur()
  }

  getValue = () => this.refInput.value
  setValue = (value) => this.refInput.value = value

  saveValue = () => {
    if (this.getValue() != this.props.value) {
      this.props.onSave(this.getValue())
    }
  }

  focus = () => this.refInput.focus()

  setRef = (ref) => {
    this.refInput = ref
    if (this.props.resize != 'none') {
      autosize(this.refInput)
    }
  }

  render() {
    const {autoFocus, resize, border, autoResize, value, placeholder} = this.props

    return <InlineInput
      style={{resize: resize}}
      ref={this.setRef}
      border={border}
      onMouseDown={this.onMouseDown}
      onFocus={this.onFocus}
      onKeyDown={this.onKeyDown}
      onBlur={this.onBlur}
      placeholder={value.length == 0 ? undefined : placeholder}
      defaultValue={value}
      rows={3}
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
