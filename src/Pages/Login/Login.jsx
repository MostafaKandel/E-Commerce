
import React from 'react'
import { Input,Button } from '@nextui-org/react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigator = useNavigate();
  const  initialValues= {
    email: '',
    password: '',
  }

  const onSubmit = async () => {
    setIsLoading(true);
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values);
    setIsLoading(false);
    navigator('/')
    console.log('login',data);
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
          
          <Input onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant="bordered" className='col-span-2' label="Email" type='email' />
          {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
          <Input onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant="bordered" className='col-span-2' label="Password" type='password' />
          {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
           
           <Button isLoading={isLoading} type='submit' className='col-span-2' color='primary'>Login</Button>
        </div>
       </form>
     </div>
  );
}