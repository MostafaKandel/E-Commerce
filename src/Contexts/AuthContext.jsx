import axios from "axios";
import { createContext,useState,useEffect } from "react";
 

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
     
    useEffect(() => {
        verifyUserToken();
        
    })
    function verifyUserToken() {
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((res) => {
            setIsLoggedIn(true);    
        }).catch((err) => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        })
    }
    return <authContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>{children}</authContext.Provider>;
}