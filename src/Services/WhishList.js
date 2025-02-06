import axios from "axios";
 

export async function addProductToWishList(productId) {
    const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},
        {
            headers:{
                token: localStorage.getItem('token')
            }
        }
    )
    console.log(data);

    
}
