import {Logo,BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from './navigation.module.css'
import {Link} from "./link/link";






export function Navigation (){
    return (
        <nav className={classes.nav}>
        <div className={classes.links_container}>
            <Link title="Конструктор" isInactive={false} align="left">
                <BurgerIcon type="primary"/>
            </Link>
            <Link title="Лента заказов" isInactive={true}  align="left">
                <ListIcon type="secondary"/>
            </Link>
        </div>
            <a href="/" className={classes.logo}>
                <Logo/>
            </a>

        <Link title="Личный кабинет" isInactive={true}>
            <ProfileIcon type="secondary"/>
        </Link>
    </nav>
    )
}