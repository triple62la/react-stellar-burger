import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ingredientData: {},
    isVisible:false
}

export const ingredientModalSlice = createSlice({
    name:"ingredientModal",
    initialState,
    reducers:{
        setIngredientData: (state, {payload:ingData})=>void(state.ingredientData=ingData),
        setIsVisible:(state, {payload})=>void (state.isVisible = payload)
    }
})
export const {setIngredientData, setIsVisible} = ingredientModalSlice.actions
export default ingredientModalSlice.reducer