import axios from "axios";
import { useState } from "react";

export default function Cartproduct({ product, removeCartProduct, setCart, setNumOfCartItems }) {
  const [isLoading, setIsLoading] = useState(false);
  const [productCount, setProductCount] = useState(product.count);

  async function updateCartProductCount(productId, count) {
    if (count < 1) return; 

    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      setCart(data.data);
      setNumOfCartItems(data.numOfCartItems);
      setProductCount(count);
    } catch (error) {
      console.error("Error updating product count:", error);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 py-6 border-b border-gray-200">
      <img src={product.product.imageCover} alt={product.product.title} className="w-24 h-24 object-cover rounded-xl" />
      <div className="w-full grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-2">
          <h6 className="font-semibold text-base">{product.product.title}</h6>
          <h6 className="text-gray-500">{product.product.category.name}</h6>
          <h6 className="font-medium text-gray-600">${product.price}</h6>
        </div>

        <div className="flex items-center justify-center">
          <button
            disabled={productCount <= 1 || isLoading}
            onClick={() => updateCartProductCount(product.product._id, productCount - 1)}
            className="px-3 py-1 border border-gray-200 rounded-l-md bg-gray-100 hover:bg-gray-200"
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "-"}
          </button>
          <input
            type="number"
            className="w-12 text-center border-t border-b border-gray-200"
            value={productCount}
            onChange={(e) => setProductCount(parseInt(e.target.value) || 1)}
            onBlur={() => updateCartProductCount(product.product._id, productCount)}
          />
          <button
            disabled={isLoading}
            onClick={() => updateCartProductCount(product.product._id, productCount + 1)}
            className="px-3 py-1 border border-gray-200 rounded-r-md bg-gray-100 hover:bg-gray-200"
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "+"}
          </button>
        </div>

        <div className="text-center">
          <p className="font-bold text-lg text-gray-600">${product.price * productCount}</p>
        </div>
      </div>
      <i onClick={() => removeCartProduct(product.product._id)} className="fas fa-trash text-red-600 cursor-pointer"></i>
    </div>
  );
}
