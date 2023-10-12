import styles from "./app.module.css";
import {AppHeader} from "./app-header/app-header";
import {Main} from "../main/main";
import Preloader from "../modals/preloader/preloader";
import {useEffect} from "react";
import preloaderGif from "../../../src/assets/images/loader.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/burger-ingredients/burgerIngredientsSlice";
import Modal from "../modals/modal/modal";
import {Notification} from "../modals/notification/notification";
import {setVisible} from "../../services/notification-modal/notificationModalSlice";



function App() {

    const dispatch = useDispatch()
    const fetchStatus = useSelector(state => state.burgerIngredients.fetchStatus)
    const notificationIsVisible = useSelector(state => state.notificationModal.isVisible)
    const closeNotification = ()=>dispatch(setVisible(false))
    useEffect( ()=>{
           dispatch(fetchIngredients())
        },[])
  return (
    <div className={styles.app}>
        <AppHeader/>
            {fetchStatus === "success" && <Main />}
        {fetchStatus === "pending" && <Preloader fetchStatus={fetchStatus} image={preloaderGif}/>}
        {notificationIsVisible && <Modal closeModal={closeNotification} btnExtraClass={{top:"20px", right:"20px"}}>
            <Notification/>
        </Modal>}
    </div>
  );
}

export default App;
