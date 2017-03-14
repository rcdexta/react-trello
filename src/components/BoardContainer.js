import React, {Component, PropTypes} from 'react'
import {BoardDiv} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Lane from './Lane'

const boardActions = require('../actions/BoardActions')
const laneActions = require('../actions/LaneActions')

class BoardContainer extends Component {

  state = {data: this.props.data}

  wireEventBus = () => {
    let eventBus = {
      publish: (event) => {
        switch (event.type) {
          case 'ADD_CARD':
            this.props.actions.addCard({laneId: event.laneId, card: event.card})
          case 'REMOVE_CARD':
            this.props.actions.removeCard({laneId: event.laneId, cardId: event.cardId})
        }
      }
    }
    this.props.eventBusHandle(eventBus)
  }

  componentDidMount () {
    this.props.actions.loadBoard(this.props.data)
    if (this.props.eventBusHandle) {
      this.wireEventBus()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.newData) {
      const dataToUpdate = this.state.data
      dataToUpdate.lanes = nextProps.newData.lanes
      this.setState({data: dataToUpdate})
      this.props.onDataChange && this.props.onDataChange(nextProps.newData)
    }
  }

  render () {
    const {data} = this.state
    return <BoardDiv>
      {
        data.lanes.map((lane) => {
          const {id, ...otherProps} = lane
          const {draggable, handleDragStart, handleDragEnd, onCardClick, onLaneScroll, laneSortFunction} = this.props
          return <Lane key={id}
            id={id}
            {...otherProps}
            {...{draggable, handleDragStart, handleDragEnd, onCardClick, onLaneScroll, laneSortFunction}}
          />
        })}
    </BoardDiv>
  }
}

BoardContainer.propTypes = {
  data: PropTypes.object.isRequired,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  eventBusHandle: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  onDataChange: PropTypes.func
}

const mapStateToProps = (state) => {
  return {newData: state}
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(BoardContainer))
