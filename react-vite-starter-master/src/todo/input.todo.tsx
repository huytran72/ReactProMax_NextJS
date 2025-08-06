import { useState } from "react"

interface IProps {
  age: number
  name: string
  info: {
    gender: string
    address: string
  }
  testFunction: (value: string) => void
  listTodo: string[]
  setListTodo: (list: string[]) => void
}

const InputTodo = (props: IProps) => {
  const [todo, setTodo] = useState("")

  const { testFunction, listTodo, setListTodo } = props

  const handleClick = () => {
    // testFunction(todo) // Call the test function passed from the parent component
    if (!todo) {
      alert("Please enter a todo item")
      return
    }
    setListTodo([...listTodo, todo])
    setTodo("") // Clear the input field after adding the todo
  }

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h2>Add a New Todo</h2>
      <input
        value={todo}
        type="text"
        placeholder="Add a new todo"
        onChange={(event) => {
          setTodo(event.target.value)
        }}
      />
      <button onClick={() => handleClick()}>Save</button>
      <br />
      <ul>
        {listTodo.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    </div>
  )
}

export default InputTodo
