

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const handleInputChange = (event, formData, setFormData) =>{
    const target = event.target
    const value =
        target.type === 'checkbox'
            ? target.checked
            : target.value
    const name = target.name

    setFormData({
        ...formData,
        [name]: value,
    })
}

export const getAuthData = ()=>{
    const email=localStorage.getItem("email")
    const name=localStorage.getItem("name")
    const accessToken= localStorage.getItem("accessToken")
    const refreshToken= localStorage.getItem("refreshToken")
    const isAuthorized= !!(accessToken && refreshToken)

    return  {
        email,
        name,
        accessToken,
        refreshToken,
        isAuthorized

    }
}
export const setAuthData = ( {user, accessToken, refreshToken}) => {
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("email",  user.email)
    localStorage.setItem("name", user.name)
}
export const clearAuthData = ()=>{
    for (const item of ["name", "email", "accessToken", "refreshToken"]){
        localStorage.setItem(item, "")
    }
}

