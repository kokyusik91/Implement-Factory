function createCache() {
  const cache = {}

  function get(key) {
    if (cache[key]) {
      return cache[key].value
    }
    return null
  }

  function set(key, value) {
    cache[key] = {
      value,
      created: Date.now(),
    }
  }

  function remove(key) {
    if (cache[key]) {
      delete cache[key]
    }
  }

  function clear() {
    Object.keys(cache).forEach((key) => {
      delete cache[key]
    })
  }

  function cleanup(maxAge) {
    const now = Date.now()
    Object.keys(cache).forEach((key) => {
      if (now - cache[key].created > maxAge) {
        delete cache[key]
      }
    })
  }

  return {
    get,
    set,
    remove,
    clear,
    cleanup,
  }
}

const cache = createCache()

cache.set('foo', 'bar')
console.log(cache.get('foo')) // 'bar'

cache.cleanup(1000) // Remove entries older than 1 second
console.log(cache.get('foo')) // null

cache.remove('foo')
console.log(cache.get('foo')) // null

// 이 코드에서 createCache 함수는 캐시 객체를 생성하고, 해당 객체의 get, set, remove, clear, cleanup 메서드를 반환합니다. get 메서드는 입력된 키에 대한 값을 반환하고, set 메서드는 키-값 쌍을 캐시에 저장합니다. remove 메서드는 입력된 키에 대한 값을 삭제하고, clear 메서드는 캐시를 완전히 비웁니다. cleanup 메서드는 입력된 시간 이전에 생성된 모든 값들을 캐시에서 삭제합니다.
