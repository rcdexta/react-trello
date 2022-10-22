import {useContext} from 'react'
import {BoardContext} from '../controllers/Board'
import {useStore} from 'zustand'

export const useBoard = () => {
  const store = useContext(BoardContext)
  return useStore(store)
}
