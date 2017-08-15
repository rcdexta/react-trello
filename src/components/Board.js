import React, {Component, PropTypes} from 'react'
import BoardContainer from './BoardContainer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import boardReducer from '../reducers/BoardReducer'

let store = createStore(boardReducer, typeof (window) !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
  backgroundColor: PropTypes.string
}
