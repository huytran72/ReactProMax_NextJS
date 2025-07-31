import InputTodo from "./todo/input.todo"

function App() {
  const name = "React Vite Starter"
  const age = 3

  return (
    <>
      <div className="app"></div>
      <InputTodo name={name} age={age} />
    </>
  )
}

export default App
