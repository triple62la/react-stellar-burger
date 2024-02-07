import styles from "./profile-details.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import useNotification from "../../../hooks/use-notification";
import {useForm} from "../../../hooks/useForm";
import {fetchUserData, patchUserData} from "../../../utils/api";

export const ProfileDetails=()=>{

    const [btnIsVisible, setBtnVisible] = useState(false)
    const [fetchedWithErrors, setFetchedWithErrors] = useState(false)
    const [showNotification, ] = useNotification()
    const {formData,handleInputChange, setFormData} = useForm({
        name:"",
        email:"",
        password:localStorage.getItem("password") || ""

    })


    const onInputChange = (e) => {
        if (!fetchedWithErrors && !btnIsVisible){
            setBtnVisible(true)
        }
        return handleInputChange(e)
    }

    useEffect(()=>{
        fetchUserData().then(response=>{
            if (!response.success){
                setFetchedWithErrors(true)
                showNotification("OopsyWhoopsy", response.message + ": " + response.response.message)
                setFormData({name:"", email:"", password:""})
            } else{
                setFormData({...formData, name: response.user.name, email: response.user.email})
            }
        })
    }, [])
    const handleSubmit = (e)=>{
        e.preventDefault()
        patchUserData(formData)
            .then(()=>showNotification("Успех", "Ваши данные успешно изменены"))
            .catch(err=>{
                showNotification("Произошла ошибка", err)
            })
            .finally(()=>setBtnVisible(false))
    }

    return (
        <form className={styles.form}>
            <Input value={formData.name}
                   onChange={onInputChange}
                   type="text"
                   id="username"
                   name='name'
                   placeholder="Имя"
                   icon="EditIcon"/>
            <EmailInput value={formData.email}
                        onChange={onInputChange}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        icon="EditIcon"
            />
            <PasswordInput value={formData.password}
                           onChange={onInputChange}
                           type='password'
                           id="password"
                           name='password'
                           placeholder="Пароль"
                           icon="EditIcon"
            />
            {btnIsVisible && <div className={styles["btns-panel"]}>
                <Button htmlType="button" type="secondary" size="large" >
                    Отмена
                </Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    onClick={handleSubmit}
                    extraClass={styles.submit}
                >
                    Сохранить
                </Button>
            </div>}
        </form>
    )
}