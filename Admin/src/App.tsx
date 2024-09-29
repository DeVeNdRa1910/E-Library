import { useState } from 'react'
import { Button } from './components/ui/button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-red-400'>{count}</h1>
      <div className="m-5 p-5">
        <Button className='m-3' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button onClick={() => setCount((count) => count - 1)}>
          count is {count}
        </Button>
      </div>
    </>
  )
}

export default App
