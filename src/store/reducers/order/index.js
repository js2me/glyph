import _ from 'lodash'
import { handleActions } from 'redux-actions'

const defaultState = {}

const reducerMap = {
  'ORDER/ADD_ITEM': (state, { payload: item }) => {
    return {
      ...state,
      [item.id]: item,
    }
  },
  'ORDER/REMOVE_ITEM': (state, { payload: itemId }) => {
    return _.omit(state, itemId)
  },
}

export default handleActions(reducerMap, defaultState)
