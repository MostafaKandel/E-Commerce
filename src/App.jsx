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

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [ 
      {index: true, element: <Home />},
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path:'categories', element:<Categories/>},
      {path:'brands', element:<Brands/>},
      {path:'cart', element:<Cart/>},
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
