import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import {CategorizedComponents} from "./categorized-component/categorized-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../../utils/prop-types"
import ModalOverlay from "../../modals/modals-overlay/modal-overlay";
import IngredientDetails from "../../modals/ingredient-details/ingredient-details";
import {useState} from "react";

export const BurgerIngredients = ({data}) => {
    const buns = data.filter(item=>item.type === 'bun')
    const sauces = data.filter(item=>item.type === 'sauce')
    const mains = data.filter(item=>item.type === 'main')
    const [modalIsVisible, setModalVisible] = useState(false)
    const [ingredientData, setIngredientData] = useState({})
    const closeModal = ()=>setModalVisible(false)
    return (
        <>
            <ul className={clsx(classes.components,'custom-scroll')}>
                <CategorizedComponents categoryName={"Булки"} ingredients={buns}
                                       setModalVisible={setModalVisible}
                                       setIngredientData={setIngredientData}/>
                <CategorizedComponents categoryName={"Coусы"} ingredients={sauces}
                                       setModalVisible={setModalVisible}
                                       setIngredientData={setIngredientData}/>
                <CategorizedComponents categoryName={"Начинки"} ingredients={mains}
                                       setModalVisible={setModalVisible}
                                       setIngredientData={setIngredientData}/>
            </ul>
            <ModalOverlay closeModal={closeModal} isVisible={modalIsVisible}>
                <IngredientDetails ingredientData={ingredientData}/>
            </ModalOverlay>
        </>
    )
}
BurgerIngredients.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}