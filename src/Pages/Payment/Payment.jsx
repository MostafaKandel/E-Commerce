import { useParams } from "react-router-dom";
import React from 'react'
import { Input,Button } from '@nextui-org/react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast,Bounce } from "react-toastify";

export default function Payment() {
    const {id} = useParams();
    const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const navigator = useNavigate();
  const  initialValues= {
    details: '',
    city: '',
    phone: ''
  }

  const onSubmit =  () => {
    setErrMsg('');
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
    {shippingAddress:values},
    {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then((res) => {
      console.log('res',res)
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      navigator('/orders')
     
    })
    .catch((err) => {
      console.log(err)
      setErrMsg(err.response.data.message)
    }).finally(() => setIsLoading(false));
  }

  

  const validationSchema = yup.object({
    details: yup.string().optional(),
    city: yup.string().required(), 
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
              <Input isInvalid={errors.details && touched.details} errorMessage={errors.details} onBlur={handleBlur} onChange={handleChange} value={values.details} name='details' variant="bordered" className='col-span-2' label="Details" type='text' />
              <Input isInvalid={errors.city && touched.city} errorMessage={errors.city} onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' variant="bordered" className='col-span-2' label="City" type='text' /> 
              <Input isInvalid={errors.phone && touched.phone} errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant="bordered" className='col-span-2' label="Phone" type='tel' />
               <Button isLoading={isLoading} type='submit' className='col-span-2' color='primary'>Place Order</Button>
               {errMsg && <p className='text-red-500'>{errMsg}</p>}
            </div>
           </form>
         </div>
  );
} 