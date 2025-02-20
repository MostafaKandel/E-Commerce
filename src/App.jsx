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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CategoryProducts from './Pages/CategriesProducts/CategoryProducts'
import BrandProducts from './Pages/BrandProducts/BrandProducts'
import WhishList from './Pages/WhishList/WhishList'
import Profile from './Pages/Profile/Profile'
import ProfileEdit from './Pages/ProfileEdit/ProfileEdit'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import OrderDetails from './Pages/OrderDetails/OrderDetails'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import Resetcode from './Pages/ResetCode/Resetcode'
import ResetPassword from './Pages/ResetPassword/ResetPassword'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [ 
      {index: true, element: <Home />  },
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path:'profile',element:<ProtectedAuthRoute><Profile/></ProtectedAuthRoute>},
      {path:'edit-profile',element:<ProtectedAuthRoute><ProfileEdit/></ProtectedAuthRoute>},
      {path:'forget-password',element: <ForgetPassword/> },
      {path:'reset-code',element: <Resetcode/> },
      {path:'resetPassword',element: <ResetPassword/> },
      {path:'categories', element: <Categories/>  },
      {path:'brands', element: <Brands/>  },
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute> },
      {path:'cart/:id', element:<ProtectedRoute><Payment/></ProtectedRoute> },
      {path:'product/:id',element: <ProductDetails></ProductDetails> },
      {path:'categories/:id',element:  <CategoryProducts></CategoryProducts> },
      {path:'orders',element:  <ProtectedRoute><Orders/></ProtectedRoute> },
      {path:'allorders',element:  <ProtectedRoute><Orders/></ProtectedRoute> },
      {path:'orders/:id',element:  <ProtectedRoute><OrderDetails/></ProtectedRoute> },
      {path:'brands/:id',element:  <BrandProducts></BrandProducts> },
      {path:'wishlist', element:<ProtectedRoute><WhishList/></ProtectedRoute> },
      {path:'*', element:<Notfound/>},
    ]
  }
])

function App() {
  return  (
    <>
    <QueryClientProvider client={new QueryClient()}>
    <AuthContextProvider>
    <NextUIProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer/>
    </NextUIProvider>
    </AuthContextProvider>
       </QueryClientProvider>
    </>
  )
}

export default App
