import styles from "./app.module.css";
import {AppHeader} from "./app-header/app-header";
import {Main} from "../main/main";
import Preloader from "../modals/preloader/preloader";
import {useEffect, useMemo, useReducer, useState} from "react";
import preloaderGif from "../../../src/assets/images/loader.png";
import {getIngredients} from "../../utils/api";
import {IngredientsContext, ConstructorContext} from "../../services/appContext"


const constructorInitState = {ingredients:[], cost:0}

function App() {
    console.log("app rerendered")
    const [fetchStatus, setFetchStatus] = useState("loading")
    const [preloaderIsVisible, setPreloaderVisible] = useState(false)
    const [ingredients, setIngredients] = useState([])
    const [constructorState, constructorDispatcher] = useReducer(constructorReducer, constructorInitState, undefined)
    const constructorReducerMemo = useMemo(
        ()=>({constructorState, constructorDispatcher}),
        [constructorState])
    function constructorReducer(state, action){
        switch(action.type){
            case "add":
                return{
                    ...state,
                    ingredients: [...state.ingredients, action.payload],
                    cost: action.payload.type==="bun"? state.cost + action.payload.price * 2 : state.cost + action.payload.price
                }
            case "delete":
                return{
                    ...state,
                    ingredients: [...state.ingredients.filter((item)=>action.payload.uuid!==item.uuid)],
                    cost: action.payload.type==="bun"? state.cost - action.payload.price * 2 : state.cost - action.payload.price
                }
            default:
                return state
        }
    }

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
        <IngredientsContext.Provider value={{ingredients, setIngredients}}>
            <ConstructorContext.Provider value={{...constructorReducerMemo}}>
            {!preloaderIsVisible && <Main />}
            </ConstructorContext.Provider>
        </IngredientsContext.Provider>
        {preloaderIsVisible && <Preloader fetchStatus={fetchStatus} image={preloaderGif}/>}
    </div>
  );
}

export default App;
