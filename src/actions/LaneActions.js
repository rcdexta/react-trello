import {createAction} from 'redux-actions'

export const addCard = createAction('ADD_CARD')
export const updateCard = createAction('UPDATE_CARD')
export const removeCard = createAction('REMOVE_CARD')
export const moveCardAcrossLanes = createAction('MOVE_CARD')
export const updateCards = createAction('UPDATE_CARDS')
export const updateLanes = createAction('UPDATE_LANES')
export const updateLane = createAction('UPDATE_LANE')
export const paginateLane = createAction('PAGINATE_LANE')
export const moveLane = createAction('MOVE_LANE')
export const removeLane = createAction('REMOVE_LANE')
