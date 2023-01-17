// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}: {initialName?: string}) {
  const [name, setName] = React.useState<string>(initialName)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          onChange={handleChange}
          id="name"
          // the ?? '' makes the component a controlled component
          value={name ?? ''}
        />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
