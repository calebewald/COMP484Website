import { useState } from 'react'
import Map from './map.jsx'
import CompostCounter from './CompostCounter.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Map />
      <CompostCounter />
    </>
  )
}

export default App
