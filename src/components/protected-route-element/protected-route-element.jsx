import {useState} from "react";
import {getAuthData} from "../../utils/helpers";
import {Navigate, useLocation} from "react-router-dom";

// function ProtectedRouteElement({element, onlyUnAuth=false}){
//
//     const [isAuthorized] = useState(()=>{
//         const {accessToken,refreshToken} = getAuthData()
//         return !!(accessToken && refreshToken)
//     })
//     const location = useLocation()
//
//     if (onlyUnAuth && isAuthorized) return <Navigate to={"/"} state={{from:location.pathname}}  replace/>;
//
//     if (!onlyUnAuth && !isAuthorized) return  <Navigate to="/login" state={{from:location.pathname}} replace/>;
//
//     return element
// }
function ProtectedRoute({ element, anonymous = false }) {
    const [isLoggedIn,] = useState(()=>{
        const {accessToken,refreshToken} = getAuthData()
        return !!(accessToken && refreshToken)
     })

    const location = useLocation();
    const from = location.state?.from || '/';
    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isLoggedIn) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={ from } />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isLoggedIn) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{ from: location.pathname}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return element;
}
export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ element }) => (
     <ProtectedRoute anonymous={true} element={element} />
);
