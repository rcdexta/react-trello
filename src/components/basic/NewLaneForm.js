import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {LaneTitle, NewLaneButtons, Section} from './styles/Base'
import {AddButton, CancelButton} from './styles/Elements'
import EditableLabel from './widgets/EditableLabel'

class NewLaneForm extends Component {
  updateField = (field, value) => {
    this.setState({[field]: value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const {onCancel, t} = this.props
    return (
        <Section>
          <LaneTitle>
            <EditableLabel placeholder={t('placeholder.title')} onChange={val => this.updateField('title', val)} autoFocus/>
          </LaneTitle>
          <NewLaneButtons>
            <AddButton onClick={this.handleAdd}>{t('button.Add lane')}</AddButton>
            <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
          </NewLaneButtons>
        </Section>
    )
  }
}

NewLaneForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
NewLaneForm.defaultProps = {}

export default NewLaneForm
