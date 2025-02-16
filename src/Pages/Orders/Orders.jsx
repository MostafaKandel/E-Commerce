
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { authContext } from "../../Contexts/AuthContext";
import Loadingscreen from '../../components/LoadingScreen/LoadingScreen'

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {userId} = useContext(authContext);
    console.log(userId);
    
    useEffect(() => {
      getAllOrders();
    },[])
    async function getAllOrders() {
      setIsLoading(true);
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/"+userId,{
        headers: {
          token: localStorage.getItem('token')
        }
      });
      setOrders(data);
      
      setIsLoading(false);
    }
    if(isLoading) return <Loadingscreen/>
    
  return (
<section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-5">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-5xl">
      <div class="gap-4 sm:flex sm:items-center sm:justify-between">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>        
      </div>

      <div class="mt-6 flow-root sm:mt-8">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                <th class="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th class="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">Price</th>
                <th class="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">Payment Method</th>
                <th class="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  orders.map(order => (
                    <tr>
                    <td class="px-6 py-4 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" class="hover:underline">{order._id}</a>
                    </td>
                    <td class="px-6 py-4 text-base font-semibold text-gray-900 dark:text-white">{order.createdAt.split("T")[0]}</td>
                    <td class="px-6 py-4 text-base font-semibold text-gray-900 dark:text-white">{order.totalOrderPrice}$</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-lg font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                        {order.paymentMethodType}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <a href="#" class="inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                        View details
                      </a>
                    </td>
                  </tr>
                  ))
                     
                }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}