import { useEffect, useState } from "react"
// import "../../styles/users.css"
import { Table, Button, notification, Popconfirm } from "antd"
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

  const access_token = localStorage.getItem("access_token") as string

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    )
    const d = await res.json()
    if (!d.data) {
      notification.error({
        message: "Error",
        description: JSON.stringify(d.message),
      })
    }
    setListUsers(d.data.result)
    setMeta({
      current: d.data.meta.current,
      pageSize: d.data.meta.pageSize,
      pages: d.data.meta.pages,
      total: d.data.meta.total,
    })
  }

  const confirm = async (user: IUsers) => {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    const d = await res.json()
    if (d.data) {
      notification.success({
        message: "Success",
        description: JSON.stringify(d.message),
      })
      await getData()
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(d.message),
      })
    }
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (value, record) => {
        return (
          <div>
            <button
              onClick={() => {
                setDataUpdate(record)
                setIsUpdateModalOpen(true)
              }}
            >
              Edit
            </button>

            <Popconfirm
              title="Delete the user"
              description={`Are you sure to delete this user? Name = ${record.name}?`}
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginLeft: 20 }} danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  const handleOnchange = async (page: number, pageSize: number) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    )
    const d = await res.json()
    if (!d.data) {
      notification.error({
        message: "Error",
        description: JSON.stringify(d.message),
      })
    }
    setListUsers(d.data.result)
    setMeta({
      current: d.data.meta.current,
      pageSize: d.data.meta.pageSize,
      pages: d.data.meta.pages,
      total: d.data.meta.total,
    })
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
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={listUsers}
        rowKey="_id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => handleOnchange(page, pageSize),
          showSizeChanger: true,
        }}
      />

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
        setDataUpdate={setDataUpdate}
      />
    </div>
  )
}

export default UsersTable
