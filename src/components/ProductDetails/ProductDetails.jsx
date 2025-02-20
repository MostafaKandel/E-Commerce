
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import {addProductToCart} from "../../Services/cartServices";

export default function ProductDetails() {
    let {id} = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
         
      };

    useEffect(() => {
        getProductDetails();

    }, [id])

  function getProductDetails(){
        setIsLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
            getRelatedProducts(data.data.category._id);
            setProduct(data.data);
        setIsLoading(false);
        })
        
    }
    async function getRelatedProducts(categoryId){
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      setRelatedProducts(data.data);
  }
  

  if(isLoading){
    return <LoadingScreen />;
  }

    return (
    
<div className="mx-auto">
  <div className="flex flex-col items-center md:flex-row">
   
    <div className="md:w-1/3 p-4 relative">
      <div className=" ">
        <Slider {...settings} className="p-5">
          {
            product?.images.map((img)=>{
        
              return <img src={img} alt={product?.title} className="w-full h-auto object-cover rounded-lg"/>
          })
          }
        </Slider>
        <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none">
          <svg className="w-6 h-6 absolute top-0 right-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>
    </div>
    
    
    <div className="md:w-2/3 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{product?.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{product?.description}</p>
      
      <div className="flex items-center mb-4">
        <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{product?.ratingsAverage}</span>
        <span className="text-sm text-gray-500 ml-2">{product?.ratingsQuantity} reviews</span>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-3xl font-bold text-gray-900">${product?.price}</span>
          <span className="ml-2 text-sm font-medium text-gray-500 line-through">${product?.price + 20}</span>
        </div>
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
      </div>
      
      <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>
      
      <div className="flex space-x-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Buy Now
        </button>
        <button onClick={() => addProductToCart(product._id)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
        <RelatedProducts  relatedProducts={relatedProducts} />
</div>
  );
}