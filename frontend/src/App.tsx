import { useState } from 'react'
import { Web3Layout } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Web3Layout title="Solana DApp">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Solana DApp</h1>
        
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Counter Example</h2>
            <p className="mb-4">
              Edit <code className="bg-base-300 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
            </p>
            <div className="card-actions justify-end">
              <button 
                className="btn btn-primary"
                onClick={() => setCount((count) => count + 1)}
              >
                Count is {count}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card 1</h2>
              <p>This is a sample card using DaisyUI components.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card 2</h2>
              <p>This is another sample card.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card 3</h2>
              <p>And one more card for good measure.</p>
            </div>
          </div>
        </div>
      </div>
    </Web3Layout>
  )
}

export default App
