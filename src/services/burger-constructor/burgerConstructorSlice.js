import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ingredients:[]
}
export const burgerConstructorSlice = createSlice({
    name:"burgerConstructor",
    initialState,
    reducers:{
        addIngredient:(state, {payload:ingredient})=>void(state.ingredients.push(ingredient))
    }
})


