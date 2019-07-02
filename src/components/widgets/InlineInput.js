import React from 'react'
import PropTypes from 'prop-types'
import {InlineInput} from 'styles/Base'

class InlineInputController extends React.Component {
	onFocus = (e) => e.target.select()

	// This is the way to select all text if mouse clicked
	onMouseDown = (e) => {
		if (document.activeElement != e.target) {
			e.preventDefault()
			this.refInput.focus()
		}
	}

	onBlur = () => {
		this.updateValue()
	}

	onKeyDown = (e) => {
		if(e.keyCode == 13) {
			this.refInput.blur()
			e.preventDefault()
		}
		if(e.keyCode == 27) {
			this.refInput.blur()
			e.preventDefault()
		}
	}

	getValue = () => this.refInput.value

	updateValue = () => {
		if (this.getValue() != this.props.value) {
			this.props.onChange(this.getValue())
		}
	}

	render() {
		const {autoFocus, value, placeholder} = this.props

		return <InlineInput
			ref={ref => (this.refInput = ref)}
			onMouseDown={this.onMouseDown}
			onFocus={this.onFocus}
			onBlur={this.onBlur}
			onKeyDown={this.onKeyDown}
			placeholder={value.length == 0 ? false : placeholder}
			defaultValue={value}
		/>
}
	}

	InlineInputController.defaultProps = {
		onChange: () => {},
			placeholder: '',
		value: '',
	}

	InlineInputController.propTypes = {
		onChange: PropTypes.func,
		placeholder: PropTypes.string,
		value: PropTypes.string
	}

	export default InlineInputController
