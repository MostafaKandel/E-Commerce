import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product/Product";



export default function WhishList() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        getLoggedUserwishlist();
      },[])
    
      async function getLoggedUserwishlist(){
    
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
          headers: {
            token: localStorage.getItem('token')
          }
      });
      setWishlist(data.data);
      }
      console.log(wishlist);
  return (
    <div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {
              wishlist.map((product,index)=>{
               return <Product key={index} product={product} />
              })
            }
          </div>
        </div>
  );
}