import React, { Component } from 'react'
import Animate from '~/components/shared/Animate'
import { scrollWatcher } from '~/helpers/scroll_helpers'
import cx from './index.scss'

class ImageDrawer extends Component {
  switchImagesInterval = null

  state = {
    opacities: [1, 0],
    previous: 0,
    current: 1,
    translateY: 0,
  }

  componentWillMount() {
    const { images, interval } = this.props
    this.images = images
    this.switchImagesInterval = setInterval(this.switchImage, interval)
    scrollWatcher(this.handleScroll)
  }

  handleScroll = percent =>
    this.setState(() => ({
      translateY: percent / 6.4,
    }))

  tick = 0
  switchImage = () => {
    const { previous, current, opacities } = this.state
    let newState = {
      opacities: opacities.reverse(),
    }
    if (this.tick < 1) {
      this.tick++
    } else {
      newState.previous = current + 1 === this.images.length ? 0 : current + 1
      newState.current = previous + 1 === this.images.length ? 0 : previous + 1
    }
    this.setState(newState)
  }

  getAnimation = position => {
    const value = this.state.opacities[position]
    return {
      opacity: value,
      scale: value ? 1 : 1.2,
    }
  }

  componentDidMount() {
    this.setState({
      rendered: true,
    })
  }

  componentWillUnmount() {
    clearInterval(this.switchImagesInterval)
  }

  render() {
    const { children } = this.props
    const { current, previous, rendered, translateY } = this.state
    const duration = rendered ? 1400 : 0
    return (
      <div className={cx('root')}>
        <div
          className={cx('image-wrapper')}
          style={{
            transform: `translateY(-${translateY}%)`,
            backgroundImage: `url(${this.images[0]})`,
          }}
        >
          <Animate
            easing="linear"
            duration={duration}
            animateProperties={this.getAnimation(0)}
          >
            {refConnector => (
              <div
                ref={refConnector}
                className={cx('image')}
                style={{
                  backgroundImage: `url(${this.images[previous]})`,
                }}
              />
            )}
          </Animate>
          <Animate
            easing="linear"
            duration={duration}
            animateProperties={this.getAnimation(1)}
          >
            {refConnector => (
              <div
                ref={refConnector}
                className={cx('image')}
                style={{
                  backgroundImage: `url(${this.images[current]})`,
                }}
              />
            )}
          </Animate>
        </div>

        {children}
      </div>
    )
  }
}

ImageDrawer.defaultProps = {
  interval: 13000,
}

export default ImageDrawer
