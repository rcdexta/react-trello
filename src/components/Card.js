import React, {Component, PropTypes} from 'react'
import {CardWrapper, CardHeader, CardTitle, CardRightContent, Detail, Footer} from '../styles/Base'
import {DragType} from '../helpers/DragType'
import {DragSource, DropTarget} from 'react-dnd'
var flow = require('lodash.flow')
import {findDOMNode} from 'react-dom'
import Tag from './Tag'

class Card extends Component {

  render () {
    const {id, title, description, label, tags, connectDragSource, connectDropTarget, isDragging, ...otherProps} = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(
        <div>
          <CardWrapper key={id} data-id={id} {...otherProps} style={{opacity: opacity}}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardRightContent>{label}</CardRightContent>
            </CardHeader>
            <Detail>{description}</Detail>
            {tags && <Footer>
              {tags.map((tag) => <Tag {...tag} />)}
            </Footer>
            }
          </CardWrapper>
        </div>
      )
    )
  }
}

const cardSource = {
  canDrag (props) {
    return props.draggable
  },

  beginDrag (props) {
    props.handleDragStart(props.id, props.listId)
    return {
      id: props.id,
      listId: props.listId,
      index: props.index,
      card: props
    }
  },

  endDrag (props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult && dropResult.listId !== item.listId) {
      props.removeCard(item.listId, item.id)
    }
    props.handleDragEnd(item.id, item.listId, dropResult ? dropResult.listId : item.listId)
  }
}

const cardTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const sourceListId = monitor.getItem().listId

    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  metadata: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleDragStart: React.PropTypes.func,
  handleDragEnd: React.PropTypes.func
}

export default flow(
  DropTarget(DragType.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(DragType.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card)
