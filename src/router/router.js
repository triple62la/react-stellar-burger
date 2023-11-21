import {createBrowserRouter} from "react-router-dom";
import IngredientInfoPage from "../pages/ingredient-info/ingredient-info";
import NotFoundPage from "../pages/not-found/not-found-page";
import AppLayout from "../components/app-layout/app-layout";
import MainPage from "../pages/main-page/main-page";

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
            // loader: async ({request, params }) => {
            //     const ingredients = await getIngredients()
            //     return ingredients.find(ing=> ing._id = params.ingId)
            // },

        },

    ]
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
])