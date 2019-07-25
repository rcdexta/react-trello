import React from 'react'
import PropTypes from 'prop-types'
import InlineInput from 'rt/widgets/InlineInput'
import {Title, LaneHeader, RightContent } from 'rt/styles/Base'
import LaneMenu from './LaneHeader/LaneMenu'

const LaneHeaderComponent = ({
  updateTitle, canAddLanes, onDelete, onDoubleClick, editLaneTitle, label, title, titleStyle, labelStyle, t, laneDraggable
}) => {

  return (
    <LaneHeader onDoubleClick={onDoubleClick} editLaneTitle={editLaneTitle}>
      <Title draggable={laneDraggable} style={titleStyle}>
      {editLaneTitle ?
        <InlineInput value={title} border placeholder={t('placeholder.title')} resize='vertical' onSave={updateTitle} /> :
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
  laneDraggable: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  onDelete: PropTypes.func,
  onDoubleClick: PropTypes.func,
  t: PropTypes.func.isRequired
}

LaneHeaderComponent.defaultProps = {
  updateTitle: () => {},
  editLaneTitle: false,
  canAddLanes: false
}

export default LaneHeaderComponent;
