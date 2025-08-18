import { useEffect, useState } from "react"
// import "../../styles/users.css"
import { Table, Button } from "antd"
import type { TableProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import CreateUserModal from "./create.user.modal"
import UpdateUserModal from "./update.user.modal"
// import { get } from "http"

export interface IUsers {
  email: string
  name: string
  role: string
  _id: string
  age: string
  gender: string
  address: string
  password: string
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const [dataUpdate, setDataUpdate] = useState<IUsers | null>(null)

  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg5Y2YwMzg5NWFhMWYwOWVjYThiODEzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTUxMTU2MzAsImV4cCI6MTg0MTUxNTYzMH0.Ch30O1_Sv6jOlvf2pH67NdzPqGSGJfIQdn8YpncV-s0"

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (value, record) => (
        <Button
          onClick={() => {
            console.log("Check record: ", record)
            setDataUpdate(record)
            setIsUpdateModalOpen(true)
          }}
        >
          Edit
        </Button>
      ),
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

      <CreateUserModal
        access_token={access_token}
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UpdateUserModal
        access_token={access_token}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        // setDataUpdate={setDataUpdate}
      />
    </div>
  )
}

export default UsersTable
