import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import {CategorizedComponents} from "./categorized-component/categorized-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../../utils/prop-types"

export const BurgerIngredients = ({data}) => {
    const buns = data.filter(item=>item.type === 'bun')
    const sauces = data.filter(item=>item.type === 'sauce')
    const mains = data.filter(item=>item.type === 'main')
    return (
        <ul className={clsx(classes.components,'custom-scroll')}>
            <CategorizedComponents categoryName={"Булки"} ingredients={buns}/>
            <CategorizedComponents categoryName={"Coусы"} ingredients={sauces}/>
            <CategorizedComponents categoryName={"Начинки"} ingredients={mains}/>
        </ul>
    )
}
BurgerIngredients.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}