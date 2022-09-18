import React, {createContext, FC, PropsWithChildren} from 'react'
import classNames from 'classnames'
import uuidv1 from 'uuid/v1'
import {BoardContainer} from './BoardContainer'
import * as DefaultComponets from '../components'
import {BoardData} from 'rt/types/Board'
import {store} from 'rt/store/store'

// export class _Board extends Component<{
//   id?: string
//   className?: string
//   components?: typeof DefaultComponets
//   data: BoardData
//   t?: any
// }> {
//   store: any
//   id: any
//   constructor(props) {
//     super(props)
//     this.store = this.getStore()
//     this.id = this.props.id || uuidv1()
//   }

//   getStore = () => {
//     //When you create multiple boards, unique stores are created for isolation
//     return createStore(boardReducer)
//   }

//   render() {
//     const {className, components} = this.props
//     const allClassNames = classNames('react-trello-board', className || '')
//     return (
//       <Provider store={this.store}>
//         <>
//           <components.GlobalStyle />
//           <BoardContainer id={this.id} {...this.props} className={allClassNames} />
//         </>
//       </Provider>
//     )
//   }
// }

export const Board: FC<
  PropsWithChildren<{
    id?: string
    className?: string
    components: typeof DefaultComponets
    data: BoardData
    t?: any
  }>
> = ({data, children, className, components, id, t, ...rest}) => {
  const allClassNames = classNames('react-trello-board', className || '')

  return (
    <BoardContext.Provider value={store}>
      <components.GlobalStyle />
      <BoardContainer
        id={id || uuidv1()}
        data={data}
        components={components}
        t={t}
        className={allClassNames}
        {...rest}
      />
    </BoardContext.Provider>
  )
}

export const BoardContext = createContext(store)
