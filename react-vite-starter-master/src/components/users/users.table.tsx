import { useEffect, useState } from "react"
import "../../styles/users.css"

const UsersTable = () => {
  useEffect(() => {
    console.log("Check useEffect")
    getData()
  }, [])

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "hoidanit@gmail.com",
        password: "123456",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log("Data fetched:", data)
  }

  return (
    <div>
      <h2>HTML Table</h2>

      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  )
}

export default UsersTable
