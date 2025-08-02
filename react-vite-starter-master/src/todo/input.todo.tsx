interface IProps {
  age: number
  name: string
  info: {
    gender: string
    address: string
  }
}

const InputTodo = (props: IProps) => {
  return (
    <div>
      <div>age = {props.age}</div>
      <h2>Add a New Todo</h2>
      <input type="text" placeholder="Add a new todo" />
      <button>Add Todo</button>
    </div>
  )
}

export default InputTodo
