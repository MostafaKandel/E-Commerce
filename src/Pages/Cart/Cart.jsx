import axios from "axios";
import Cartproduct from "../../components/CartProduct/Cartproduct";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  async function getLoggedUserCart() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      });

      setCartData(data.data);
      setNumOfCartItems(data.numOfCartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
    setIsLoading(false);
  }

  async function removeCartProduct(productId) {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token: localStorage.getItem("token") },
      });

      setCartData(data.data);
      setNumOfCartItems(data.numOfCartItems);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }

  async function clearCart() {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      });

      setCartData(null);
      setNumOfCartItems(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  if (isLoading) return <LoadingScreen />;
  if (numOfCartItems === 0) return <h1 className="text-center text-3xl font-bold"> No Products In Your Cart</h1>;

  return (
    <section className="relative z-10">
      <div className="w-full max-w-7xl px-4 mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8 pt-14 pb-8">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-bold text-3xl">Shopping Cart</h2>
              <h2 className="font-bold text-xl text-gray-600">{numOfCartItems} Items</h2>
            </div>

            {cartData?.products.map((product) => (
              <Cartproduct key={product.product._id} product={product} removeCartProduct={removeCartProduct} setCart={setCartData} setNumOfCartItems={setNumOfCartItems} />
            ))}

            <div className="flex items-center justify-between mt-8">
              <button onClick={clearCart} className="px-5 py-3 text-red-600 font-semibold text-lg hover:text-red-700">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-span-12 xl:col-span-4 bg-gray-50 py-24 px-6">
            <h2 className="font-bold text-3xl pb-8 border-b border-gray-300">Order Summary</h2>
            <div className="mt-8">
              <div className="flex justify-between pb-6">
                <p className="text-lg">{numOfCartItems} Items</p>
                <p className="font-medium text-lg">${cartData?.totalCartPrice}</p>
              </div>
              <button className="w-full bg-indigo-600 py-3 text-white font-semibold text-lg rounded-xl hover:bg-indigo-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
