import React, { useState, useContext, useEffect } from "react";
import { authContext } from "../../Contexts/AuthContext";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
 import {Link} from 'react-router-dom'

export default function Profile() {
  const { userId } = useContext(authContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/users/${userId}`
        );
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  console.log(userData);

  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold text-blue-500">Profile</h2>
        <Link to="/edit-profile"  className="text-blue-500 hover:text-blue-700"> EDIT</Link>
         
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-gray-600 text-sm">Name</p>
          <p className="text-lg font-medium">{userData.name}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Email</p>
          <p className="text-lg font-medium">{userData.email}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Phone</p>
          <p className="text-lg font-medium">{userData.phone}</p>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
           
          <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
        </button>
        <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
           
          <Link to="/orders">Orders</Link>
        </button>
      </div>
    </div>
    
  );
}
