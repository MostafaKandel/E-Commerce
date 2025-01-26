import { Button } from "@heroui/react";
export default function Product({product}) {
    return (
        <div  className="flex flex-col justify-between  mx-auto w-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 cursor-pointer shadow-md">
          <div>
          <div className="overflow-hidden">
          <img className="w-full object-contain object-center duration-300  hover:scale-[103%]" src={product.imageCover} alt="Product Image" />
          </div>
    <div className="p-4 pb-0">
<h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-1">{product.title}</h2>
<p className="mb-2 text-base dark:text-gray-300 text-gray-700 line-clamp-3">{product.description}</p>
<div className="flex items-center">
<p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${product.price}</p>
<p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">${product.price + 5}</p>
<p className="ml-auto text-base font-medium text-green-500">20% off</p>
</div>
    </div>
          </div>
<div className="m-4">
<Button color="success" variant="bordered" className="w-full " endContent={<i className="fas fa-shopping-cart"></i>}>Add to cart</Button>
</div>
</div>
      )
}