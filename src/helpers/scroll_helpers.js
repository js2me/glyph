export const getScrollPercent = () => {
  const { documentElement: el, body } = document
  return (
    (el.scrollTop || body.scrollTop) /
    ((el.scrollHeight || body.scrollHeight) - el.clientHeight) *
    100
  )
}

export const scrollWatcher = (callbackFunc, remove) =>
  window[`${remove ? 'remove' : 'add'}EventListener`]('scroll', e =>
    callbackFunc(getScrollPercent(), e)
  )
