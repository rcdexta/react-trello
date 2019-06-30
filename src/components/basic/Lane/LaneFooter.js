import React from 'react'

import {LaneFooter} from 'components/basic/styles/Base'

import {
  CollapseBtn,
  ExpandBtn,
} from 'components/basic/styles/Elements'

export default ({onClick, collapsed}) => <LaneFooter onClick={onClick}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</LaneFooter>
