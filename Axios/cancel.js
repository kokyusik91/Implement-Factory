import axios from 'axios'

// 취소 토큰 생성
const cancelTokenSource = axios.CancelToken.source()
console.log('cancelTokenSourcecancelTokenSource', cancelTokenSource)

// HTTP 요청 구성
const config = {
  url: 'http://example.com/api/data',
  method: 'get',
  cancelToken: cancelTokenSource.token,
}

// HTTP 요청 보내기
axios(config)
  .then((response) => {
    console.log('Axios 요청 취소', response.data)
  })
  .catch((error) => {
    console.log(error)
    if (axios.isCancel(error)) {
      console.log(axios.isCancel(error))
      console.log('HTTP 요청이 취소되었습니다.', error.message)
    } else {
      console.log('HTTP 요청 중 오류가 발생하였습니다.', error.message)
    }
  })

// HTTP 요청 취소하기
cancelTokenSource.cancel('HTTP 요청 취소')
