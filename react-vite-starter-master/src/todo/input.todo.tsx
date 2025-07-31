const InputTodo = (props) => {
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
