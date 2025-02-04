import axios from "axios";
import { useState,  } from "react";
export default function Cartproduct ({product, removeCartProduct,setcart, setNumOfCartItems}) {
    const[isLoading, setIsLoading] = useState(false);
    const[productCount, setProductCount] = useState(product.count);
    async function updateCartProductCount(productId, count) {
        setIsLoading(true);
         
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count}, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            setcart(data.data);
            setNumOfCartItems(data.numOfCartItems);  
            setIsLoading(false);    
          
    }

   
  return (
    <div
    className="flex relative flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
    <div className="w-full md:max-w-[126px]">
        <img src={product.product.imageCover} alt={product.product.title}
            className="mx-auto rounded-xl object-cover"/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="md:col-span-2">
            <div className="flex flex-col max-[500px]:items-center gap-3">
                <h6 className="font-semibold text-base leading-7 text-black">{product.product.title}</h6>
                <h6 className="font-normal text-base leading-7 text-gray-500">{product.product.category.name}</h6>
                <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">${product.price}</h6>
            </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
            <div className="flex items-center h-full">
                <button disabled={product.count == 1 }
                onClick={()=>updateCartProductCount(product.product._id, product.count - 1)}
                    className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-blue-600 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300 disabled:cursor-not-allowed">
                     -
                </button>
                <input type="text"
                onBlur={ product.count != productCount &&  updateCartProductCount(product.product._id, productCount)}
                onChange={(e)=>setProductCount(e.target.value)}
                value={productCount}
                    className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                    placeholder="1"/>
                <button disabled={isLoading}
                 onClick={()=>updateCartProductCount(product.product._id, product.count + 1)}
                    className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-blue-600 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                    {isLoading ? <i className="fa fa-spinner fa-spin"></i> : '+'}
                </button>
            </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">${product.price * product.count}</p>
        </div>
    </div>
    <i onClick={() => removeCartProduct(product.product._id)} className="fas fa-trash text-red-600 absolute top-10 end-2 cursor-pointer"></i>
</div>
  );
}