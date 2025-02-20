
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalResults, setTotalResults] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    getAllProducts();
  }, [page]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(totalResults / limit));
  }, [totalResults, limit]);

  async function getAllProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`);

      setProducts(data.data);
      setTotalResults(data.results); 

    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

      
      <div className="flex justify-center mt-4">
        <button 
          className="px-4 py-2 bg-gray-300 rounded mx-2" 
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {numberOfPages}</span>
        <button 
          className="px-4 py-2 bg-gray-300 rounded mx-2 disabled:opacity-50" 
          disabled={page >= numberOfPages}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

