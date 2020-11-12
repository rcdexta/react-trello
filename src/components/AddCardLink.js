import React from 'react'
import {AddCardLink} from 'rt/styles/Base'

export default ({onClick, t, laneId}) => <AddCardLink onClick={onClick}>{t('Click to add card')}</AddCardLink>
