import styles from "../login/login-page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useState} from "react";


export default function ResetPasswordPage (){
    const [pasw, setPassw] = useState("")
    const handlePasswChange = e => setPassw(e.target.value)
    const [code, setCode] = useState("")
    const handleCodeChange = e => setCode(e.target.value)
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={e=>e.preventDefault()}>
                <h1 className="text text_type_main-medium" >Восстановление пароля</h1>
                <PasswordInput value={pasw} onChange={handlePasswChange} placeholder={'Введите новый пароль'}/>
                <Input value={code} placeholder="Введите код из письма" type={"text"} onChange={handleCodeChange}/>
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