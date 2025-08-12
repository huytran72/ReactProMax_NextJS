import { useEffect, useState } from "react"
import "../../styles/users.css"

interface IUsers {
  email: string
  name: string
  role: string
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg5OGY5MmIwOTdjN2QwMDJhY2UxYzY5IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTQ4NTg2MzIsImV4cCI6MTg0MTI1ODYzMn0.qOvU4AwFEL3NgFeVYV6jSLRFx8mPPBY7pk4D-pvIxwA"

    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    const d = await res.json()
    console.log("Check data:", d.data.result)
    setListUsers(d.data.result)
  }
  console.log("List users:", listUsers)

  return (
    <div>
      <h2>Table Users</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item: IUsers, index) => {
            return (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
