
const apiUrl = "https://norma.nomoreparties.space/api"


const request = async (method, route, payload)=>{
    const init = {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...payload
        })
    }
    if (method.toLowerCase()==="get") delete init.body
    const response = await fetch(apiUrl + "/ingredients")
    if ( !response.ok) {
        throw new Error(`Bad server response code (${response.statusCode})`)
    }
    const fetchedResult = await response.json()
    if (!fetchedResult.success){
        throw new Error("Bad server response data")
    }
    return fetchedResult.data
}

export const getIngredients = async ()=> await request("GET", "/ingredients")

export const getOrderNum = async (ingredientsId) => await request("POST", "/orders", {ingredients:ingredientsId})




