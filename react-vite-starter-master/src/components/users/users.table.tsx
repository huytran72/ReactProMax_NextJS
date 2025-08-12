import { useEffect, useState } from "react"
import "../../styles/users.css"

const UsersTable = () => {
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "admin@gmail.com",
        password: "123456",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log("Data fetched:", data)

    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg5OGY5MmIwOTdjN2QwMDJhY2UxYzY5IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTQ4NTg2MzIsImV4cCI6MTg0MTI1ODYzMn0.qOvU4AwFEL3NgFeVYV6jSLRFx8mPPBY7pk4D-pvIxwA"

    const res1 = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    const data1 = await res1.json()
    console.log("Check data1:", data1)
  }

  return (
    <div>
      <h2>Table Users</h2>

      <table>
        <tbody>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
