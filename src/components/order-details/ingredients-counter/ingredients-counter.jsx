import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export const IngredientsCounter = (ingData, ingredientsArr) =>{
    console.log(ingredientsArr)


    return (
        <>

        </>
    )
 }
 IngredientsCounter.propTypes = {
     ingData: PropTypes.object.isRequired,
     ingredientsArr: PropTypes.arrayOf(PropTypes.string).isRequired
 }