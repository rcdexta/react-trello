import {MapLaneHelperToReducer} from 'rt/reducers/BoardReducer'

export interface EventBusHandle {
  publish: (event: EventBusEvent) => any
}

type EventBusEvent = {
  type: keyof typeof MapLaneHelperToReducer
}
