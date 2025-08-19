import { useEffect, useState } from "react"
import InputTodo from "./todo/input.todo"

function App() {
  useEffect(() => {
    // Fetch initial data or perform setup
  }, [])

  const name = "React Vite Starter"
  const age = 3
  const info = {
    gender: "male",
    address: "123 Main St",
  }

  const [listTodo, setListTodo] = useState([
    "todo 1",
    "todo 2",
    "todo 3",
    "todo 4",
    "todo 5",
  ])

  const [count, setCount] = useState(0)

  const handleTest = (name: string) => {
    alert(`Test function called with name: ${name}`)
  }

  return (
    <>
      <div>count = {count}</div>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <div className="parent"></div>
      <InputTodo
        name={name}
        age={age}
        info={info}
        testFunction={handleTest}
        listTodo={listTodo}
        setListTodo={setListTodo}
      />

      <br />
      <ul>
        {listTodo.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    </>
  )
}

export default App
