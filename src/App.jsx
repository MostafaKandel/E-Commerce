import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Pages/Register/Register' 
import Home from './Pages/Home/Home'
import Layout from './Layouts/Layout/Layout'  
import { NextUIProvider } from '@nextui-org/react'
import Login from './Pages/Login/Login'
import Categories from './Pages/Categories/Categories'
import Brands from './Pages/Brands/Brands'
import Cart from './Pages/Cart/Cart'
import Notfound from './Pages/Notfound/Notfound'
import ProtectedRoute from './Auth/ProtectedRoute/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [ 
      {index: true, element:<ProtectedRoute><Home /></ProtectedRoute> },
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute> },
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute> },
      {path:'*', element:<Notfound/>},


    ]
  }
])

function App() {
  return  (
    <>
    <NextUIProvider>
    <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
       
    </>
  )
}

export default App
