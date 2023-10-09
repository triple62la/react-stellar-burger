import {combineReducers} from "redux";
import orderModalSlice from "./orderModal/orderModalSlice";

export const rootReducer = combineReducers({
    orderModal:orderModalSlice,

})