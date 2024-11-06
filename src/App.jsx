import { useState } from 'react'
import Map from './map.jsx'
import CompostCounter from './CompostCounter.jsx'
import AxiosExample from './AxiosExample.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Map />
      <CompostCounter />
      <AxiosExample />
    </>
  )
}

export default App
