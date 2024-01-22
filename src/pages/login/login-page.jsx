import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "./login-page.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {handleInputChange, setAuthData} from "../../utils/helpers";
import {authUser} from "../../utils/api";

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const location = useLocation()
    const navigate = useNavigate()
    const onInput = (e)=>handleInputChange(e, formData, setFormData)

    const onSubmit = (e)=>{
        e.preventDefault()
        authUser(formData)
            .then(response=>{
                if (response.success){
                    setAuthData(response)
                    navigate(location.state?.from || "/")
                }
            })
    }
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className="text text_type_main-medium">Вход</h1>
                {/*<Controller*/}
                {/*    name="email"*/}
                {/*    control={control}*/}
                {/*    render={({ field }) => <EmailInput {...field} placeholder="E-mail" type={"email"} />}*/}
                {/*/>*/}
                <EmailInput value={formData.email} placeholder="E-mail" type={"email"} name={"email"} onChange={onInput} />
                <PasswordInput value={formData.password}  placeholder="Пароль" name={"password"} onChange={onInput} />
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