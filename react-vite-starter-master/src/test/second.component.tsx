const SecondComponent = () => {
  // Group 1
  const myName = "Hedy Lamarr"
  const myAge = 30

  // Group 2
  const info = {
    name: "Hedy Lamarr",
    age: 30,
    occupation: "Actress and Inventor",
  }

  // jsx syntax: html + js
  return (
    <div>
      <h1 style={{ color: "blue" }}>Hello: {JSON.stringify(info)}</h1>
      {/* <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      /> */}
      <ul>
        <li>Invent new traffic lights </li>
        <li>Rehearse a movie scene </li>
        <li>Improve the spectrum technology </li>
      </ul>
    </div>
  )
}
export default SecondComponent
