import React from 'react'
import {NewLaneSection} from 'rt/styles/Base'
import {AddLaneLink} from 'rt/styles/Elements'

export default ({t, onClick}) => (
  <NewLaneSection>
    <AddLaneLink t={t} onClick={onClick}>{t('Add another lane')}</AddLaneLink>
  </NewLaneSection>
)
