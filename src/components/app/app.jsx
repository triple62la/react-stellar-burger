import styles from "./app.module.css";
import {AppHeader} from "./app-header/app-header";
import {Main} from "../main/main";
import Preloader from "../modals/preloader/preloader";
import {useEffect} from "react";
import preloaderGif from "../../../src/assets/images/loader.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/burger-ingredients/burgerIngredientsSlice";



function App() {

    const dispatch = useDispatch()

    const fetchStatus = useSelector(state => state.burgerIngredients.fetchStatus)

    useEffect( ()=>{
           dispatch(fetchIngredients())
        },[])
  return (
    <div className={styles.app}>
        <AppHeader/>
            {fetchStatus === "success" && <Main />}
        {fetchStatus === "pending" && <Preloader fetchStatus={fetchStatus} image={preloaderGif}/>}
    </div>
  );
}

export default App;
