import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import Modals from '../Modals'
import store from '~/store'
import { generateRoutes } from './routes'

import cx from './index.scss'

const routes = generateRoutes()

const Root = () => (
  <Provider store={store} render>
    <Router forceRefresh={!('pushState' in window.history)}>
      <div className={cx('route-data')}>
          {routes}
        <Modals />
      </div>
    </Router>
  </Provider>
)

export default Root
