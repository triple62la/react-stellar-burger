import styles from "./profile-page.module.css"
import {EmailInput, Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {clearAuthData, handleInputChange} from "../../utils/helpers";
import {fetchUserData, logoutUser, patchUserData} from "../../utils/api";
import useNotification from "../../hooks/use-notification";


export default function ProfilePage (){

    const location = useLocation()
    const navigate = useNavigate()
    const [btnIsVisible, setBtnVisible] = useState(false)
    const [fetchedWithErrors, setFetchedWithErrors] = useState(false)
    const getClassName = (to)=>{
        if (location.pathname === to){
            return "text text_type_main-medium"
        }
        return "text text_type_main-medium text_color_inactive"
    }
    const [showNotification, ] = useNotification()
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:localStorage.getItem("password")

    })

    const onInputChange = (e) => {
        if (!fetchedWithErrors && !btnIsVisible){
            setBtnVisible(true)
        }
         return handleInputChange(e, formData, setFormData)
    }

    useEffect(()=>{
        fetchUserData().then(response=>{
            if (!response.success){
                setFetchedWithErrors(true)
                showNotification("OopsyWhoopsy", response.message + ": " + response.response.message)
                setFormData({name:"", email:"", password:""})
            } else{
                setFormData({...formData, name: response.user.name, email: response.user.email})
            }
        })
    }, [])
    const handleSubmit = (e)=>{
        e.preventDefault()
        patchUserData(formData)
            .then(()=>showNotification("Успех", "Ваши данные успешно изменены"))
            .catch(err=>{
                showNotification("Произошла ошибка", err)
            })
            .finally(()=>setBtnVisible(false))
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
                    <li className={styles.navlink}><NavLink to={"/logout"} onClick={handleLogoutClick}
                                                            className={getClassName("/logout")}>Выход</NavLink></li>
                </ul>
                <p className={`text text_type_main-default text_color_inactive ${styles["sidemenu-footer"]}`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>

            <form className={styles.form}>
                <Input value={formData.name}
                       onChange={onInputChange}
                       type="text"
                       id="username"
                       name='name'
                       placeholder="Имя"
                       icon="EditIcon"/>
                <EmailInput value={formData.email}
                            onChange={onInputChange}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            icon="EditIcon"
                />
                <PasswordInput value={formData.password}
                               onChange={onInputChange}
                               type='password'
                               id="password"
                               name='password'
                               placeholder="Пароль"
                               icon="EditIcon"
                />
                {btnIsVisible && <div className={styles["btns-panel"]}>
                    <Button htmlType="button" type="secondary" size="large" >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        onClick={handleSubmit}
                        extraClass={styles.submit}
                    >
                        Сохранить
                    </Button>
                </div>}
            </form>
        </main>
    )
}