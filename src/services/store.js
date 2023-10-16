// import {legacy_createStore as createStore, applyMiddleware} from "redux";

// import {composeWithDevTools} from "redux-devtools-extension";
// import thunk from "redux-thunk";
//
// export const configureStore = (initialState) => createStore(rootReducer,
//     initialState,composeWithDevTools(applyMiddleware(thunk)))
import {rootReducer} from "./rootReducer";
import {configureStore} from "@reduxjs/toolkit";


export default function configureAppStore(preloadedState) {

    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}



