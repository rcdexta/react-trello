import React from 'react'
	import PropTypes from 'prop-types'
	import Popover from '@terebentina/react-popover'

	import {
	  LaneMenuTitle,
	  LaneMenuHeader,
	  LaneMenuContent,
	  DeleteWrapper,
	  LaneMenuItem,
	  GenDelButton,
	  MenuButton,
  } from 'styles/Elements'

	const LaneMenu = ({t, onDelete}) => {
	  return (
	    <Popover className="menu" position="bottom" trigger={<MenuButton>⋮</MenuButton>}>
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
