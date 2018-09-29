import React, { Component } from 'react'
import cx from './index.scss'

// import backgroundImage from '~/assets/background.jpg'

class Main extends Component {

  render() {
    return (
      <div className={cx('root')}>
        <div className={cx('short-info')}>
          <h1>Всё необходимое для сварки</h1>
          <h3>Огромный выбор газотехнического оборудования</h3>
        </div>
      </div>
    )
  }
}
export default Main
