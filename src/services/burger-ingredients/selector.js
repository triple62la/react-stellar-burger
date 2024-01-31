export const selectIngById = (store, ingId)=>{
    return store.burgerIngredients.ingredients.find(ing => ing._id  === ingId)
}