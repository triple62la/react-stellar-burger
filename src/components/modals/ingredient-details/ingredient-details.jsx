import React from 'react';
import classes from "./ingredient-details.module.css";
import clsx from "clsx";
import PropTypes from "prop-types";

const IngredientDetails = ({ingredientData}) => {
    return (
        <div className={classes.content}>
            <h2 className={clsx(classes.title, "text text_type_main-large mt-4 mb-3")}>Детали ингредиента</h2>
            <img className={clsx(classes["ingredient-image"])} src={ingredientData.image} alt={ingredientData.name}/>
            <p className={clsx(classes["ingredient-name"], "text text_type_main-medium pt-4")}>{ingredientData.name}</p>
            <ul className={classes.nutrients}>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientData.calories}</p>
                </li>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientData.proteins}</p>
                </li>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientData.fat}</p>
                </li>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientData.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes={
    ingredientData:PropTypes.shape({
        image:PropTypes.string,
        name:PropTypes.string,
        calories:PropTypes.string,
        proteins:PropTypes.string,
        fat:PropTypes.string,
        carbohydrates:PropTypes.string
    }).isRequired
}

export default IngredientDetails;
