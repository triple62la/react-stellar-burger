import styles from "../login/login-page.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";


export default function RegisterPage () {

    const [userName, setUserName] = useState("")
    const handleUserNameInput = (e)=>setUserName(e.target.value)
    const [email, setEmail] = useState("")
    const handleEmailChange = (e)=>setEmail(e.target.value)
    const [pasw, setPassw] = useState("")
    const handlePasswChange = e => {
        setPassw(e.target.value)
    }

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={e=>e.preventDefault()}>
                <h1 className="text text_type_main-medium" >Регистрация</h1>
                <Input value={userName} onChange={handleUserNameInput} type={"text"} id={"userName"} placeholder={"Имя"} name={"userName"}/>
                <EmailInput value={email} placeholder="E-mail" type={"email"} onChange={handleEmailChange}/>
                <PasswordInput value={pasw}  placeholder="Пароль" onChange={handlePasswChange} />
                <Button htmlType={"submit"} size={"medium"} type={"primary"}>Зарегистрироваться</Button>
            </form>
            <div className={styles["panel-footer"]} style={{marginTop:"80px"}}>
                <p className={"text text_type_main-default text_color_inactive"}>Уже зарегистрированы?
                    <Link to="/login" className={styles.link}>Войти</Link>
                </p>
            </div>
        </main>
    )
}