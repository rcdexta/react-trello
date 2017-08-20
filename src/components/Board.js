import React, {Component, PropTypes} from 'react'
import BoardContainer from './BoardContainer'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import boardReducer from '../reducers/BoardReducer'
import logger from 'redux-logger'

const middlewares = process.env.NODE_ENV === 'development' ? [logger] : []
const store = createStore(boardReducer, applyMiddleware(...middlewares))

export default class Board extends Component {

  render () {
    return <Provider store={store}>
      <BoardContainer {...this.props} />
    </Provider>
  }
}

Board.propTypes = {
  data: PropTypes.object.isRequired,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  eventBusHandle: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  onDataChange: PropTypes.func,
  style: PropTypes.object
}
