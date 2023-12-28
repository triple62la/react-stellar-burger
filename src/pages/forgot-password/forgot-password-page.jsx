import styles from "../login/login-page.module.css"
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useState} from "react";


export default function ForgotPasswordPage (){
    const [email, setEmail] = useState("")
    const handleEmailChange = (e)=>setEmail(e.target.value)
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={e=>e.preventDefault()}>
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