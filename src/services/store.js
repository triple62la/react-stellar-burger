import {legacy_createStore as createStore, applyMiddleware} from "redux";
import {rootReducer} from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const configureStore = (initialState) => createStore(rootReducer,
    initialState,composeWithDevTools(applyMiddleware(thunk)))




