import React from 'react'
import { Input,Button } from '@nextui-org/react';

export default function Register() {
  return (
     <div className="my-10">
        <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
          <Input variant="bordered" className='col-span-2' label="Name" type='text' />
          <Input variant="bordered" className='col-span-2' label="Email" type='email' />
          <Input variant="bordered" className='col-span-1' label="Password" type='password' />
          <Input variant="bordered" className='col-span-1' label="rePassword" type='password' />
          <Input variant="bordered" className='col-span-2' label="Phone" type='tel' />
           <Button className='col-span-2' color='primary'>Register</Button>
        </div>
     </div>
  );
}