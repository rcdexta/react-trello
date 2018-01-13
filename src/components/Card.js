import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	CardHeader, CardRightContent, CardTitle, Detail, Footer,
	MovableCardWrapper,
} from '../styles/Base';
import {DragType} from '../helpers/DragType';
import {DragSource, DropTarget} from 'react-dnd';
import {findDOMNode} from 'react-dom';
import Tag from './Tag';
import flow from 'lodash/flow';
import DeleteButton from './widgets/DeleteButton';

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
      const customCardWithProps = React.cloneElement(customCard, {...otherProps})
      return <span>{customCardWithProps}</span>
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

  render () {
    const {id, connectDragSource, connectDropTarget, isDragging, cardStyle, editable, customCardLayout, ...otherProps} = this.props
    const opacity = isDragging ? 0 : 1
    const background = isDragging ? '#CCC' : '#E3E3E3'
    const style = customCardLayout ? {...cardStyle, padding: 0} : cardStyle
    return connectDragSource(
      connectDropTarget(
        <div style={{background: background}}>
          <MovableCardWrapper key={id} data-id={id} {...otherProps} style={{...style, opacity: opacity}}>
            {this.renderBody()}
            {editable && <DeleteButton onClick={this.removeCard} />}
          </MovableCardWrapper>
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
    props.handleDragStart && props.handleDragStart(props.id, props.laneId)
    return {
      id: props.id,
      laneId: props.laneId,
      index: props.index,
      card: props
    }
  },

  endDrag (props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult) {
      if (dropResult.laneId !== item.laneId) {
        props.moveCardAcrossLanes(item.laneId, dropResult.laneId, item.id)
      }
      props.handleDragEnd && props.handleDragEnd(item.id, item.laneId, dropResult.laneId)
    }
  }
}

const cardTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const sourceListId = monitor.getItem().laneId

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

    if (props.laneId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
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
  description: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  metadata: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  customCardLayout: PropTypes.bool,
  customCard: PropTypes.node,
  editable: PropTypes.bool
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
