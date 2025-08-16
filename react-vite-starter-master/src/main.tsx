import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UsersPage from "./screens/users.page.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <div>Home Page</div>,
    children: [
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
