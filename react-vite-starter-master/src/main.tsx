import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import UsersPage from "./screens/users.page.tsx"
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"

const items: MenuItem[] = [
  {
    label: "Navigation One",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "Navigation Two",
    key: "app",
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
]

const LayoutAdmin = () => {
  return (
    <div>
      <header>HEADER</header>
      <Outlet />
      <footer>FOOTER</footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },

  {
    path: "/tracks",
    element: <div>Tracks Page</div>,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
