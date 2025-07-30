const SecondComponent = () => {
  const myName = "Hedy Lamarr"
  const myAge = 30

  // jsx syntax: html + js
  return (
    <div>
      <h1>
        Hello: {myName}, age: {myAge}
      </h1>
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
