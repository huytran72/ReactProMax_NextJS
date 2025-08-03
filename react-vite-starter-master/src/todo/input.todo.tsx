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
  const [fullName, setFullName] = useState("")

  const handleClick = () => {}

  return (
    <div>
      <div>age = {props.age}</div>
      <div>name = {props.name}</div>
      <h2>Add a New Todo</h2>
      <input
        type="text"
        placeholder="Add a new todo"
        onChange={(event) => {
          setFullName(event.target.value)
        }}
      />
      <div>My todo is {fullName}</div>
      <button onClick={() => handleClick()}>Save</button>
    </div>
  )
}

export default InputTodo
