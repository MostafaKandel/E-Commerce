import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Brands() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (res) => res.data.data,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex justify-center items-center">
      <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {paginatedData.map((item) => (
              <div key={item._id} className="relative group flex justify-center items-center h-full w-full">
                <img className="object-cover h-full w-full rounded-lg shadow-lg" src={item.image} alt={item.name} />
                <Link to={`/brands/${item._id}`}>
                  <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out group-hover:bg-gray-800 group-hover:text-white">
                    {item.name}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

