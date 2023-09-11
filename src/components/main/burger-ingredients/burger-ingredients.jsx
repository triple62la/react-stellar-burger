import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import {CategorizedComponents} from "./categorized-component/categorized-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../../utils/prop-types"
import ModalOverlay from "../../modals/modals-overlay/modal-overlay";
import {useState} from "react";

export const BurgerIngredients = ({data}) => {
    const buns = data.filter(item=>item.type === 'bun')
    const sauces = data.filter(item=>item.type === 'sauce')
    const mains = data.filter(item=>item.type === 'main')
    const [modalIsVisible, setModalVisible]=useState(false)
    const [ingredientData, setIngredientData] = useState({})
    const toggleModal = (ingData)=>{
        setIngredientData({...ingData})
        setModalVisible(!modalIsVisible)
    }

    return (
        <>
            <ul className={clsx(classes.components,'custom-scroll')}>
                <CategorizedComponents categoryName={"Булки"} ingredients={buns} toggleModal={toggleModal}/>
                <CategorizedComponents categoryName={"Coусы"} ingredients={sauces}/>
                <CategorizedComponents categoryName={"Начинки"} ingredients={mains}/>
            </ul>
            <ModalOverlay closeModal={toggleModal} isVisible={modalIsVisible} >
                <div>{ingredientData}</div>
            </ModalOverlay>
        </>
    )
}
BurgerIngredients.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}