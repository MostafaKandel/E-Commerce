import React from 'react'
import { Input,Button } from '@nextui-org/react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const navigator = useNavigate();
  const  initialValues= {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }

  const onSubmit =  () => {
    setErrMsg('');
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
    .then((res) => {
      console.log(res)
      navigator('/login')
    })
    .catch((err) => {
      console.log(err)
      setErrMsg(err.response.data.message)
    }).finally(() => setIsLoading(false));
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must be at least 8 characters, contain at least one letter, one number and one special character'),
    rePassword: yup.string().required().oneOf([yup.ref('password')],'Passwords must match'),
    phone: yup.string().required()
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
          <Input isInvalid={errors.name && touched.name} errorMessage={errors.name} onBlur={handleBlur} onChange={handleChange} value={values.name} name='name' variant="bordered" className='col-span-2' label="Name" type='text' />
          <Input isInvalid={errors.email && touched.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant="bordered" className='col-span-2' label="Email" type='email' /> 
          <Input isInvalid={errors.password && touched.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant="bordered" className='col-span-1' label="Password" type='password' />
          <Input isInvalid={errors.rePassword && touched.rePassword} errorMessage={errors.rePassword} onBlur={handleBlur} onChange={handleChange} value={values.rePassword} name='rePassword' variant="bordered" className='col-span-1' label="rePassword" type='password' />
          <Input isInvalid={errors.phone && touched.phone} errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant="bordered" className='col-span-2' label="Phone" type='tel' />
           <Button isLoading={isLoading} type='submit' className='col-span-2' color='primary'>Register</Button>
           {errMsg && <p className='text-red-500'>{errMsg}</p>}
        </div>
       </form>
     </div>
  );
}