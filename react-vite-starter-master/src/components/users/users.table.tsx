import { useEffect, useState } from "react"
// import "../../styles/users.css"
import { Table, Button, Modal, Input } from "antd"
import type { TableProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"

interface IUsers {
  email: string
  name: string
  role: string
  _id: string
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [role, setRole] = useState("")

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

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

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
          <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
            Add new
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={listUsers} rowKey="_id" />

      {/* <Button type="primary">Open Modal</Button> */}
      <Modal
        title="Add New User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <div>
          <label>Name:</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <Input />
        </div>
        <div>
          <label>Age:</label>
          <Input />
        </div>
        <div>
          <label>Gender:</label>
          <Input />
        </div>
        <div>
          <label>Address:</label>
          <Input />
        </div>
        <div>
          <label>Role:</label>
          <Input />
        </div>
      </Modal>
    </div>
  )
}

export default UsersTable
