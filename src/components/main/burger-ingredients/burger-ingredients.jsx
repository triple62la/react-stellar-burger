import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import CategorizedComponents from "./categorized-component/categorized-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../../utils/prop-types"
import IngredientDetails from "../ingredient-details/ingredient-details";
import {memo, useCallback, useMemo, useState} from "react";
import Modal from "../../modals/modal/modal";

const BurgerIngredients = ({data}) => {
    const {buns,sauces, mains} = useMemo(()=>{
        return {
             buns : data.filter(item=>item.type === 'bun'),
             sauces : data.filter(item=>item.type === 'sauce'),
             mains : data.filter(item=>item.type === 'main'),
        }
    },[data])

    const [ingredientData, setIngredientData] = useState(null)
    const closeModal = useCallback(()=>setIngredientData(null), [])
    return (
        <>
            <ul className={clsx(classes.components,'custom-scroll')}>
                <CategorizedComponents categoryName={"Булки"} ingredients={buns}
                                       setIngredientData={setIngredientData}/>
                <CategorizedComponents categoryName={"Coусы"} ingredients={sauces}
                                       setIngredientData={setIngredientData}/>
                <CategorizedComponents categoryName={"Начинки"} ingredients={mains}
                                       setIngredientData={setIngredientData}/>
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