import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Move styles to ./styles/Card
import {CardHeader, CardRightContent, CardTitle, Detail, Footer } from '../styles/Base'
import Tag from './Tag'
import DeleteButton from './widgets/DeleteButton'

class Card extends Component {
  onDelete = e => {
    this.props.onDelete(this.props.card.id)
    e.stopPropagation()
  }

  render()  {
    const {showDeleteButton, tagStyle, card } = this.props
    const { title, label, description, tags } = card

    return (
      <span>
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
      </span>
      )
  }
}


Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},

  card: { title: 'no title', description: '', label: '', tags: [] },

  tagStyle: {},
}

Card.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  id: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  tagStyle: PropTypes.object
}

export default Card
