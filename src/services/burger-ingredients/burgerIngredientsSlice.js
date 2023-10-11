import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredients} from "../../utils/api";

const initialState = {
    categories:[
        {name:"Булки", isVisible:false, id:"buns"},
        {name:"Соусы", isVisible:false, id:"sauces"},
        {name:"Начинки", isVisible:false, id:"mains"},
    ],
    activeTab:"Булки",
    ingredients:[],
    fetchStatus:null,
}

export const fetchIngredients = createAsyncThunk(
    "infgrdients/fetch",
    async ()=>{
        return  await getIngredients()
}
)



export const burgerConstructorSlice = createSlice({
    name:"burgerConstructor",
    initialState,
    reducers:{

        setCategoryVisibility:(state, {payload}) =>{

            const category = state.categories.find(category => category.name === payload.name)
            category.isVisible = payload.isVisible
            const visibleCategories = state.categories.filter(category=>category.isVisible)
            state.activeTab = visibleCategories[0].name
        },

        setActiveTab:(state, {payload})=>void (state.activeTab=payload),
        incrementCounter:(state, {payload})=>{
            const ingredient = state.ingredients.find(item=>item._id === payload)
            ingredient.counter = !ingredient.counter? 1: ingredient.counter + 1
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchIngredients.fulfilled,(state, action) => {
            state.fetchStatus="success"
            state.ingredients=action.payload})
        builder.addCase(fetchIngredients.pending,(state, action) => {
            state.fetchStatus="pending"
            })
        builder.addCase(fetchIngredients.rejected,(state, action) => {
            state.fetchStatus="error"
        })
    }

})
export const {
    setCategoryVisibility,
    setActiveTab,
    incrementCounter
} = burgerConstructorSlice.actions

export default burgerConstructorSlice.reducer