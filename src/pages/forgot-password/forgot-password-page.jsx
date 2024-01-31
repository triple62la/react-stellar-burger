import styles from "../login/login-page.module.css"
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotPassword} from "../../utils/api";
import useNotification from "../../hooks/use-notification";
import {useForm} from "../../hooks/useForm";


export default function ForgotPasswordPage (){
    const {formData, handleInputChange} = useForm({email:""})
    const navigate = useNavigate()
    const [showError, ] = useNotification()
    const handleSubmit = (e)=>{
        e.preventDefault()
        forgotPassword(formData.email)
            .then(response=>{
                if (response.success){
                    navigate("/reset-password", {state:{from : "/forgot-password"}})
                } else {
                    showError("Произошла ошибка", response.message)
                }
            })
    }
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium" >Восстановление пароля</h1>
                <EmailInput value={formData.email} placeholder="Укажите e-mail" type={"email"} name={"email"} onChange={handleInputChange}/>
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