import {AppHeader} from "./app-header/app-header";
import {Outlet} from "react-router-dom";
import styles from "./app-layout.module.css"
import {useDispatch, useSelector} from "react-redux";
import {setVisible} from "../../services/notification-modal/notificationModalSlice";
import {useEffect} from "react";
import {fetchIngredients} from "../../services/burger-ingredients/burgerIngredientsSlice";
import Preloader from "../modals/preloader/preloader";
import preloaderGif from "../../assets/images/loader.png";
import Modal from "../modals/modal/modal";
import {Notification} from "../modals/notification/notification";

export default function AppLayout(){
    const dispatch = useDispatch()
    const fetchStatus = useSelector(state => state.burgerIngredients.fetchStatus)
    const notificationIsVisible = useSelector(state => state.notificationModal.isVisible)
    const closeNotification = ()=>dispatch(setVisible(false))
    useEffect( ()=>{
        dispatch(fetchIngredients())
    },[])

    return (<div className={styles.app}>
        <AppHeader/>
        {fetchStatus === "success" && <Outlet/> }
        {fetchStatus === "pending" && <Preloader fetchStatus={fetchStatus} image={preloaderGif}/>}
        {notificationIsVisible && <Modal closeModal={closeNotification} btnExtraClass={{top:"20px", right:"20px"}}>
            <Notification/>
        </Modal>}
    </div>)
}