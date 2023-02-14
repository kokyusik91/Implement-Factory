// console.log('윈도우!', window)

if (typeof window !== 'undefined') {
  console.log('브라우저')
  const a = 1
  const b = 2
  console.log(a + b)
}

if (typeof window === 'undefined') {
  console.log(__filename)
  console.log(__dirname)

  console.log('node.js 환경')
  const a = 2
  const b = 3
  console.log(a + b)
}
