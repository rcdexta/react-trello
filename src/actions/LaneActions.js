import {createAction} from 'redux-actions'

export const addCard = createAction('ADD_CARD')
export const removeCard = createAction('REMOVE_CARD')
export const moveCardAcrossLanes = createAction('MOVE_CARD')
export const updateCards = createAction('UPDATE_CARDS')
export const updateLanes = createAction('UPDATE_LANES')
export const paginateLane = createAction('PAGINATE_LANE')
