import {createBrowserRouter} from "react-router-dom";
import IngredientInfoPage from "../pages/ingredient-info/ingredient-info";
import NotFoundPage from "../pages/not-found/not-found-page";
import AppLayout from "../components/app-layout/app-layout";
import MainPage from "../pages/main-page/main-page";
import LoginPage from "../pages/login/login-page";

export const router = createBrowserRouter([{
    path:"/",
    element:<AppLayout/>,
    children:[
        {
           index:true,
            element:<MainPage/>
        },
        {
            path: "ingredients/:ingId",
            element: <IngredientInfoPage/>,
        },
        {
            path:"/login",
            element:<LoginPage/>
        },
    ]
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
])