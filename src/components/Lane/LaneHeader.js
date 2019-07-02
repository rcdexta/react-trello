import React from 'react'
import PropTypes from 'prop-types'
import EditableLabel from 'components/widgets/EditableLabel'

import {Title, LaneHeader, RightContent } from 'styles/Base'
import LaneMenu from './LaneHeader/LaneMenu'

const LaneHeaderComponent = ({
  updateTitle, canAddLanes, onDelete, onDoubleClick, editLaneTitle, label, title, titleStyle, labelStyle, t
}) => {

  return (
    <LaneHeader onDoubleClick={onDoubleClick}>
      <Title style={titleStyle}>
      {editLaneTitle ?
        <EditableLabel value={title} border inline placeholder={t('placeholder.title')} onChange={updateTitle} /> :
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
  editLaneTitle: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  onDelete: PropTypes.func,
  onDoubleClick: PropTypes.func,
  editLaneTitle: PropTypes.bool,
  t: PropTypes.func.isRequired
}

LaneHeaderComponent.defaultProps = {
  updateTitle: () => {},
  editLaneTitle: false,
  canAddLanes: false
}

export default LaneHeaderComponent;
