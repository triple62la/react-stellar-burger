import styles from "../login/login-page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "../../hooks/useForm";
import {resetPassword} from "../../utils/api";
import useNotification from "../../hooks/use-notification";


export default function ResetPasswordPage (){
    const location = useLocation()
    const navigate = useNavigate()
    const [showNotification,] = useNotification()
    useEffect(()=>{
        if (location.state?.from !== "/forgot-password"){
            navigate("/login")
        }
    })
   const handleSubmit = (e)=>{
        e.preventDefault()
        resetPassword(formData)
            .then(response=>{
                if (!response.success && response.response?.message ==="Incorrect reset token"){
                    showNotification("","Был введен неверный код сброса")
                } else if(!response.success ) {
                    showNotification("", response.response?.message || "Произошла ошибка при сбросе пароля")
                } else if (response.success) {
                    showNotification("Успех", "Пароль успешно изменен!")
                }
            })
            .catch(err=>showNotification("Произошла ошибка при сбросе пароля", err.message || err))
   }
    const {formData, handleInputChange} = useForm({password:"", token:""})
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium" >Восстановление пароля</h1>
                <PasswordInput value={formData.password} onChange={handleInputChange} name={"password"} placeholder={'Введите новый пароль'}/>
                <Input value={formData.token} name={"token"} placeholder="Введите код из письма" type={"text"} onChange={handleInputChange}/>
                <Button htmlType={"submit"} size={"medium"} type={"primary"}>Сохранить</Button>
            </form>
            <div className={styles["panel-footer"]} style={{marginTop:"80px"}}>
                <p className={"text text_type_main-default text_color_inactive"}>Вспомнили пароль?
                    <Link to="/login" className={styles.link}>Войти</Link>
                </p>
            </div>
        </main>
    )
}