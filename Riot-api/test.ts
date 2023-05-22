function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({ data: 'Hi there!' })
}

sendRequest('Send this!', (response) => {
  console.log(response)
  return true
})

const response = sendRequest('Send this!', (response) => {
  console.log(response)
  return true
})

console.log('responseresponse', response)
