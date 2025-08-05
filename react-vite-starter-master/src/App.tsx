import InputTodo from "./todo/input.todo"

function App() {
  const name = "React Vite Starter"
  const age = 3
  const info = {
    gender: "male",
    address: "123 Main St",
  }

  const todos = ["todo 1", "todo 2", "todo 3", "todo 4", "todo 5"]

  const handleTest = () => {
    alert("Test function called")
  }

  return (
    <>
      <div className="parent"></div>
      <InputTodo name={name} age={age} info={info} />

      {/* <ul>
        {todos.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul> */}
    </>
  )
}

export default App
