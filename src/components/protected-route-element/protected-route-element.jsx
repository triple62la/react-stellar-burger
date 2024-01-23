import {useState} from "react";
import {getAuthData} from "../../utils/helpers";
import {Navigate, useLocation} from "react-router-dom";

function ProtectedRouteElement({element, onlyUnAuth=false}){

    const [isAuthorized] = useState(()=>{
        const {accessToken,refreshToken} = getAuthData()
        return !!(accessToken && refreshToken)
    })
    const location = useLocation()

    if (onlyUnAuth && isAuthorized) return <Navigate to={"/"} state={{from:location.pathname}}  replace/>;

    if (!onlyUnAuth && !isAuthorized) return  <Navigate to="/login" state={{from:location.pathname}} replace/>;

    return element
}
export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }) => (
     <ProtectedRouteElement onlyUnAuth={true} element={element} />
);
