import React, { useState, useEffect } from "react"
import { Modal, Input, notification, Form, InputNumber, Select } from "antd"
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

  const [form] = Form.useForm()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        email: dataUpdate.email,
        name: dataUpdate.name,
        age: dataUpdate.age,
        gender: dataUpdate.gender,
        address: dataUpdate.address,
        role: dataUpdate.role,
      })
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

  const handleCloseCreateModal = () => {
    setIsUpdateModalOpen(false)
    form.resetFields()
  }

  const onFinish = async (values: FormProps["onFinish"]) => {
    console.log("Success:", values)
    const { email, name, password, age, gender, address, role } = values
    const data = {
      email,
      name,
      password,
      age,
      gender,
      address,
      role,
    }
    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  const { Option } = Select

  return (
    <Modal
      title="Update A User"
      open={isUpdateModalOpen}
      onOk={handleOk}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          style={{ marginBottom: 3 }}
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 3 }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 3 }}
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password disabled={dataUpdate ? true : false} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 3 }}
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 3 }}
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 3 }}
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please input your role!" }]}
        >
          <Select
            placeholder="Select a role"
            // onChange={onRoleChange}
            allowClear
          >
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default UpdateUserModal
