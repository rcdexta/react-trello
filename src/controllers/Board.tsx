import React, {Component, FC, PropsWithChildren} from 'react'
import {Provider} from 'react-redux'
import classNames from 'classnames'
import {createStore} from 'redux'
import uuidv1 from 'uuid/v1'
import BoardContainer from './BoardContainer'
import boardReducer from '../reducers/BoardReducer'
import * as DefaultComponets from '../components'

export class Board extends Component<{
  id?: string
  className?: string
  components?: typeof DefaultComponets
  t?: any
}> {
  store: any
  id: any
  constructor(props) {
    super(props)
    this.store = this.getStore()
    this.id = this.id || uuidv1()
  }

  getStore = () => {
    //When you create multiple boards, unique stores are created for isolation
    return createStore(boardReducer)
  }

  render() {
    const {id, className, components} = this.props
    const allClassNames = classNames('react-trello-board', className || '')
    return (
      <Provider store={this.store}>
        <>
          <components.GlobalStyle />
          <BoardContainer id={this.id} {...this.props} className={allClassNames} />
        </>
      </Provider>
    )
  }
}
