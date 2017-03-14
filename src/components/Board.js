import React, {Component} from 'react'
import BoardContainer from './BoardContainer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import boardReducer from '../reducers/BoardReducer'

let store = createStore(boardReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default class Board extends Component {

  render () {
    return <Provider store={store}>
      <BoardContainer {...this.props} />
    </Provider>
  }
}

Board.propTypes = {
  data: React.PropTypes.object.isRequired,
  onLaneScroll: React.PropTypes.func,
  onCardClick: React.PropTypes.func,
  eventBusHandle: React.PropTypes.func,
  laneSortFunction: React.PropTypes.func,
  draggable: React.PropTypes.bool,
  handleDragStart: React.PropTypes.func,
  handleDragEnd: React.PropTypes.func
}
