import _ from 'lodash'
import React, { Component } from 'react'
import moment from 'moment'
import cx from './index.scss'
import Snippet from './Snippet'
// import SnippetWorker from './snippet.worker'
import Worker from './snippet.worker'

// import backgroundImage from '~/assets/background.jpg'

const getEmptySnippet = () => ({
  title: '',
  code: '',
  lastTimeExecution: null,
  inProgress: false,
})

class Main extends Component {
  state = {
    snippets: [getEmptySnippet(), getEmptySnippet()],
    hasError: false,
  }

  componentWillMount() {
    if (!window.Worker) {
      this.setState({
        hasError: true,
      })
    }
    document.addEventListener('keydown', e => {
      if (e.keyCode === 9) {
        e.preventDefault()
      }
    })
  }

  handleChangeSnippet = (id, key, value) => {
    const snippets = [...this.state.snippets]
    snippets[id][key] = value
    this.setState({ snippets })
  }

  addNewSnippet = () =>
    this.setState({
      snippets: [...this.state.snippets, getEmptySnippet()],
    })

  workers = []

  handleFinishedWorker = event => {
    const { id, time } = event.data
    this.handleChangeSnippet(
      id,
      'lastTimeExecution',
      _.floor(moment.duration(time, 'milliseconds').asSeconds(), 6)
    )
    this.handleChangeSnippet(id, 'inProgress', false)
  }

  runSnippets = () => {
    _.each(this.state.snippets, ({ code }, id) => {
      this.handleChangeSnippet(id, 'inProgress', true)
      let worker = new Worker()
      worker.postMessage({ code, id })
      worker.onmessage = this.handleFinishedWorker
    })
  }

  snippetHasBestResult = id => {
    const { lastTimeExecution } = this.state.snippets[id]
    let snippets = [...this.state.snippets]
    snippets.splice(id, 1)
    return _.some(
      snippets,
      snippet => snippet.lastTimeExecution > lastTimeExecution
    )
  }

  render() {
    const { snippets, hasError } = this.state
    return hasError ? (
      <div className={cx('root')}> WebWorkers is not supporting </div>
    ) : (
      <div className={cx('root')}>
        <h1 className={cx('title')}>
          GlyphJS - JavaScript code performance tester
        </h1>
        <div className={cx('snippets-actions')}>
          <button
            className={cx('add-snippet')}
            tabIndex={-1}
            onClick={this.addNewSnippet}
          >
            <i className="fas fa-plus" />add new snipper
          </button>
          <button
            className={cx('run-snippets')}
            tabIndex={-1}
            onClick={this.runSnippets}
          >
            <i className="fas fa-play" />run
          </button>
        </div>
        <div className={cx('snippets')}>
          {snippets.map(
            ({ code, title, lastTimeExecution, inProgress }, index) => (
              <Snippet
                code={code}
                id={index}
                isBest={this.snippetHasBestResult(index)}
                isLoading={inProgress}
                key={index}
                lastTimeExecution={lastTimeExecution}
                onChange={this.handleChangeSnippet}
                title={title}
              />
            )
          )}
        </div>
      </div>
    )
  }
}
export default Main
