import {combineReducers} from "redux";
import orderModalSlice from "./order-modal/orderModalSlice";

export const rootReducer = combineReducers({
    orderModal:orderModalSlice,

})