import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import CategorizedComponents from "./categorized-component/categorized-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../../utils/prop-types"
import IngredientDetails from "../ingredient-details/ingredient-details";
import {memo, useCallback, useContext, useMemo, useState} from "react";
import Modal from "../../modals/modal/modal";
import {IngredientsContext} from "../../../services/appContext";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";




const BurgerIngredients = () => {
    const mapStateToProps = (state)=>{

    }


    const {ingredients} = useContext(IngredientsContext)
    console.log("ингры перерендерились")
    const {buns,sauces, mains} = useMemo(()=>{
        return {
             buns : ingredients.filter(item=>item.type === 'bun'),
             sauces : ingredients.filter(item=>item.type === 'sauce'),
             mains : ingredients.filter(item=>item.type === 'main'),
        }
    },[ingredients])

    const [ingredientData, setIngredientData] = useState(null)
    const closeModal = useCallback(()=>setIngredientData(null), [])
    return (
        <>
            <ul className={clsx(classes.components,'custom-scroll')}>
                <CategorizedComponents categoryName={"Булки"} ingredients={buns}/>
                <CategorizedComponents categoryName={"Coусы"} ingredients={sauces}/>
                <CategorizedComponents categoryName={"Начинки"} ingredients={mains}/>
            </ul>
            {ingredientData &&<Modal closeModal={closeModal} >
                <IngredientDetails ingredientData={ingredientData}/>
                            </Modal>}
        </>
    )
}
BurgerIngredients.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}
export default memo(BurgerIngredients)