import styles from "../login/login-page.module.css"
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {forgotPassword} from "../../utils/api";
import useNotification from "../../hooks/use-notification";


export default function ForgotPasswordPage (){
    const [email, setEmail] = useState("")
    const handleEmailChange = (e)=>setEmail(e.target.value)
    const navigate = useNavigate()
    const [showError, hideError] = useNotification()
    const handleSubmit = (e)=>{
        e.preventDefault()
        forgotPassword(email)
            .then(response=>{
                if (response.success){
                    navigate("/reset-password")
                } else {
                    showError("Произошла ошибка", response.message)
                }
            })
    }
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium" >Восстановление пароля</h1>
                <EmailInput value={email} placeholder="Укажите e-mail" type={"email"} onChange={handleEmailChange}/>
                <Button htmlType={"submit"} size={"medium"} type={"primary"}>Восстановить</Button>
            </form>
            <div className={styles["panel-footer"]} style={{marginTop:"80px"}}>
                <p className={"text text_type_main-default text_color_inactive"}>Вспомнили пароль?
                    <Link to="/login" className={styles.link}>Войти</Link>
                </p>
            </div>
        </main>
    )
}