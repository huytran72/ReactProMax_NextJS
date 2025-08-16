import { useEffect, useState } from "react"
import "../../styles/users.css"
import { Table } from "antd"
import type { TableProps } from "antd"

interface IUsers {
  email: string
  name: string
  role: string
  _id: string
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg5Y2YwMzg5NWFhMWYwOWVjYThiODEzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTUxMTU2MzAsImV4cCI6MTg0MTUxNTYzMH0.Ch30O1_Sv6jOlvf2pH67NdzPqGSGJfIQdn8YpncV-s0"

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

  const columns: TableProps["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ]

  return (
    <div>
      <h2>Table User</h2>
      <Table columns={columns} dataSource={listUsers} rowKey="_id" />

      {/* <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item: IUsers) => {
            return (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </div>
  )
}

export default UsersTable
