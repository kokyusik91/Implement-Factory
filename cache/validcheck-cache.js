import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 이전에 저장된 데이터가 있는지 확인합니다.
        const cachedData = localStorage.getItem('cachedData')
        if (cachedData) {
          // 저장된 데이터가 있으면 유효성 검사를 수행합니다.
          const parsedData = JSON.parse(cachedData)
          const cachedLastUpdated = new Date(parsedData.lastUpdated).getTime()
          const currentLastUpdated = new Date().getTime()
          // 캐시된 데이터가 최신 데이터인 경우
          if (currentLastUpdated - cachedLastUpdated <= 60000) {
            setData(parsedData.data)
            return
          }
        }

        // 캐시된 데이터가 최신 데이터가 아닌 경우, 서버에서 새로운 데이터를 가져옵니다.
        const response = await axios.get('https://example.com/api/data')
        setData(response.data)
        // 새로운 데이터를 로컬 스토리지에 저장합니다.
        const newData = { data: response.data, lastUpdated: new Date() }
        localStorage.setItem('cachedData', JSON.stringify(newData))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App

// 위 코드에서는 useEffect 훅을 사용하여 컴포넌트가 마운트될 때 fetchData 함수가 실행되도록 했습니다. fetchData 함수는 다음과 같은 작업을 수행합니다.

// 로컬 스토리지에 저장된 이전 데이터가 있는지 확인합니다.
// 이전 데이터가 있다면, lastUpdated 값을 사용하여 캐시된 데이터가 최신 데이터인지 검사합니다. 1분 이내에 갱신된 데이터는 최신 데이터로 판단합니다.
// 캐시된 데이터가 최신 데이터인 경우, setData 함수를 호출하여 화면에 데이터를 렌더링합니다.
// 캐시된 데이터가 최신 데이터가 아닌 경우, 서버에서 새로운 데이터를 가져옵니다. setData 함수를 호출하여 화면에 데이터를 렌더링한 뒤, 새로운 데이터를 로컬 스토리지에 저장합니다.
