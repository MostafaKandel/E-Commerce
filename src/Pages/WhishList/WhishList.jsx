import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { removeProductToWishList } from "../../Services/WhishList";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  async function getLoggedUserWishlist() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setWishlist(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
    setIsLoading(false);
  }

  async function handleRemoveFromWishlist(productId) {
    try {
      await removeProductToWishList(productId);
      setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (wishlist.length === 0) {
    return <h1 className="text-3xl font-bold mx-auto">Your Wishlist is Empty</h1>;
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {wishlist.map((product, index) => (
          <Product
            key={index}
            product={product}
            isWishListPage={true}
            handleRemoveFromWishList={() => handleRemoveFromWishlist(product._id)}
          />
        ))}
      </div>
    </div>
  );
}
