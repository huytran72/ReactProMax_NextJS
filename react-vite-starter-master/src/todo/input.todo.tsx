interface IProps {
  age: number
  name: string
  info: {
    gender: string
    address: string
  }
}

let count = 1

const handleClick = () => {
  count += 1
  console.log("Count updated:", count)
}

const InputTodo = (props: IProps) => {
  return (
    <div>
      <div>new count = {count}</div>
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
