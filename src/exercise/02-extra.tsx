// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js
// extra 4 simplified
//

import * as React from 'react'

const useLocalStorageState = (
  key: string,
  value: string | (() => string),
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, setState] = React.useState<string>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)

    if (valueInLocalStorage) {
      try {
        return JSON.parse(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
      // return JSON.parse(valueInLocalStorage)
    }

    return typeof value === 'function' ? value() : value
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [key, setKey] = React.useState('name')
  const [name, setName] = useLocalStorageState(key, initialName)

  function handleClick() {
    if (key === 'name') {
      setKey('firstName')
    } else if (key === 'firstName') {
      setKey('Name')
    } else {
      setKey('name')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }
  return (
    <div>
      <button type="button" onClick={handleClick}>
        Change key!
      </button>
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
