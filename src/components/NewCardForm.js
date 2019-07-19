import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  CardForm,
  CardHeader,
  CardRightContent,
  CardTitle,
  CardWrapper,
  Detail
} from 'rt/styles/Base'
import {AddButton, CancelButton} from 'rt/styles/Elements'
import EditableLabel from 'rt/widgets/EditableLabel'

class NewCardForm extends Component {
  updateField = (field, value) => {
    this.setState({[field]: value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const {onCancel, t} = this.props
    return (
      <CardForm>
        <CardWrapper>
          <CardHeader>
            <CardTitle>
              <EditableLabel placeholder={t('placeholder.title')} onChange={val => this.updateField('title', val)} autoFocus />
            </CardTitle>
            <CardRightContent>
              <EditableLabel placeholder={t('placeholder.label')} onChange={val => this.updateField('label', val)} />
            </CardRightContent>
          </CardHeader>
          <Detail>
            <EditableLabel placeholder={t('placeholder.description')} onChange={val => this.updateField('description', val)} />
          </Detail>
        </CardWrapper>
        <AddButton onClick={this.handleAdd}>{t('button.Add card')}</AddButton>
        <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
      </CardForm>
    )
  }
}

NewCardForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

NewCardForm.defaultProps = {
}

export default NewCardForm
