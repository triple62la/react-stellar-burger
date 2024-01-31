import classes from "./ingredient-details.module.css";
import clsx from "clsx";
import { useSelector} from "react-redux";
import { useParams} from "react-router-dom";
import {selectIngById} from "../../../services/burger-ingredients/selector";




const IngredientDetails = () => {

    const {ingId} = useParams()
    const {name,calories, carbohydrates, fat, proteins,image} = useSelector(state => selectIngById(state, ingId))

    return (
    <div className={classes.content}>
            <h2 className={clsx(classes.title, "text text_type_main-large mt-4 mb-3")}>Детали ингредиента</h2>
            <img className={clsx(classes["ingredient-image"])} src={image} alt={name}/>
            <p className={clsx(classes["ingredient-name"], "text text_type_main-medium pt-4")}>{name}</p>
            <ul className={classes.nutrients}>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{calories}</p>
                </li>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
                </li>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{fat}</p>
                </li>
                <li className={classes.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
};



export default IngredientDetails;
