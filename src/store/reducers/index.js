import { combineReducers } from 'redux'
import items from './items'
import order from './order'

export default combineReducers({
  items,
  order,
})
