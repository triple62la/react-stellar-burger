

const apiUrl = "https://norma.nomoreparties.space/api"


const request = async (method, route, payload=null)=>{
    const init = {
        method: method,
        headers: {'Content-Type': 'application/json'},
    }
    if (payload!=null) init.body = JSON.stringify({...payload})
    const response = await fetch(apiUrl+route, init)
    if ( !response.ok) {
        const err = new Error(`Bad server response code (${response.status})`)
        err.response =  await response.json()
        throw err
    }
    const fetchedResult = await response.json()
    if (!fetchedResult.success){
        throw new Error("Bad server response data")
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
        return {response:err.response, success: false, message: err.message}
    }
}

export const authUser = async (authData)=>{
    try{
        return request("POST", "/auth/login", authData)

    } catch (err){
        return {response:err.response, success: false, message: err.message }
    }
}
export const logoutUser = async (token) =>{
    try{
        return await request("POST", "/auth/logout" ,{token})
    }  catch (err) {
        return {response:err.response, success: false, message: err.message }
    }
}
export const renewToken = async () =>{
    return request("POST", "/auth/token")
}
export const forgotPassword = async (email) => {
    try{
        return await request("POST", "/password-reset" ,{email})
    }  catch (err) {
        return {response:err.response, success: false, message: err.message }
    }
}