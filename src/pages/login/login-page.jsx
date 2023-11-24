import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "./login-page.module.css"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const handleEmailChange = e => {
        setEmail(e.target.value)
    }
    return (<main className={styles.main}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <form onSubmit={e => e.preventDefault()}>
            <EmailInput value={email} onChange={handleEmailChange} type={"email"}/>
            <PasswordInput value={""} onChange={e => e}/>
            <Button htmlType={"submit"} size={"medium"} type={"primary"}>Войти</Button>
        </form>
    </main>)
}