import React, {Component} from 'react'
import BoardContainer from './BoardContainer'
import {Provider} from 'react-redux'
import classNames from 'classnames'
import {applyMiddleware, createStore} from 'redux'
import boardReducer from 'reducers/BoardReducer'
import logger from 'redux-logger'
import uuidv1 from 'uuid/v1'

const middlewares = process.env.REDUX_LOGGING ? [logger] : []

export default class Board extends Component {
  constructor({id}) {
    super()
    this.store = this.getStore()
    this.id = id || uuidv1()
  }

  getStore = () => {
    //When you create multiple boards, unique stores are created for isolation
    return createStore(boardReducer, applyMiddleware(...middlewares))
  }

  render() {
    const {id, className, components} = this.props
    const allClassNames = classNames('react-trello-board', className || '')
    return (
      <Provider store={this.store}>
        <>
          <components.GlobalStyle />
          <BoardContainer
            id={this.id}
            {...this.props}
            className={allClassNames}
          />
       </>
      </Provider>
    )
  }
}
