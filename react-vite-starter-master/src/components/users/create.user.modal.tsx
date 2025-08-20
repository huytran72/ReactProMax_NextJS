import React, { useState } from "react"
import { Modal, Input, notification, Button, Form, Checkbox } from "antd"
import type { FormProps } from "antd"

interface IProps {
  access_token: string
  getData: () => void
  isCreateModalOpen: boolean
  setIsCreateModalOpen: (v: boolean) => void
}

const CreateUserModal = (props: IProps) => {
  const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } =
    props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [role, setRole] = useState("")

  const handleOk = async () => {
    const data = {
      email,
      name,
      password,
      age,
      gender,
      address,
      role,
    }
    console.log("Data to submit:", data)
    // setIsCreateModalOpen(false)

    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
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
      setIsCreateModalOpen(false)
    } else {
      //false
      notification.error({
        message: "Errors",
        description: JSON.stringify(d.message),
      })
    }
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    setName("")
    setEmail("")
    setPassword("")
    setAge("")
    setGender("")
    setAddress("")
    setRole("")
  }

  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values)
  }

  return (
    <Modal
      title="Add New User"
      open={isCreateModalOpen}
      onOk={handleOk}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical">
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
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
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
export default CreateUserModal
