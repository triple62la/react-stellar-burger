import styles from "./app.module.css";
import {AppHeader} from "./app-header/app-header";
import {Main} from "../main/main";
import Preloader from "../modals/preloader/preloader";
import {useEffect,  useState} from "react";
import preloaderGif from "../../../src/assets/images/loader.png";
import {getIngredients} from "../../utils/api";
import {IngredientsContext} from "../../services/appContext"
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/burger-ingredients/burgerIngredientsSlice";



function App() {
    // const [fetchStatus, setFetchStatus] = useState("loading")
    // const [preloaderIsVisible, setPreloaderVisible] = useState(false)
    // const [ingredients, setIngredients] = useState([])
    const dispatch = useDispatch()

    const fetchStatus = useSelector(state => state.burgerIngredients.fetchStatus)
    useEffect( ()=>{

        try{
           dispatch(fetchIngredients())
        }
        catch (err){
            setFetchStatus("error")
        }},[])
  return (
    <div className={styles.app}>
        <AppHeader/>
        <IngredientsContext.Provider value={{ingredients, setIngredients}}>
            {fetchStatus === "success" && <Main />}
        </IngredientsContext.Provider>
        {fetchStatus === "pending" && <Preloader fetchStatus={fetchStatus} image={preloaderGif}/>}
    </div>
  );
}

export default App;
