
import Product from "../Product/Product";
import Slider from "react-slick";
export default function RelatedProducts({relatedProducts}) {
    
    const settings = {
        dots: true,
        infinite:false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4, 
      };
  return (
    <Slider {...settings} className='p-5'>
     
                {
                  relatedProducts.map((product,index)=>{
                   return <div className="px-2"><Product key={index} product={product} /></div>
                  })
                }
               
    </Slider>
  );
}