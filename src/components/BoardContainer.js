import React, {Component} from 'react'
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
    }
  }

  render () {
    const {data} = this.state
    return <BoardDiv>
      {
        data.lanes.map((lane) => {
          const {id, ...otherProps} = lane
          return <Lane key={id}
            id={id}
            draggable={this.props.draggable}
            {...otherProps}
            onCardClick={this.props.onCardClick}
            onLaneScroll={this.props.onLaneScroll}
            laneSortFunction={this.props.laneSortFunction}
          />
        })}
    </BoardDiv>
  }
}

BoardContainer.propTypes = {
  data: React.PropTypes.object.isRequired,
  onLaneScroll: React.PropTypes.func,
  onCardClick: React.PropTypes.func,
  eventBusHandle: React.PropTypes.func,
  laneSortFunction: React.PropTypes.func,
  draggable: React.PropTypes.bool,
  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {newData: state}
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(BoardContainer))
