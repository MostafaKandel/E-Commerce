
import React from 'react'
import { Input,Button } from '@nextui-org/react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../Contexts/AuthContext';
import {Link} from 'react-router-dom'

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const {setIsLoggedIn}= useContext(authContext);
  const navigator = useNavigate();
  const  initialValues= {
    email: '',
    password: '',
  }

  const onSubmit =  () => {
    setErrMsg('');
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then((res) => {
      console.log('login',res);
      localStorage.setItem('token',res.data.token)
      setIsLoggedIn(true)
      navigator(location.pathname == '/login' ? '/' : location.pathname)
    }).catch((err) => {
      console.log(err)
      setErrMsg(err.response.data.message)
    }).finally(() => setIsLoading(false));
  }

  const validationSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must be at least 8 characters, contain at least one letter, one number and one special character'),
  })
   

  const {handleSubmit,values,handleChange,errors,handleBlur,touched}= useFormik({
    initialValues,
    onSubmit,
    validationSchema,
          
  })

  return (
     <div className="my-10">
       <form onSubmit={handleSubmit}>
       <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
          <Input isInvalid={errors.email && touched.email} erroerMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant="bordered" className='col-span-2' label="Email" type='email' />
          <Input isInvalid={errors.password && touched.password} erroerMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant="bordered" className='col-span-2' label="Password" type='password' />
           <Link to='/forget-password' className='text-blue-600 underline'> Forget Password?</Link>
           <Button isLoading={isLoading} type='submit' className='col-span-2' color='primary'>Login</Button>
           {errMsg && <p className='text-red-500'>{errMsg}</p>}
        </div>
       </form>
     </div>
  );
}