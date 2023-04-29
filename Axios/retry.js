import Axios from 'axios'

const axios = Axios.create()

const MAX_RETRY_COUNT = 2

axios.interceptors.request.use(
  (config) => {
    console.log('재요청 보냄')
    return config
  },
  (error) => {
    console.log('Request: OnRejected')
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(undefined, (error) => {
  const config = error.config
  config.retryCount = config.retryCount ?? 0
  console.log('RETRY COUNT', config.retryCount)

  const shouldRetry = config.retryCount < MAX_RETRY_COUNT

  if (shouldRetry) {
    config.retryCount += 1
    return axios.request(config)
  }

  return Promise.reject(error)
})

const requestConfig = {
  url: 'https://randomuser.me/api/notfound',
  method: 'GET',
}

// Axios 요청!
axios.request(requestConfig).then((response) => {
  console.log('GET: Data')
})
