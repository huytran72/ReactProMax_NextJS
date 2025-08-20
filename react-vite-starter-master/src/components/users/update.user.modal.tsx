import React, { useState, useEffect } from "react"
import { Modal, Input, notification, Form, Checkbox, Button } from "antd"
import { IUsers } from "./users.table"
import type { FormProps } from "antd"

interface IProps {
  access_token: string
  getData: () => void
  isUpdateModalOpen: boolean
  setIsUpdateModalOpen: (v: boolean) => void
  dataUpdate: IUsers | null
  setDataUpdate: any
}

const UpdateUserModal = (props: IProps) => {
  const {
    access_token,
    getData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    if (dataUpdate) {
      setName(dataUpdate.name)
      setEmail(dataUpdate.email)
      setPassword(dataUpdate.password)
      setAge(dataUpdate.age)
      setGender(dataUpdate.gender)
      setAddress(dataUpdate.address)
      setRole(dataUpdate.role)
    }
  }, [dataUpdate])

  const handleOk = async () => {
    if (dataUpdate) {
      const data = {
        _id: dataUpdate._id,
        email,
        name,
        age,
        gender,
        address,
        role,
      }

      const res = await fetch("http://localhost:8000/api/v1/users", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      })
      const d = await res.json()
      if (d.data) {
        //sucess
        await getData()
        notification.success({
          message: "Success",
          description: "User added successfully",
        })
        handleCloseCreateModal()
      } else {
        //false
        notification.error({
          message: "Errors",
          description: JSON.stringify(d.message),
        })
      }
    }
  }

  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values)
  }

  const handleCloseCreateModal = () => {
    setIsUpdateModalOpen(false)
    setDataUpdate(null)
    setName("")
    setEmail("")
    setPassword("")
    setAge("")
    setGender("")
    setAddress("")
    setRole("")
  }

  return (
    <Modal
      title="Update A User"
      open={isUpdateModalOpen}
      onOk={handleOk}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <div>
        <label>Name:</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <Input
          disabled={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <Input value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label>Gender:</label>
        <Input value={gender} onChange={(e) => setGender(e.target.value)} />
      </div>
      <div>
        <label>Address:</label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <Input value={role} onChange={(e) => setRole(e.target.value)} />
      </div> */}
    </Modal>
  )
}
export default UpdateUserModal
