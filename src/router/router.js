import {createBrowserRouter, useLocation} from "react-router-dom";
import IngredientInfoPage from "../pages/ingredient-info/ingredient-info";
import NotFoundPage from "../pages/not-found/not-found-page";
import AppLayout from "../components/app-layout/app-layout";
import MainPage from "../pages/main-page/main-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import ForgotPasswordPage from "../pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "../pages/reset-password/reset-password";
import ProfilePage from "../pages/profile/profile-page";
import {OnlyAuth, OnlyUnAuth} from "../components/protected-route-element/protected-route-element";
import Modal from "../components/modals/modal/modal";
import IngredientDetails from "../components/modals/ingredient-details/ingredient-details";
import {setIsVisible} from "../services/ingredient-modal/ingredientModalSlice";





export const router = createBrowserRouter([{
    path:"/",
    element:<AppLayout/>,
    children:[
            {
                index:true,
                element:<OnlyAuth element={<MainPage/>}/>,

            },
            {
                path: "ingredients",
                element: <OnlyAuth element={<MainPage/>}/>,
                children:[
                    {
                        path:":ingId",
                        element:<Modal closeModal={dispatch(setIsVisible(false))} ><IngredientDetails/></Modal>
                    }
                ]
            },
            {
                path: "ingredients/:ingId",
                element:  <IngredientInfoPage/>,
            },
            {
                path:"/login",
                element:<OnlyUnAuth element={<LoginPage/>} />

            },
            {
                path:"/register",
                element:<OnlyUnAuth element={<RegisterPage/>} />
            },
            {
                path:"/forgot-password",
                element: <OnlyUnAuth element={<ForgotPasswordPage/>}/>
            },
            {
                path: "/reset-password",
                element: <OnlyUnAuth element={<ResetPasswordPage/>}/>
            },
            {
                path: "profile",
                element: <OnlyAuth element={<ProfilePage/>}/>
            },

        ]
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
])