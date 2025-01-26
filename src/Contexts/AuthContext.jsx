import axios from "axios";
import { createContext,useState,useEffect } from "react";
 

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
     
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
        }).catch((err) => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        }).finally(() => setIsLoading(false));
    }
    return <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>{children}</authContext.Provider>;
}