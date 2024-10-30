import { useState } from 'react'
import Map from './map.jsx'
import CompostCounter from './CompostCounter.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<<<<<<< HEAD
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>This is the best branch because it is Luis's</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* Render the map */}
=======
>>>>>>> Caleb
      <Map />
      <CompostCounter />
    </>
  )
}

export default App;
