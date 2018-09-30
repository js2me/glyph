function getExecutionTime(code) {
  var t0 = performance.now()
  eval(code) // eslint-disable-line
  var t1 = performance.now()
  return t1 - t0
}

onmessage = function(event) {
  const { code, id } = event.data
  var maxCountTests = 13
  var times = []
  for (let x = 0; x < maxCountTests; x++) {
    setTimeout(() => {
      times.push(getExecutionTime(code))
    })
  }
  setTimeout(() => {
    this.postMessage({
      id,
      time: times.reduce((allTime, time) => allTime + time, 0) / maxCountTests,
    })
  }, 2000)
  // require(['../require.context/templates/' + event.data], function(tmpl) {
  // postMessage(tmpl())
  // })
}
