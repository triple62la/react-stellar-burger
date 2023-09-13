import styles from "./app.module.css";
import {AppHeader} from "./app-header/app-header";
import {Main} from "../main/main";
import Preloader from "../modals/preloader/preloader";
import {useEffect, useState} from "react";
import {apiUrl} from "../../utils/data";
import preloaderGif from "../../../src/assets/images/loader2.png";

function App() {
    const [fetchStatus, setFetchStatus] = useState("loading")
    const [preloaderIsVisible, setPreloaderVisible] = useState(false)
    const [ingredients, setIngredients] = useState([]);
    useEffect( ()=>{
        setPreloaderVisible(true)
        const fetchData = ()=> {
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        setFetchStatus("error")
                        setIngredients([])
                    }
                    return response.json()
                })
                .then(data => {
                    setIngredients(data.data)
                })
                .catch(() => {
                    setFetchStatus("error")
                })
                .finally(()=>setPreloaderVisible(false))
        }
        fetchData()
    }, [])
  return (
    <div className={styles.app}>
        <AppHeader/>
        {!preloaderIsVisible && <Main ingredients={ingredients}/>}
        {preloaderIsVisible && <Preloader fetchStatus={fetchStatus} image={preloaderGif}/>}
    </div>
  );
}

export default App;
