import React, {FC, HTMLAttributes, PropsWithChildren} from 'react'

import {LaneFooter as _LaneFooter} from 'rt/styles/Base'
import {CollapseBtn, ExpandBtn} from 'rt/styles/Elements'

interface LaneFooterProps extends HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}
export const LaneFooter: FC<PropsWithChildren<LaneFooterProps>> = ({onClick, collapsed}) => (
  <_LaneFooter onClick={onClick}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</_LaneFooter>
)
