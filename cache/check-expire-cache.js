import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = JSON.parse(localStorage.getItem('cachedData'))
      const cachedTime = JSON.parse(localStorage.getItem('cachedTime'))

      if (
        cachedData &&
        cachedTime &&
        new Date().getTime() - cachedTime < 5 * 60 * 1000
      ) {
        setData(cachedData)
      } else {
        const result = await axios.get('https://api.example.com/data')
        setData(result.data)
        localStorage.setItem('cachedData', JSON.stringify(result.data))
        localStorage.setItem('cachedTime', JSON.stringify(new Date().getTime()))
      }
    }

    fetchData()
  }, [])

  return <div>{data && <p>{data}</p>}</div>
}

export default App

// 이 코드에서는 localStorage를 사용하여 캐시 데이터와 캐시 시간을 저장합니다.
// fetchData 함수에서는 먼저 localStorage에서 캐시 데이터와 캐시 시간을 불러와서 만료되었는지 확인합니다.
// new Date().getTime() - cachedTime이 5분(5 * 60 * 1000 밀리초) 이하이면 캐시 데이터를 사용하고, 그렇지 않으면 API에서 데이터를 가져와서 캐시합니다.
