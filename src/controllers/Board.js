import React, {Component} from 'react'
import {Provider} from 'react-redux'
import classNames from 'classnames'
import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import uuidv1 from 'uuid/v1'
import BoardContainer from './BoardContainer'
import createTranslate from 'rt/helpers/createTranslate'
import boardReducer from 'rt/reducers/BoardReducer'

const middlewares = process.env.REDUX_LOGGING ? [logger] : []

export default class Board extends Component {
  state = {isDown: false, startPos: 0, currentPos: 0, isBoardMoving: false, isBoardClicked: false}
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
            isBoardMoving={this.state.isBoardMoving}
            isBoardClicked={this.state.isBoardClicked}
            interactions={{
              onMouseDown: event => {
                this.setState({isDown: true, startPos: event.pageX, isBoardMoving: false, isBoardClicked: true})
              },
              onMouseUp: event => {
                const el = document.querySelector('.react-trello-board-wrapper')
                this.setState({
                  isDown: false,
                  isBoardClicked: false,
                  currentPos: el.getBoundingClientRect().x + 8,
                  isBoardMoving: false
                })
              },
              onMouseMove: event => {
                if (this.state.isDown) {
                  this.setState({isBoardMoving: true})
                  const el = document.querySelector('.react-trello-board-wrapper')
                  // prettier-ignore
                  const moveX = event.pageX <= el.parentElement.getBoundingClientRect().width / 6 ? 0 : Math.abs(this.state.startPos - event.pageX + this.state.currentPos)

                  el.style.transform = `translateX(-${moveX}px)`
                }
              }
            }}
          />
        </>
      </Provider>
    )
  }
}
