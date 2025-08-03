import { useState } from "react"

interface IProps {
  age: number
  name: string
  info: {
    gender: string
    address: string
  }
}

const [fullName, setFullName] = useState()

const handleClick = () => {}

const InputTodo = (props: IProps) => {
  return (
    <div>
      <div>age = {props.age}</div>
      <div>name = {props.name}</div>
      <h2>Add a New Todo</h2>
      <input
        type="text"
        placeholder="Add a new todo"
        onChange={(event) => {
          console.log(event.target.value)
        }}
      />
      <button onClick={() => handleClick()}>Save</button>
    </div>
  )
}

export default InputTodo
