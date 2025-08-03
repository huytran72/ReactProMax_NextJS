import { useState } from "react"

interface IProps {
  age: number
  name: string
  info: {
    gender: string
    address: string
  }
}

const InputTodo = (props: IProps) => {
  const [todo, setTodo] = useState("")

  const handleClick = () => {
    console.log("Button clicked", todo)
  }

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h2>Add a New Todo</h2>
      <input
        type="text"
        placeholder="Add a new todo"
        onChange={(event) => {
          setTodo(event.target.value)
        }}
      />
      <div>My todo is {todo}</div>
      <button onClick={() => handleClick()}>Save</button>
    </div>
  )
}

export default InputTodo
