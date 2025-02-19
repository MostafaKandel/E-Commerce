import axios from "axios";
import { toast,Bounce } from "react-toastify";
 

export async function addProductToWishList(productId) {
    const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},
        {
            headers:{
                token: localStorage.getItem('token')
            }
        }
    )
    console.log(data);
    toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    
}

export async function removeProductToWishList(productId) {
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
            token: localStorage.getItem('token')
        },
         
    });
    toast.success(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });

    console.log(data);
    return data; 
}


