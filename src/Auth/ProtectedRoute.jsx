 
import React from 'react'
import { Navigate } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import { useContext } from 'react';
import { authContext } from '../Contexts/AuthContext';

export default function ProtectedRoute({children}) {
  const {isLoggedIn} = useContext(authContext);
  return (
    <div>
      {isLoggedIn ? children :<Login/>}
    </div>
  );
}