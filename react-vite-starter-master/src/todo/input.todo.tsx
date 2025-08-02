interface IProps {
  age: number
  name: string
  info: {
    gender: string
    address: string
  }
}

const handleClick = () => {
  alert("Todo saved!")
}

const InputTodo = (props: IProps) => {
  return (
    <div>
      <div>age = {props.age}</div>
      <div>name = {props.name}</div>
      <h2>Add a New Todo</h2>
      <input type="text" placeholder="Add a new todo" onChange={() => {}} />
      <button onClick={() => handleClick()}>Save</button>
    </div>
  )
}

export default InputTodo
