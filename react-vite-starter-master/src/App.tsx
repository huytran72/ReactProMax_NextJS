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

      <div>
        <span>Todo 1</span>
        <br />
      </div>
    </>
  )
}

export default App
