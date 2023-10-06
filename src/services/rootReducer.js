import {combineReducers} from "redux";
import {orderModalReducer} from "./orderModal/orderModalReducer";

export const rootReducer = combineReducers({
    orderModal:orderModalReducer,

})