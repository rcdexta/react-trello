import React, {FC, PropsWithChildren} from 'react'
import {Provider} from 'react-redux'
import classNames from 'classnames'
import {createStore} from 'redux'
import uuidv1 from 'uuid/v1'
import BoardContainer from './BoardContainer'
import boardReducer from '../reducers/BoardReducer'
import DefaultComponets from '../components'

export const Board: FC<
  PropsWithChildren<{
    id?: string
    className?: string
    components?: typeof DefaultComponets
    t: any
  }>
> = ({id, components, className, ...rest}) => {
  const allClassNames = classNames('react-trello-board', className || '')

  return (
    <Provider store={createStore(boardReducer)}>
      <>
        <components.GlobalStyle />
        <BoardContainer id={id || uuidv1()} components={components} {...rest} className={allClassNames} />
      </>
    </Provider>
  )
}
