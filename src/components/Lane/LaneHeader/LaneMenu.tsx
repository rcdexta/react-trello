import React, {FC, PropsWithChildren} from 'react'
import {Popover} from 'react-popopo'

import {CustomPopoverContent, CustomPopoverContainer} from 'rt/styles/Base'
import {
  LaneMenuTitle,
  LaneMenuHeader,
  LaneMenuContent,
  DeleteWrapper,
  LaneMenuItem,
  GenDelButton,
  MenuButton
} from 'rt/styles/Elements'
import createTranslate from 'rt/helpers/createTranslate'

interface LaneMenuProps {
  t: typeof createTranslate
  onDelete: () => void
}
export const LaneMenu: FC<PropsWithChildren<LaneMenuProps>> = ({t, onDelete}) => (
  <Popover
    position="bottom"
    PopoverContainer={CustomPopoverContainer}
    PopoverContent={CustomPopoverContent}
    trigger={<MenuButton>⋮</MenuButton>}>
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
