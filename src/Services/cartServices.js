import axios from "axios";
import { toast,Bounce } from "react-toastify";

export async function addProductToCart(productId) {
    const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},
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


