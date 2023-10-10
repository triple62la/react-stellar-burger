import {combineReducers} from "redux";
import orderModalSlice from "./order-modal/orderModalSlice";
import ingredientModalSlice from "./ingredient-modal/ingredientModalSlice";

export const rootReducer = combineReducers({
    orderModal:orderModalSlice,
    ingredientModal:ingredientModalSlice

})