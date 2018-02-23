import React from 'react'
import PropTypes from 'prop-types'

class EditableLabel extends React.Component {
  state = {text: ''}

  getText = el => {
    return el.innerText
  }

  onTextChange = ev => {
    const text = this.getText(ev.target)
    this.setState({text: text})
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.refDiv.focus()
    }
  }

  onBlur = () => {
    this.props.onChange(this.state.text)
  }

  onPaste = ev => {
    ev.preventDefault()
    const text = ev.clipboardData.getData('text')
    document.execCommand('insertText', false, text)
  }

  getClassName = () => {
    const placeholder = this.state.text === '' ? 'comPlainTextContentEditable--has-placeholder' : ''
    return `comPlainTextContentEditable ${placeholder}`
  }

  render() {
    return (
      <div
        ref={ref => (this.refDiv = ref)}
        contentEditable="true"
        className={this.getClassName()}
        onPaste={this.onPaste}
        onBlur={this.onBlur}
        onInput={this.onTextChange}
        placeholder={this.props.placeholder}
      />
    )
  }
}

EditableLabel.defaultProps = {
  onChange: () => {},
  placeholder: '',
  autoFocus: false
}
EditableLabel.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool
}

export default EditableLabel
