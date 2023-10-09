// import {legacy_createStore as createStore, applyMiddleware} from "redux";

// import {composeWithDevTools} from "redux-devtools-extension";
// import thunk from "redux-thunk";
//
// export const configureStore = (initialState) => createStore(rootReducer,
//     initialState,composeWithDevTools(applyMiddleware(thunk)))
import {rootReducer} from "./rootReducer";
import {applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";


export default function configureAppStore(preloadedState) {
    const middlewareEnhancer = applyMiddleware(thunkMiddleware)

    return configureStore({
        reducer: rootReducer,
        enhancers:[composeWithDevTools(middlewareEnhancer)]
    })
}



