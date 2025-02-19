import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Resetcode() {
   


 
  const [resetCode, setresetCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      console.log("Response Reset Code:", response.data);
      navigate("/resetPassword");
      
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
 
    }
  };


  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
             Reset code
            </h1>
            
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="resetcode"
                    className="block text-lg font-bold ml-1 mb-2 dark:text-white"
                  >
                    Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="resetcode"
                      name="resetcode"
                      value={resetCode}
                      onChange={(e) => setresetCode(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="resetcode-error"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
