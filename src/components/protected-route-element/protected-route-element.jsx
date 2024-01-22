import {useEffect, useState} from "react";
import {getAuthData} from "../../utils/helpers";
import {Navigate, useLocation} from "react-router-dom";

export default function ProtectedRouteElement({element}){

    const [isAuthorized, setAuthorized] = useState(()=>{
        const {accessToken,refreshToken} = getAuthData()
        return !!(accessToken && refreshToken)
    })
    const location = useLocation()
    useEffect(()=>{
        const {accessToken,refreshToken} = getAuthData()
        setAuthorized(!!(accessToken && refreshToken))
    }, [])


    return isAuthorized? element: <Navigate to="/login" state={{from:location.pathname}} replace/>;
}
