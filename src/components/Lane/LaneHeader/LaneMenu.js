import React from 'react'
import PropTypes from 'prop-types'

import {
  PopoverWrapper,
  Popover,
  PopoverContainer,
  PopoverContent,
  PopoverTrigger
} from 'react-popopo'

import {
  CustomPopoverContent
} from 'rt/styles/Base'

import {
  LaneMenuTitle,
  LaneMenuHeader,
  LaneMenuContent,
  DeleteWrapper,
  LaneMenuItem,
  GenDelButton,
  MenuButton,
} from 'rt/styles/Elements'

const LaneMenu = ({t, onDelete}) => {
  return (
    <Popover className="menu" position="bottom" PopoverContent={CustomPopoverContent} trigger={<MenuButton>⋮</MenuButton>}>
      <LaneMenuHeader>
        <LaneMenuTitle>{t('Lane actions')}</LaneMenuTitle>
        <DeleteWrapper>
          <GenDelButton>&#10006;</GenDelButton>
        </DeleteWrapper>
      </LaneMenuHeader>
      <LaneMenuContent>
        <LaneMenuItem onClick={onDelete}>{t('Delete lane')}</LaneMenuItem>
      </LaneMenuContent>
    </Popover>
  )
}

export default LaneMenu;
