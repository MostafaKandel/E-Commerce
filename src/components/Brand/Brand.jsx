import { Link } from "react-router-dom";


export default function Brand({brand}) {
  return (
    <div className="relative group flex justify-center items-center h-full w-full">
                <img className="object-center object-cover h-full w-full" src={brand.image} alt={brand.name} />
                <Link to={`/brands/${brand._id}`}>
                <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  {brand.name}
                </button>
                </Link>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
              </div>
  );
}