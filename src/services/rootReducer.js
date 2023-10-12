import {combineReducers} from "redux";
import orderModalSlice from "./order-modal/orderModalSlice";
import ingredientModalSlice from "./ingredient-modal/ingredientModalSlice";
import burgerConstructorSlice from "./burger-constructor/burgerConstructorSlice";
import burgerIngredientsSlice from "./burger-ingredients/burgerIngredientsSlice";
import notificationModalSlice from "./notification-modal/notificationModalSlice";

export const rootReducer = combineReducers({
    orderModal:orderModalSlice,
    ingredientModal:ingredientModalSlice,
    notificationModal:notificationModalSlice,
    burgerConstructor:burgerConstructorSlice,
    burgerIngredients: burgerIngredientsSlice
})