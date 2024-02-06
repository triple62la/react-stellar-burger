import {Logo,BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from './navigation.module.css'
import {NavLink} from "./link/nav-link";
import {Link, useLocation} from "react-router-dom";






export function Navigation (){
    const {pathname} = useLocation()
    return (
        <nav className={classes.nav}>
        <div className={classes.links_container}>
            <NavLink title="Конструктор" to={"/"} align="left">
                <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>
            </NavLink>
            <NavLink title="Лента заказов" to={"/feed"} align="left">
                <ListIcon type={pathname.startsWith('/feed') ? 'primary' : 'secondary'}/>
            </NavLink>
        </div>
            <Link to="/" className={classes.logo}>
                <Logo/>
            </Link>

        <NavLink title="Личный кабинет" to={"/profile"} >
            <ProfileIcon type={pathname.startsWith('/profile') ? 'primary' : 'secondary'}/>
        </NavLink>
    </nav>
    )
}