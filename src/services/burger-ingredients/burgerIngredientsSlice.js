import {createSlice} from "@reduxjs/toolkit";

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

        setActiveTab:(state, {payload})=>void (state.activeTab=payload)


    }
})
export const {setCategoryVisibility, setActiveTab} = burgerConstructorSlice.actions
export default burgerConstructorSlice.reducer