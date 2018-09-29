import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk'

export const createMiddleware = () =>
  [
    reduxThunk,
    isDev ? createLogger({ collapsed: true, timestamp: false }) : null,
  ].filter(Boolean)
