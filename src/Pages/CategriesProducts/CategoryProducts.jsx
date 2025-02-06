
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function CategoryProducts () {
    let{id}=useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getRelatedProducts(id){
        setIsLoading(true);
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
        setProducts(data.data);
        setIsLoading(false);
        console.log(data.data);
    }
    useEffect(() => {
        getRelatedProducts(id);
    }, [id])

      if(isLoading){
        return <LoadingScreen />;
      }
    
  return (
  <div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {
            products.map((product,index)=>{
             return <Product key={index} product={product} />
            })
          }
        </div>
      </div>
  );
}