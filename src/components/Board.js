import React, {Component} from 'react'
import BoardContainer from './BoardContainer'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import boardReducer from '../reducers/BoardReducer'
import logger from 'redux-logger'

const middlewares = process.env.NODE_ENV === 'development' ? [logger] : []

export default class Board extends Component {
  constructor() {
    super()

    this.store = this.getStore();
  }

  getStore = () => {
    //When you create multiple boards, unique stores are created for isolation
    return createStore(boardReducer, applyMiddleware(...middlewares))
  }

  render() {
    return (
      <Provider store={this.store}>
        <BoardContainer {...this.props} />
      </Provider>
    )
  }
}
