import styles from "./profile-page.module.css"
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation} from "react-router-dom";
import {useState} from "react";


export default function ProfilePage (){

    const location = useLocation()
    const getClassName = (to)=>{
        if (location.pathname === to){
            return "text text_type_main-medium"
        }
        return "text text_type_main-medium text_color_inactive"
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePwdChange = (e) => {
        setPwd(e.target.value);
    };

    return (
        <main className={styles.main}>
            <div className={styles.sidemenuWrapper}>
                <ul className={styles.sideMenu}>
                    <li className={styles.navlink}>
                        <NavLink to={"/profile"}
                                 className={getClassName("/profile")}>Профиль</NavLink>
                    </li>
                    <li className={styles.navlink}><NavLink to={"/profile/orders"}
                                                            className={getClassName("/profile/orders")}>История заказов</NavLink></li>
                    <li className={styles.navlink}><NavLink to={"/logout"}
                                                            className={getClassName("/logout")}>Выход</NavLink></li>
                </ul>
                <p className={`text text_type_main-default text_color_inactive ${styles["sidemenu-footer"]}`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>

            <form className={styles.form}>
                <Input value={username}
                       onChange={handleUsernameChange}
                       type="text"
                       id="username"
                       name='username'
                       placeholder="Имя"
                       icon="EditIcon"/>
                <EmailInput value={email}
                            onChange={handleEmailChange}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            icon="EditIcon"
                />
                <PasswordInput value={pwd}
                               onChange={handlePwdChange}
                               type='password'
                               id="password"
                               name='password'
                               placeholder="Пароль"
                               icon="EditIcon"
                />
            </form>

        </main>
    )
}