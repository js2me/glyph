import { applyMiddleware, compose, createStore } from 'redux'
import reducers from './reducers'
import { createMiddleware } from './middleware'

const buildStore = (initialState = {}) => {
  const middleware = createMiddleware()
  const enhancers = [applyMiddleware(...middleware)]
  if (window.__REDUX_DEVTOOLS_EXTENSION__ && isDev) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }
  const store = createStore(reducers, initialState, compose(...enhancers))
  return store
}

export default buildStore()
