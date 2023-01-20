// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js
// original and up to extra

import * as React from 'react'

const useLocalStorageState = ({
  valueToStore,
}: {
  valueToStore: string
}): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const parsed = JSON.parse(valueToStore)

  const key = Object.keys(parsed)[0]
  const value = parsed[key]

  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? value,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState({
    valueToStore: JSON.stringify({name: initialName}),
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="John" />
}

export default App

// continue in extra 4
