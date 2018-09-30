import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from './index.scss'

class Snippet extends PureComponent {
  state = {
    titleIsEdit: false,
  }

  handleChange = ({ target }) =>
    this.props.onChange(this.props.id, target.name, target.value)

  render() {
    const { code, title, lastTimeExecution, isLoading, isBest } = this.props
    const { titleIsEdit } = this.state
    return (
      <div className={cx('root', { 'is-best': !isLoading && isBest })}>
        <div className={cx('title')}>
          <input
            name="title"
            onChange={this.handleChange}
            disabled={!titleIsEdit}
            value={title}
          />
        </div>
        <textarea
          className={cx('code')}
          name="code"
          onChange={this.handleChange}
          tabIndex={-1}
          value={code}
        />

        <label className={cx('last-time-execution')}>
          {lastTimeExecution !== null && `~${lastTimeExecution} sec.`}
        </label>
        {isLoading && (
          <div className={cx('loading')}>
            <i className="fas fa-spinner" />
          </div>
        )}
      </div>
    )
  }
}

Snippet.propTypes = {
  code: PropTypes.string,
  id: PropTypes.number,
  isBest: PropTypes.bool,
  isLoading: PropTypes.bool,
  lastTimeExecution: PropTypes.number,
  onChange: PropTypes.func,
  title: PropTypes.string,
}

export default Snippet
