import styles from "./profile-page.module.css"
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {clearAuthData} from "../../utils/helpers";
import {logoutUser} from "../../utils/api";
import PropTypes from "prop-types";


export default function ProfilePage (){

    const location = useLocation()
    const navigate = useNavigate()
    const sideMenu = location.pathname === "/profile" || location.pathname === "/profile/orders"
    const getClassName = (to)=>{
        if (location.pathname === to){
            return "text text_type_main-medium"
        }
        return "text text_type_main-medium text_color_inactive"
    }
    const handleLogoutClick = (e) =>{
        e.preventDefault()
        logoutUser(localStorage.getItem("refreshToken"))
            .then(response=>{
                if (response.success){
                    clearAuthData()
                    navigate("/login")
                }
            })
    }

    return (<>
            {!sideMenu && <Outlet/>}
            {sideMenu && (
            <main className={styles.main}>
                <div className={styles.sidemenuWrapper}>
                    <ul className={styles.sideMenu}>
                        <li className={styles.navlink}>
                            <NavLink to={"/profile"}
                                     className={getClassName("/profile")}>Профиль</NavLink>
                        </li>
                        <li className={styles.navlink}><NavLink to={"/profile/orders"}
                                                                className={getClassName("/profile/orders")}>История заказов</NavLink></li>
                        <li className={styles.navlink}><NavLink to={"/logout"} onClick={handleLogoutClick}
                                                                className={getClassName("/logout")}>Выход</NavLink></li>
                    </ul>
                    {location.pathname ==="/profile" && <p className={`text text_type_main-default text_color_inactive ${styles["sidemenu-footer"]}`}>В этом разделе вы можете изменить свои персональные данные</p>}
                    {location.pathname ==="/profile/orders" && <p className={`text text_type_main-default text_color_inactive ${styles["sidemenu-footer"]}`}>В этом разделе вы можете просмотреть свою историю заказов</p>}
                </div>
               <Outlet/>
            </main>)}
        </>
    )
}
ProfilePage.PropType = {
    sideMenu:PropTypes.bool
}