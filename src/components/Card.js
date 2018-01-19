import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {CardHeader, CardRightContent, CardTitle, Detail, Footer, MovableCardWrapper} from '../styles/Base'
import Tag from './Tag'
import DeleteButton from './widgets/DeleteButton'
import {Draggable} from 'react-beautiful-dnd'

class Card extends Component {
  removeCard = e => {
    const {id, laneId, removeCard, onDelete} = this.props
    removeCard(laneId, id)
    onDelete(id, laneId)
    e.stopPropagation()
  }

  renderBody = () => {
    if (this.props.customCardLayout) {
      const {customCard, ...otherProps} = this.props
      return React.cloneElement(customCard, {...otherProps})
    } else {
      const {title, description, label, tags} = this.props
      return (
        <span>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardRightContent>{label}</CardRightContent>
          </CardHeader>
          <Detail>{description}</Detail>
          {tags && <Footer>{tags.map(tag => <Tag key={tag.title} {...tag} tagStyle={this.props.tagStyle} />)}</Footer>}
        </span>
      )
    }
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    backgroundColor: isDragging ? '#fbfbbc' : '#fff',
    ...draggableStyle
  })

  render() {
    const {id, index, cardStyle, editable, customCardLayout, ...otherProps} = this.props
    const style = customCardLayout ? {...cardStyle, padding: 0} : cardStyle
    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(dragProvided, dragSnapshot) => {
          const dragStyle = this.getItemStyle(dragSnapshot.isDragging, dragProvided.draggableProps.style)
          return (
            <div>
                <MovableCardWrapper
                  key={id}
                  data-id={id}
                  innerRef={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
									style={{
										...style,
										...dragStyle
									}}
									{...otherProps}
                >
                  {this.renderBody()}
                  {editable && <DeleteButton onClick={this.removeCard} />}
                </MovableCardWrapper>
              {dragProvided.placeholder}
            </div>
          )
        }}
      </Draggable>
    )
  }
}

Card.defaultProps = {
  cardStyle: {},
  customCardLayout: false,
  onDelete: () => {},
  editable: false
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  index: PropTypes.number,
  description: PropTypes.string,
  label: PropTypes.string,
  tags: PropTypes.array,
  laneId: PropTypes.string.isRequired,
  removeCard: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  metadata: PropTypes.object,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  cardStyle: PropTypes.object,
  tagStyle: PropTypes.object,
  customCardLayout: PropTypes.bool,
  customCard: PropTypes.node,
  editable: PropTypes.bool
}

export default Card
