const fetchNumber = new Promise((resolve, reject) => {
  // 서버 통신 혹은 파일 가져오기
  setTimeout(() => resolve(1), 1000)
})

fetchNumber
  // then의 콜백함수는 마이크 로태스크 큐에서 관리된다.
  // 이벤트 루프틑 마이크로 테스크 큐에 있는 콜백함수들을 콜 스택으로 올려보낸다.
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
