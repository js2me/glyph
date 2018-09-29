import React from 'react'
import _ from 'lodash'
import anime from 'animejs'

export default class Animate extends React.PureComponent {
  animateElement = null
  refConnector = ref => (this.animateElement = ref)

  componentDidMount() {
    const { duration, animateProperties, easing } = this.props
    this.animate(duration, easing, animateProperties)
  }

  componentWillReceiveProps(nextProps) {
    const { animateProperties: oldAnimateProperties } = this.props
    const { duration, animateProperties, easing } = nextProps
    if (!_.isEqual(oldAnimateProperties, animateProperties)) {
      this.animate(duration, easing, animateProperties)
    }
  }

  render = () => this.props.children(this.refConnector)

  animate(duration, easing, animateProperties) {
    if (this.animateElement) {
      anime({
        duration,
        easing,
        targets: this.animateElement,
        ...animateProperties,
      })
    }
  }
}
