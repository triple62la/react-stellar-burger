import {combineReducers} from "redux";
import orderModalSlice from "./order-modal/orderModalSlice";
import ingredientModalSlice from "./ingredient-modal/ingredientModalSlice";
import burgerConstructorSlice from "./burger-constructor/burgerConstructorSlice";

export const rootReducer = combineReducers({
    orderModal:orderModalSlice,
    ingredientModal:ingredientModalSlice,
    burgerConstructor:burgerConstructorSlice
})