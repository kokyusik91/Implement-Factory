function fetchData(url) {
  return async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
}

function createCache() {
  let cache = {}
  const EXPIRY_TIME = 60 * 1000 // 1분
  let lastFetchTime = 0

  return {
    get(url) {
      if (url in cache && Date.now() - lastFetchTime < EXPIRY_TIME) {
        // 캐시가 유효하면 캐시된 데이터를 반환
        return Promise.resolve(cache[url])
      } else {
        // 캐시가 만료되었거나 없으면 백엔드 API를 호출하여 데이터를 가져옴
        return fetchData(url).then((data) => {
          cache[url] = data
          lastFetchTime = Date.now()
          return data
        })
      }
    },
  }
}

const cache = createCache()

// 예시: https://jsonplaceholder.typicode.com/posts/1 API를 호출하여 데이터를 가져옴
cache.get('https://jsonplaceholder.typicode.com/posts/1').then((data) => {
  console.log(data)
})

// 이 예시 코드에서 createCache 함수가 클로저를 사용하여 cache 객체와 lastFetchTime 변수를 비공개로 유지합니다.
// get 메서드에서는 인자로 받은 url을 키로 사용하여 cache 객체에서 데이터를 가져옵니다.
// 캐시가 유효하면 캐시된 데이터를 반환하고, 캐시가 만료되었거나 없으면 fetchData 함수를 호출하여 데이터를 가져옵니다.
// 가져온 데이터를 cache 객체에 저장하고, lastFetchTime 변수를 갱신합니다.
