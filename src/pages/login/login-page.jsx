import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "./login-page.module.css"
import {Link} from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const handleEmailChange = e => {
        setEmail(e.target.value)
    }
    const [pasw, setPassw] = useState("")
    const handlePasswChange = e => {
        setPassw(e.target.value)
    }

    const onSubmit = (data) => console.log(data)
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className="text text_type_main-medium">Вход</h1>
                {/*<Controller*/}
                {/*    name="email"*/}
                {/*    control={control}*/}
                {/*    render={({ field }) => <EmailInput {...field} placeholder="E-mail" type={"email"} />}*/}
                {/*/>*/}
                <EmailInput value={email} placeholder="E-mail" type={"email"} onChange={handleEmailChange} />
                <PasswordInput value={pasw}  placeholder="Пароль" onChange={handlePasswChange} />
                <Button htmlType={"submit"} size={"medium"} type={"primary"}>Войти</Button>
            </form>
            <span className={styles["validation-msg"]}></span>
            <div className={styles["panel-footer"]}>
                <p className={"text text_type_main-default text_color_inactive"}>Вы – новый пользователь?
                    <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?
                    <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>
    </main>
    )
}