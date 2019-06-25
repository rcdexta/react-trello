import React from 'react'
import {LaneSection} from 'styles/Base'
import {NewLaneButton} from 'styles/Elements'

export default ({t, onClick}) => (
  <LaneSection style={{width: 200}}>
    <NewLaneButton t={t} onClick={onClick}>{t('Add lane')}</NewLaneButton>
  </LaneSection>
  )
