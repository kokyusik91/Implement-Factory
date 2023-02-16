// console.log('윈도우!', window)

// if (typeof window !== 'undefined') {
//   console.log('브라우저')
//   const a = 1
//   const b = 2
//   console.log(a + b)
//   // console.log(__filename)
//   // console.log(__dirname)
// }

// if (typeof window === 'undefined') {
//   console.log(__filename)
//   console.log(__dirname)

//   console.log('node.js 환경')
//   const a = 2
//   const b = 3
//   console.log(a + b)
// }

// ES11에 나온 widnow와 node의 공통 전역 객체
globalThis.realName = 'kks'

console.log(globalThis.realName)
