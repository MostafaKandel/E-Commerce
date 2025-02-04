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
import ProtectedRoute from './Auth/ProtectedRoute'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedAuthRoute from './Auth/ProtectedAuthRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [ 
      {index: true, element:<ProtectedRoute><Home /></ProtectedRoute> },
      {path: 'login', element:<ProtectedAuthRoute> <Login /></ProtectedAuthRoute>},
      {path: 'register', element:<ProtectedAuthRoute> <Register /></ProtectedAuthRoute>},
      {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute> },
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute> },
      {path:'product/:id',element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path:'*', element:<Notfound/>},


    ]
  }
])

function App() {
  return  (
    <>
    <AuthContextProvider>
    <NextUIProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer/>
    </NextUIProvider>
    </AuthContextProvider>
       
    </>
  )
}

export default App
