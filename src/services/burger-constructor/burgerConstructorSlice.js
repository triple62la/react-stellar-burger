import {createSlice} from "@reduxjs/toolkit";
import uuid from "../../utils/id-helper";

const initialState = {
    bun:null,
    ingredients:[],
    totalCost:0,
}


const addIngredientReducer = (state, {payload:ingredient})=>{
    const isBun = ingredient.type ==="bun"
    const price = isBun? ingredient.price*2 : ingredient.price
    if (isBun){
        state.totalCost -= state.bun? state.bun.price*2 : 0
        // для корретктного вычисления цены после замены булок необходимо вычесть цену старой булки
        state.bun = ingredient
    } else {
        const constructorId = uuid()
        state.ingredients.push({...ingredient, constructorId})
    }
    state.totalCost +=  price

}

const removeIngredientReducer = (state, {payload:ingredient})=>{
    state.totalCost-=ingredient.price
    state.ingredients = state.ingredients.filter(ing=>ing.constructorId!==ingredient.constructorId)
}


export const burgerConstructorSlice = createSlice({
    name:"burgerConstructor",
    initialState,
    reducers:{
        addIngredient:addIngredientReducer,
        removeIngredient: removeIngredientReducer
    }
})
export const {addIngredient, removeIngredient} = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer

