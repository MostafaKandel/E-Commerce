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

export async function removeProductToWishList(productId) {
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
            token: localStorage.getItem('token')
        },
         // Correct way to send body with DELETE
    });

    console.log(data);
    return data; // Optional: Return response if needed
}


