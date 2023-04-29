import Axios from 'axios'

const axios = Axios.create({})

// Request에 인터셉터 추가
axios.interceptors.request.use(
  (config) => {
    console.log('Request: OnFulfilled')
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
  .get('https://randomuser.me/api/notFound')
  .then((response) => {
    console.log('GET: Data')
    return response
  })
  .then((res) => console.log())
