import styles from "./app.module.css";
import {AppHeader} from "./app-header/app-header";
import {Main} from "../main/main";
import Preloader from "../modals/preloader/preloader";
import {useEffect, useState} from "react";
import preloaderGif from "../../../src/assets/images/loader.png";
import {getIngredients} from "../../utils/api";

function App() {
    const [fetchStatus, setFetchStatus] = useState("loading")
    const [preloaderIsVisible, setPreloaderVisible] = useState(false)
    const [ingredients, setIngredients] = useState([]);
    useEffect( ()=>{
        setPreloaderVisible(true)
        const fetchData = async ()=> {
        try{
            const ingredients = await getIngredients()
            setIngredients(ingredients)
            setPreloaderVisible(false)
        }
        catch (err){
            setFetchStatus("error")
        }
        }
        fetchData()},[])
  return (
    <div className={styles.app}>
        <AppHeader/>
        {!preloaderIsVisible && <Main ingredients={ingredients}/>}
        {preloaderIsVisible && <Preloader fetchStatus={fetchStatus} image={preloaderGif}/>}
    </div>
  );
}

export default App;
