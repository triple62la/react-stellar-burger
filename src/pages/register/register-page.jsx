import styles from "../login/login-page.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../utils/api";
import {handleInputChange} from "../../utils/helpers";
import {setAuthData} from "../../utils/helpers";
import useNotification from "../../hooks/use-notification";


export default function RegisterPage () {

    const [showNotification,] = useNotification()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const onInputChange = (event)=>handleInputChange(event, formData, setFormData)

    const handleSubmit = e =>{
        e.preventDefault()
        registerUser(formData)
            .then((response)=>{
                if (response.success){
                    setAuthData(response)
                    navigate("/")
                    localStorage.setItem("password", formData.password)
                } else {
                    showNotification("Ой,произошла ошибка", response.response?.message || response.message)
                }
            })

    }
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium" >Регистрация</h1>
                <Input value={formData.name} onChange={onInputChange} type={"text"} id={"userName"} placeholder={"Имя"} name={"name"}/>
                <EmailInput value={formData.email} placeholder="E-mail" type={"email"} onChange={onInputChange} name={"email"}/>
                <PasswordInput value={formData.password}  placeholder="Пароль" onChange={onInputChange} name={"password"}/>
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