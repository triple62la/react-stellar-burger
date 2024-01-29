import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import configureAppStore from "./services/store"
import {Provider} from "react-redux";
import App from "./App";


const store = configureAppStore({})

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={"/*"} element={<App/>}/>
            </Routes>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
