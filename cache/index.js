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

cache.get('https://jsonplaceholder.typicode.com/posts/1').then((data) => {
  console.log(data)
})
