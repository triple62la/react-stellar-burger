import classes from "../burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {ingredientPropType} from "../../../../utils/prop-types";
import PropTypes from "prop-types";

export const CategorizedComponents = ({categoryName, ingredients, setIngredientData, setModalVisible})=>{
    const handleIngClick=(ingData)=>{
        setIngredientData(ingData)
        setModalVisible(true)
    }
    return(
        <li className={classes.category}>
            <h2 className={clsx(classes.title, "text text_type_main-medium mt-10")}>{categoryName}</h2>
            <ul className={clsx(classes.ingredients, "pt-6 pb-6 pl-4 pr-2")}>
                {ingredients.map((ingredient, index)=>{
                    return (
                        <li onClick={()=>handleIngClick(ingredient)} key={ingredient._id} className={clsx(classes.ingredient)}>
                            {index===0 && <Counter count={1} size={"default"} extraClass={""}/>}
                            <img className={classes.image} src={ingredient.image} alt={ingredient.name}/>
                            <div className={clsx(classes.price, "pt-1 pb-1")}>
                                <p className={"text text_type_digits-default"}>{ingredient.price}</p>
                                <CurrencyIcon type={"primary"}/>
                            </div>
                            <p className={clsx(classes.ingredient_name,"text text_type_main-default")}>{ingredient.name}</p>
                        </li>

                        )
                })}
            </ul>
        </li>
    )
};

CategorizedComponents.propType = {
    categoryName:PropTypes.string.isRequired,
    ingredients:PropTypes.arrayOf(ingredientPropType)
}