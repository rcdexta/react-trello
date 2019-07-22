import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LaneTitle, NewLaneButtons, Section } from 'rt/styles/Base'
import { AddButton, CancelButton } from 'rt/styles/Elements'
import NewLaneTitleEditor from 'rt/widgets/NewLaneTitleEditor'
import ClickOutside from 'react-click-outside'

class NewLane extends Component {
  handleSubmit = () => {
    this.props.onAdd({ title: this.getValue() })
  }

  getValue = () => this.refInput.getValue()

  onClickOutside = (a,b,c) => {
    if (this.getValue().length > 0) {
      this.handleSubmit()
    } else {
      this.props.onCancel()
    }
  }

  render() {
    const { onCancel, t } = this.props
    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <Section>
          <LaneTitle>
            <NewLaneTitleEditor
              ref={ref => (this.refInput = ref)}
              placeholder={t('placeholder.title')}
              onCancel={this.props.onCancel}
              onSave={this.handleSubmit}
              resize='vertical'
              border
              autoFocus
            />
          </LaneTitle>
          <NewLaneButtons>
             <AddButton onClick={this.handleSubmit}>{t('button.Add lane')}</AddButton>
            <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
          </NewLaneButtons>
        </Section>
      </ClickOutside>
    )
  }
}

NewLane.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

NewLane.defaultProps = {}

export default NewLane
