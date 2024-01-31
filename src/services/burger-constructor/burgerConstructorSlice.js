import {createSlice} from "@reduxjs/toolkit";
import {uuid} from "../../utils/helpers";

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
        const index = state.ingredients.length
        state.ingredients.push({...ingredient, constructorId,index})
    }
    state.totalCost +=  price

}

const removeIngredientReducer = (state, {payload:ingredient})=>{
    state.totalCost-=ingredient.price
    state.ingredients = state.ingredients.filter(ing=>ing.constructorId!==ingredient.constructorId)
}
const resetConstructorReducer = (state)=>{
    state.ingredients = []
    state.totalCost = 0
    state.bun = null
}


export const burgerConstructorSlice = createSlice({
    name:"burgerConstructor",
    initialState,
    reducers:{
        addIngredient:addIngredientReducer,
        removeIngredient: removeIngredientReducer,
        resetConstructor:resetConstructorReducer,
        moveIngredient:(state, {payload})=>{

            state.ingredients.splice(payload.hoverIndex,0, state.ingredients.splice(payload.dragIndex,1)[0])


        }
    }
})
export const {addIngredient, removeIngredient, moveIngredient, resetConstructor} = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer

