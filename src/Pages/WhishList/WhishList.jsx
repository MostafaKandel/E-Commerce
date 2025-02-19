import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";



export default function WhishList() {
    const [wishlist, setWishlist] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLoggedUserwishlist();
      },[])
    
      async function getLoggedUserwishlist(){
        setIsLoading(true);
    
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
          headers: {
            token: localStorage.getItem('token')
          }
      });
      setWishlist(data.data);
      setIsLoading(false);
      }
     
      
      if(isLoading){
        return <LoadingScreen />
      }
      if(wishlist.length === 0){
        return (
          
                <h1 className="text-3xl font-bold  mx-auto">Your Wishlist is Empty</h1>)}
                

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