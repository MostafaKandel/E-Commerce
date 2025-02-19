import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addProductToCart } from "../../Services/cartServices";
import { addProductToWishList, removeProductToWishList } from "../../Services/WhishList";

export default function Product({product}) {
    
    const [isInWishlist, setIsInWishlist] = useState(false);

    // Function to handle wishlist toggle
    const handleWishlistToggle = async () => {
      if (isInWishlist) {
        await removeProductToWishList(product._id);
      } else {
        await addProductToWishList(product._id);
      }
      setIsInWishlist(!isInWishlist); // Toggle state
    };

    return (
        <div  className="flex flex-col justify-between  mx-auto w-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 cursor-pointer shadow-lg transition duration-300 ease-in-out">
            
          <Link to={"/product/"+product._id}>
          <div className="overflow-hidden">
          <img className="w-full object-contain object-center duration-300  hover:scale-[103%]" src={product.imageCover} alt="Product Image" />
          </div>
    <div className="p-4 pb-0">
<h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-1">{product.title}</h2>
<p className="mb-2 text-base dark:text-gray-300 text-gray-700 line-clamp-3">{product.description}</p>
<div className="flex items-center">
{product.priceAfterDiscount ? (
              <>
                <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                  ${product.priceAfterDiscount}
                </p>
                <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                  ${product.price}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">{Math.floor((product.price - product.priceAfterDiscount) / product.price * 100)}% off</p>
              </>
            ) : (
              <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                ${product.price}
              </p>
            )}


</div>
    </div>
          </Link>
    <div className="m-4">
        <div className="flex items-center justify-between">
        <Button onPress={() => addProductToCart(product._id)} color="success" variant="bordered" className="w-3/5 " endContent={<i className="fas fa-shopping-cart"></i>}>Add to cart</Button>
        {/* <Button
            onPress={handleWishlistToggle}
            color={isInWishlist ? "danger" : "success"}
            className={`w-1/5 ${isInWishlist ? "bg-yellow-400" : "bg-yellow-200"}`}
          >
            <i className={isInWishlist ? "fa-solid fa-star " : "fa-regular fa-star"}></i>
          </Button> */}
          <Button
            onPress={handleWishlistToggle}
            className="w-1/5"
            style={{
              backgroundColor: isInWishlist ? "#facc15" : "white", // Yellow when active
              border: "1px solid gray",
            }}
          >
            <i
              className={`fa-heart ${isInWishlist ? "fa-solid text-white" : "fa-regular text-black"}`} // White heart when active
            ></i>
          </Button>
        </div>
    </div>
    </div>
      )
}