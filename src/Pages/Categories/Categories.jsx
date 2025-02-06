import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((response) =>{
         setCategories(response.data.data)
         setIsLoading(false);
      }
    )
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
    if(isLoading){
          return <LoadingScreen />;
        }

  return (
    <div className="flex justify-center items-center">
      <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {categories.map(category => (
              <div key={category._id} className="relative group flex justify-center items-center h-full w-full">
                <img className="object-center object-cover h-full w-full" src={category.image} alt={category.name} />
                <Link to={`/categories/${category._id}`}>
                <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  {category.name}
                </button>
                </Link>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}