import React from 'react'
import PropTypes from 'prop-types'
import InlineInput from '../widgets/InlineInput'

// TODO: Move styles to styles/LaneHeader
import {Title, LaneHeader, RightContent } from '../../styles/Base'

import LaneMenu from './LaneHeader/LaneMenu'

const LaneHeaderComponent = ({canAddLanes, onDelete, onDoubleClick, inlineEditTitle, label, title, titleStyle, labelStyle, t}) => {
  return (
    <LaneHeader onDoubleClick={onDoubleClick}>
      <Title style={{...titleStyle, margin: '-5px'}}>
        {inlineEditTitle ?
        <InlineInput value={title} border placeholder={t('placeholder.title')} onSave={this.updateTitle} /> :
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
  // ['id','label','title','titleStyle','labelStyle','t','inlineEditTitle','canAddLanes']
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
