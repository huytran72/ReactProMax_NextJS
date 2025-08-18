import { useEffect, useState } from "react"
// import "../../styles/users.css"
import { Table, Button, Modal, Input, notification } from "antd"
import type { TableProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"
// import { get } from "http"

interface IUsers {
  email: string
  name: string
  role: string
  _id: string
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([])

  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg5Y2YwMzg5NWFhMWYwOWVjYThiODEzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTUxMTU2MzAsImV4cCI6MTg0MTUxNTYzMH0.Ch30O1_Sv6jOlvf2pH67NdzPqGSGJfIQdn8YpncV-s0"

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    const d = await res.json()
    setListUsers(d.data.result)
  }

  const columns: TableProps<IUsers>["columns"] = [
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Table User</h2>
        <div>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={listUsers} rowKey="_id" />

      <CreateUserModal access_token={access_token} />
    </div>
  )
}

export default UsersTable
