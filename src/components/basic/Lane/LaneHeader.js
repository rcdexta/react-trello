import React from 'react'
import PropTypes from 'prop-types'
import EditableLabel from 'components/basic/widgets/EditableLabel'

import {Title, LaneHeader, RightContent } from 'components/basic/styles/Base'
import LaneMenu from './LaneHeader/LaneMenu'

const LaneHeaderComponent = ({
  updateTitle, canAddLanes, onDelete, onDoubleClick, inlineEditTitle, label, title, titleStyle, labelStyle, t
}) => {

  return (
    <LaneHeader onDoubleClick={onDoubleClick}>
    <Title style={{...titleStyle, margin: '-5px'}}>
      {inlineEditTitle ?
      <EditableLabel value={title} border placeholder={t('placeholder.title')} onSave={updateTitle} /> :
      title
      }
    </Title>
    {label && (
      <RightContent>
        <span style={labelStyle}>{label}</span>
        </RightContent>
        )}
        {canAddLanes && <LaneMenu t={t} onDelete={onDelete}/>}
      </LaneHeader>
  )
}

LaneHeaderComponent.propTypes = {
  updateTitle: PropTypes.func,
  inlineEditTitle: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  onDelete: PropTypes.func,
  onDoubleClick: PropTypes.func,
  t: PropTypes.func.isRequired
}

LaneHeaderComponent.defaultProps = {
  updateTitle: () => {},
  inlineEditTitle: false,
  canAddLanes: false
}

export default LaneHeaderComponent;
