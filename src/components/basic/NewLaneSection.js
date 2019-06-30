import React from 'react'
import {NewLaneSection} from './styles/Base'
import {AddLaneLink} from './styles/Elements'

export default ({t, onClick}) => (
  <NewLaneSection>
    <AddLaneLink t={t} onClick={onClick}>{t('Add another lane')}</AddLaneLink>
  </NewLaneSection>
)
