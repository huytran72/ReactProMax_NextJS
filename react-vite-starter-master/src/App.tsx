import InputTodo from "./todo/input.todo"

function App() {
  const name = "React Vite Starter"
  const age = 3
  const info = {
    gender: "male",
    address: "123 Main St",
  }

  return (
    <>
      <div className="parent"></div>
      <InputTodo name={name} age={age} info={info} />
      <InputTodo name={name} age={age} info={info} />

      <ul>
        <li>Todo 1</li>
        <li>Todo 2</li>
        <li>Todo 3</li>
        <li>Todo 4</li>
        <li>Todo 5</li>
      </ul>
    </>
  )
}

export default App
