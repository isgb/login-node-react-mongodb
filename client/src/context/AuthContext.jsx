import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest,loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookies';

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth muts be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] =useState([])

    const signup = async (user) =>{
        try {
            const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.log(error.response.data)
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            // console.log(error)
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);

            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checklogin(){
            const cookies = Cookies.getItem('token');
            // console.log("isgb",cookies)
            if(cookies){
                // console.log(cookies)
                try {
                    const res = await verifyTokenRequest(cookies);
                    console.log(res.data)
                    if(!res.data) setIsAuthenticated(false)

                    isAuthenticated(true)
                    setUser(res.data)
                    
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(false)
                }
            }
        }

        checklogin()
    },[])

    return(
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}