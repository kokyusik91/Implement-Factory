const fetchNumber = new Promise((resolve, reject) => {
  // 서버 통신 혹은 파일 가져오기
  setTimeout(() => resolve(1), 1000)
})

fetchNumber
  .then((value) => value * 55)
  .then((value) => value + 5)
  .then((value) => value * 10)
  .then((value) => {
    // 비동기 promise 도 then에서 소요된다.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value + '😂')
      }, 2000)
    })
  })
  .then((res) => {
    console.log(res)
  })
