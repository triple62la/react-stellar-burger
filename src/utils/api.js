
const apiUrl = "https://norma.nomoreparties.space/api/ingredients"

export const getIngredients = async ()=>{
    const response = await fetch(apiUrl)
            if ( !response.ok) {
                throw new Error(`Bad server response code (${response.statusCode})`)
            }
        const fetchedResult = await response.json()
        if (!fetchedResult.success){
            throw new Error("Bad server response data")
        }
        return fetchedResult.data
}
