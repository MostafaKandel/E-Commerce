
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Brand from "../../components/Brand/Brand";
 


export default function Brands () {

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const {data} = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select:(res)=> res.data.data
  })
  

  return (
    <div className="flex justify-center items-center">
      <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {data?.map(item => (
              <Brand key={item._id} brand={item}></Brand>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}