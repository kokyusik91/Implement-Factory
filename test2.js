function solution(babbling) {
  var answer = 0
  const correctList = ['aya', 'ye', 'woo', 'ma']

  const returnData = babbling.filter((val) => {
    let result = val
    correctList.forEach((coval) => {
      if (val.includes(coval)) result = result.replace(coval, '')
    })
    return !result
  })

  return returnData.length
}
