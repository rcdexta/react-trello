import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {MovableCardWrapper, CardHeader, CardRightContent, CardTitle, Detail, Footer } from 'styles/Base'
import Tag from './Tag'
import DeleteButton from './widgets/DeleteButton'

class Card extends Component {
  onDelete = e => {
    this.props.onDelete()
    e.stopPropagation()
  }

  render()  {
    const {showDeleteButton, style, tagStyle, card, onClick, onDelete, className } = this.props
    const { id, title, label, description, tags } = card

    return (
      <MovableCardWrapper
        key={id}
        data-id={id}
        onClick={onClick}
        style={style}
        className={className}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardRightContent>{label}</CardRightContent>
          {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
        </CardHeader>
        <Detail>{description}</Detail>
        {tags && (
        <Footer>
          {tags.map(tag => (
          <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
          ))}
        </Footer>
        )}
      </MovableCardWrapper>
      )
  }
}

Card.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  tagStyle: PropTypes.object,
  card: PropTypes.object.isRequired,
  className: PropTypes.string,
}

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  card: { title: 'no title', description: '', label: '', tags: [] },
  tagStyle: {},
  className: ''
}

export default Card
