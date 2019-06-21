import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {MovableCardWrapper} from '../styles/Base'
import classNames from 'classnames'

const CardWrapper = ({id, cardStyle, dragStyle, onClick, className, children}) => {
  const allClassNames = classNames('react-trello-card', className || '')
  return (
    <MovableCardWrapper
      className={allClassNames}
      key={id}
      data-id={id}
      onClick={onClick}
      style={{
      ...cardStyle,
      ...dragStyle
      }}
    >
      {children}
    </MovableCardWrapper>
  )
}

CardWrapper.defaultProps = {
  cardStyle: {},
  dragStyle: {}
}

CardWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  cardStyle: PropTypes.object,
  dragStyle: PropTypes.object,
}

export default CardWrapper
