export const selectIngById = (store, ingId)=>{
    return store.burgerIngredients.ingredients.find(ing => ing._id  === ingId)
}
export const selectAllIngredients = (store)=>store.burgerIngredients.ingredients
export const ingredientsIsFetched = store => store.burgerIngredients.fetchStatus === "success"