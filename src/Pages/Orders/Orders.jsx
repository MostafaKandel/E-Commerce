import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { authContext } from "../../Contexts/AuthContext";
import Loadingscreen from "../../components/LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(authContext);

  useEffect(() => {
    getAllOrders();
  }, []); // Fetch orders when the component mounts

  async function getAllOrders() {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loadingscreen />;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-5">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white sm:text-2xl mx-auto">
              My Orders
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="flex justify-center text-2xl items-center h-40 text-gray-500">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 text-base font-semibold text-gray-900 dark:text-white">
                        <Link to={`/orders/${order._id}`} className="hover:underline">
                          {order._id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-base font-semibold text-gray-900 dark:text-white">
                        {order.createdAt.split("T")[0]}
                      </td>
                      <td className="px-6 py-4 text-base font-semibold text-gray-900 dark:text-white">
                        {order.totalOrderPrice}$
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-lg font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          {order.paymentMethodType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/orders/${order._id}`}
                          className="inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
