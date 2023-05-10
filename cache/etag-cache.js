import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [etag, setEtag] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = JSON.parse(localStorage.getItem('cachedData'))
      const cachedEtag = localStorage.getItem('cachedEtag')

      try {
        const result = await axios.get('https://api.example.com/data', {
          headers: {
            'If-None-Match': cachedEtag,
          },
        })
        setData(result.data)
        setEtag(result.headers.etag)
        localStorage.setItem('cachedData', JSON.stringify(result.data))
        localStorage.setItem('cachedEtag', result.headers.etag)
      } catch (error) {
        if (error.response.status === 304) {
          setData(cachedData)
        }
      }
    }

    fetchData()
  }, [])

  return <div>{data && <p>{data}</p>}</div>
}

export default App

// 이 코드에서는 localStorage를 사용하여 캐시 데이터와 캐시 태그 값을 저장합니다.
// fetchData 함수에서는 먼저 localStorage에서 캐시 데이터와 캐시 태그 값을 불러옵니다.
// 그리고 axios의 If-None-Match 헤더에 캐시 태그 값을 설정하여 요청을 보내면, 서버는 이전에 보낸 응답의 etag와 비교하여 변경된 부분이 없으면 304 Not Modified 응답을 보내고,
// 변경된 부분이 있다면 새로운 데이터를 응답합니다. 만약 304 Not Modified 응답을 받으면 이전에 캐시한 데이터를 사용하고,
// 그렇지 않으면 새로운 데이터를 캐시하고 캐시 태그 값을 업데이트합니다.
