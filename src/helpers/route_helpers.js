import _ from 'lodash'

export const routes = {
  main: {
    path: '/',
    label: 'Main',
  },
}

export const getAllRoutesExceptFor = routeName =>
  _.values(_.omit(routes, routeName))

// export const setPageTitle = routeName => {
//   const title = document.getElementsByTagName('title')[0]
//   title.innerText = `SITE NAME | ${routes[routeName].label}`
// }
