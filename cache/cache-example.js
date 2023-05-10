import axios from 'axios'
import { useState, useEffect } from 'react'

function MyComponent() {
  const [data1, setData1] = useState(null)
  const [data2, setData2] = useState(null)
  const [data3, setData3] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      // API 1 캐시 처리
      const cachedData1 = localStorage.getItem('data1')
      if (cachedData1) {
        setData1(JSON.parse(cachedData1))
      } else {
        const response1 = await axios.get('/api1')
        localStorage.setItem('data1', JSON.stringify(response1.data))
        setData1(response1.data)
      }

      // API 2 캐시 처리
      const cachedData2 = localStorage.getItem('data2')
      if (cachedData2) {
        setData2(JSON.parse(cachedData2))
      } else {
        const response2 = await axios.get('/api2')
        localStorage.setItem('data2', JSON.stringify(response2.data))
        setData2(response2.data)
      }

      // API 3 캐시 처리
      const cachedData3 = localStorage.getItem('data3')
      if (cachedData3) {
        setData3(JSON.parse(cachedData3))
      } else {
        const response3 = await axios.get('/api3')
        localStorage.setItem('data3', JSON.stringify(response3.data))
        setData3(response3.data)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Data 1</h1>
      <pre>{JSON.stringify(data1, null, 2)}</pre>
      <h1>Data 2</h1>
      <pre>{JSON.stringify(data2, null, 2)}</pre>
      <h1>Data 3</h1>
      <pre>{JSON.stringify(data3, null, 2)}</pre>
    </div>
  )
}
