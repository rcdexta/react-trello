import React from 'react'

import {LaneFooter} from 'rt/styles/Base'

import {
  CollapseBtn,
  ExpandBtn,
} from 'rt/styles/Elements'

export default ({onClick, collapsed}) => <LaneFooter onClick={onClick}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</LaneFooter>
