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
      .then((response) => {
        setCategories(response.data.data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {categories.map(category => (
              <div key={category._id} className="relative group flex justify-center items-center h-full w-full">
                <img className="object-cover h-full w-full" src={category.image} alt={category.name} />
                
                {/* Button inside Link, Centered on the Image */}
                <Link to={`/categories/${category._id}`}>
                  <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-base font-medium py-3 w-36 bg-white text-gray-800 dark:bg-gray-800 dark:text-white transition duration-300 ease-in-out group-hover:bg-opacity-80">
                    {category.name}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
