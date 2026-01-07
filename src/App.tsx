import { useState } from 'react'
import AlgorithmVisualizer from './AlgorithmVisualizer/AlgorithmVisualizer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AlgorithmVisualizer></AlgorithmVisualizer>
    </div>
  )
}

export default App
