import Axios from 'axios'

const axios = Axios.create({
  headers: { 'content-Type': 'application/json' },
})

// Request에 인터셉터 추가
axios.interceptors.request.use(
  (config) => {
    console.log('Request: OnFulfilled')
    console.log('config', config)
    return config
  },
  (error) => {
    console.log('Request: OnRejected')
  },
)

// Response에 인터셉터 추가
axios.interceptors.response.use(
  (response) => {
    console.log('Response: OnFulfilled')
    return response
  },
  (error) => {
    console.log('Response: OnRejected')
  },
)

axios
  .get('https://randomuser.me/api')
  .then((response) => {
    console.log('GET: Data')
    return response
  })
  .then((res) => console.log())
