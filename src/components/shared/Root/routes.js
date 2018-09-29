import _ from 'lodash'
import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '~/helpers/route_helpers'

import Main from '~/components/pages/Main'

const componentByRoute = {
  main: Main,
}

export const generateRoutes = () =>
  _.map(routes, ({ path }, key) => (
    <Route exact path={path} key={key} component={componentByRoute[key]} />
  ))
