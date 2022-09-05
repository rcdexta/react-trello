import React, {CSSProperties, FC, HTMLAttributes, PropsWithChildren} from 'react'
import {InlineInput} from 'rt/widgets/InlineInput'
import {Title, LaneHeader as _LaneHeader, RightContent} from 'rt/styles/Base'
import {LaneMenu} from './LaneHeader/LaneMenu'
import createTranslate from 'rt/helpers/createTranslate'

export interface LaneHeaderProps extends HTMLAttributes<HTMLHeadElement> {
  updateTitle?: (title: string) => void
  canAddLanes?: boolean
  onDelete?: () => void
  editLaneTitle?: boolean
  label?: string
  titleStyle?: CSSProperties
  labelStyle?: CSSProperties
  laneDraggable?: boolean
  t: typeof createTranslate
}
export const LaneHeader: FC<PropsWithChildren<LaneHeaderProps>> = ({
  updateTitle = () => {},
  canAddLanes = false,
  onDelete,
  onDoubleClick,
  editLaneTitle,
  label,
  title,
  titleStyle,
  labelStyle,
  t,
  laneDraggable
}) => {
  return (
    <_LaneHeader onDoubleClick={onDoubleClick} editLaneTitle={editLaneTitle}>
      <Title draggable={laneDraggable} style={titleStyle}>
        {editLaneTitle ? (
          <InlineInput
            value={title}
            border
            placeholder={(t('placeholder.title') as unknown) as string}
            resize="vertical"
            onSave={updateTitle}
          />
        ) : (
          title
        )}
      </Title>
      {label && (
        <RightContent>
          <span style={labelStyle}>{label}</span>
        </RightContent>
      )}
      {canAddLanes && <LaneMenu t={t} onDelete={onDelete} />}
    </_LaneHeader>
  )
}
