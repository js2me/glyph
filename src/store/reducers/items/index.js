import { handleActions } from 'redux-actions'

const defaultState = {}

const reducerMap = {
  'ITEMS/SET_ALL': (state, { payload: items }) => {
    return { ...items }
  },
}

export default handleActions(reducerMap, defaultState)
