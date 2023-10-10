import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import CategorizedComponents from "./categorized-component/categorized-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../../utils/prop-types"
import IngredientDetails from "../ingredient-details/ingredient-details";
import {memo, useCallback, useContext, useMemo} from "react";
import Modal from "../../modals/modal/modal";
import {IngredientsContext} from "../../../services/appContext";
import {setIsVisible} from "../../../services/ingredient-modal/ingredientModalSlice";
import {useDispatch, useSelector} from "react-redux";

const BurgerIngredients = () => {

    const dispatcher = useDispatch()
    const isVisible = useSelector(state=>state.ingredientModal.isVisible)
    const {ingredients} = useContext(IngredientsContext)
    const {buns,sauces, mains} = useMemo(()=>{
        return {
             buns : ingredients.filter(item=>item.type === 'bun'),
             sauces : ingredients.filter(item=>item.type === 'sauce'),
             mains : ingredients.filter(item=>item.type === 'main'),
        }
    },[ingredients])

    const closeModal = useCallback(()=>dispatcher(setIsVisible(false)),[dispatcher])
    return (
        <>
            <ul className={clsx(classes.components,'custom-scroll')}>
                <CategorizedComponents categoryName={"Булки"} ingredients={buns}/>
                <CategorizedComponents categoryName={"Coусы"} ingredients={sauces}/>
                <CategorizedComponents categoryName={"Начинки"} ingredients={mains}/>
            </ul>
            {isVisible &&<Modal closeModal={closeModal} >
                <IngredientDetails />
                            </Modal>}
        </>
    )
}
BurgerIngredients.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}
export default memo(BurgerIngredients)