import {jwtDecode} from "jwt-decode";


const apiUrl = "https://norma.nomoreparties.space/api"

const getToken = async ()=>{
    const token = localStorage.getItem("accessToken")
    if (tokenIsExpired(token)){
        await refreshToken()
        return localStorage.getItem("accessToken")
    }
    return token
}

const refreshToken = async () =>{

    const refreshToken = localStorage.getItem("refreshToken")
    const response = await request("POST",  "/auth/token", {token:refreshToken})
    localStorage.setItem("refreshToken", response.refreshToken)
    localStorage.setItem("accessToken", response.accessToken)
}

const tokenIsExpired = (token)=>{
    try{
        const decoded = jwtDecode(token);
        return new Date().getTime() > decoded.exp * 1000
    }
    catch (err){
        return false
    }
}

const request = async (method, route, payload=null, withAuth=false)=>{

    const init = {
        method: method,
        headers: {'Content-Type': 'application/json'}
    }

    if (withAuth) init.headers.Authorization = await getToken()

    if (payload!=null) init.body = JSON.stringify({...payload})

    const response = await fetch(apiUrl+route, init)

    if ( !response.ok) {
        const err = new Error(`Bad server response code (${response.status})`)
        err.response =  await response.json()
        throw err
    }

    const fetchedResult = await response.json()
    if (!fetchedResult.success){
        const err = new Error(fetchedResult.message || "Server response is not successful")
        err.response = response
        throw err
    }
    return fetchedResult
}



export const getIngredients = async ()=> {
    const response = await request("GET", "/ingredients")
    return response.data
}

export const getOrderNum = async (ingredientsId) => {
    const response = await request("POST", "/orders", {ingredients:ingredientsId})
    return response.order.number
}

export const registerUser = async (userData)=> {
    try {
        return await request("POST", "/auth/register", userData)
    } catch (err) {
        return {response:err.response, success: false, message: "Ошибка при регистрации пользователя"}
    }
}

export const authUser = async (authData)=>{
    try{
        return await request("POST", "/auth/login", authData)

    } catch (err){
        return {response:err.response, success: false, message: "Ошибка при авторизации пользователя" }
    }
}
export const logoutUser = async (token) =>{
    try{
        return await request("POST", "/auth/logout" ,{token})
    }  catch (err) {
        return {response:err.response, success: false, message: "Ошибка при логауте пользователя" }
    }
}

export const forgotPassword = async (email) => {
    try{
        return await request("POST", "/password-reset" ,{email})
    }  catch (err) {
        return {response:err.response, success: false, message: "Ошибка при сбросе пароля пользователя"}
    }
}
export const fetchUserData = async ()=>{
    try{
        return await request("GET", "/auth/user", null, true)
    } catch (err){
        return {response:err.response, success: false, message: "Ошибка при получении данных пользователя"}
    }
}
export const patchUserData = async (data)=>{
    try{
        return await request("PATCH", "/auth/user", {...data}, true)
    } catch (err){
        return  {response:err.response, success: false, message: "Ошибка при изменении данных пользователя"}
    }
}
export const resetPassword = async (data)=>{
    try{
        return await request("POST", "/password-reset/reset", {...data}, false)
    } catch (err){
        return  {response:err.response, success: false, message: "Ошибка при сбросе пароля"}
    }
}
export const getOrderDetails = async orderNum => {
    try{
        return await request("GET", `/orders/${orderNum}`, null, false)
    } catch (err){
        return  {response:err.response, success: false, message: "Ошибка при запросе подробностей ингредиента"}
    }
}