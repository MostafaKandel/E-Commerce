import axios from "axios";
import { createContext,useState,useEffect } from "react";
 
export const authContext = createContext();
export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData]= useState()
     
    useEffect(() => {
        verifyUserToken();
        
    }, []);
    function verifyUserToken() {
        setIsLoading(true);
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((res) => {
            setIsLoggedIn(true);
            setUserData(res.data.decoded) 
            setUserId(res.data.decoded.id);
               
        }).catch((err) => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        }).finally(() => setIsLoading(false));
    }
    return <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, userId, userData }}>{children}</authContext.Provider>;
}