import './App.css'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { Login, Register } from './Components'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: "",
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "register",
          element: <Register/>
        },
       
      ]
    }
  ])
  return (
    <RouterProvider router={router}>
    <Home/>
  </RouterProvider>
  )
}

export default App
