import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MainPage from "./pages/main-page/main-page";
import React, {useCallback, useEffect} from "react";
import AppLayout from "./components/app-layout/app-layout";
import {OnlyUnAuth, OnlyAuth} from "./components/protected-route-element/protected-route-element";
import LoginPage from "./pages/login/login-page";
import RegisterPage from "./pages/register/register-page";
import ForgotPasswordPage from "./pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "./pages/reset-password/reset-password";
import ProfilePage from "./pages/profile/profile-page";
import IngredientInfoPage from "./pages/ingredient-info/ingredient-info";
import Modal from "./components/modals/modal/modal";
import IngredientDetails from "./components/modals/ingredient-details/ingredient-details";
import {fetchIngredients} from "./services/burger-ingredients/burgerIngredientsSlice";
import {useDispatch} from "react-redux";
import OrdersFeedPage from "./pages/orders-feed/orders-feed-page";
import {OrderDetails} from "./pages/order-details/order-details";
import NotFoundPage from "./pages/not-found/not-found-page";

export default function App(){
    const dispatch = useDispatch()

    useEffect( ()=>{
        dispatch(fetchIngredients())
    },[dispatch])

    const location = useLocation();
    const background=location.state?.backgroundLocation
    const navigate = useNavigate()

    const closeImgModal = useCallback(()=>{
        navigate(-1)
    },[navigate])

    return(<>
        <Routes location={background || location}>
            <Route path={"/"} element={<AppLayout/>}>
                <Route index={true} element={<MainPage/>}/>
                <Route path='ingredients/:ingId' element={<IngredientInfoPage/>}/>
                <Route path={"/login"} element={<OnlyUnAuth element={<LoginPage/>}/>} />
                <Route path={"/register"} element={<OnlyUnAuth element={<RegisterPage/>}/>} />
                <Route path={"/forgot-password"} element={<OnlyUnAuth element={<ForgotPasswordPage/>}/>} />
                <Route path={"/reset-password"} element={<OnlyUnAuth element={<ResetPasswordPage/>}/>} />
                <Route path={"/profile"} element={<OnlyAuth element={<ProfilePage/>}/>} />
                <Route path={"/feed"} element={<OrdersFeedPage/>}></Route>
                <Route path={"feed/:orderNum"} element={<OrderDetails/>}/>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
        {background && (
            <Routes>
                <Route path={"ingredients/:ingId"} element={<Modal closeModal={closeImgModal}><IngredientDetails/></Modal>}/>
                <Route path={"feed/:orderNum"} element={<Modal closeModal={closeImgModal}><OrderDetails/> </Modal> }/>
            </Routes>
        )}
    </>)
}