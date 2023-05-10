import axios from 'axios'

// 메모이제이션 패턴을 사용하는 방법:
const cache = {}

function fetchData(url) {
  if (cache[url]) {
    return Promise.resolve(cache[url])
  }
  return axios.get(url).then((response) => {
    cache[url] = response.data
    return response.data
  })
}

// 위의 코드에서는, cache 객체를 선언하여 데이터를 캐싱하고, fetchData 함수를 생성하여 요청이 들어올 때마다 cache 객체를 검색하고, 캐시 된 데이터가 있다면 즉시 반환합니다. 그렇지 않으면 axios를 사용하여 데이터를 가져옵니다. 요청에 대한 응답이 왔을 때, 데이터를 cache 객체에 저장하고 응답 데이터를 반환합니다.

// Redux middleware를 사용하는 방법:
// Redux middleware를 사용하면 모든 API 요청에 대한 캐시를 쉽게 구현할 수 있습니다. redux-api-middleware와 같은 라이브러리를 사용하면 API 호출 시 캐싱을 처리할 수 있습니다.

// React Query 라이브러리를 사용하는 방법:
// React Query는 데이터 캐싱, 요청 중복 처리, 오류 처리 등 API 요청에 대한 많은 기능을 제공하는 라이브러리입니다. React Query를 사용하면 API 요청을 캐싱할 수 있으며, 이를 위해 많은 설정이 제공됩니다.
