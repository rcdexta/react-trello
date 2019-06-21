import React, {Component} from 'react'
import { AddCardLink } from '../styles/Base'
import PropTypes from 'prop-types'

const AddCardLinkComponent = ({t, onClick}) => <AddCardLink onClick={onClick}>{t('Click to add card')}</AddCardLink>

AddCardLinkComponent.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AddCardLinkComponent
