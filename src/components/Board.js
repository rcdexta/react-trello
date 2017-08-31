import React, {Component} from 'react'
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
