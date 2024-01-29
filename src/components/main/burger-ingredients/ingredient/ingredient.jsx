import React from 'react';
import classes from "../burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../../../utils/prop-types";
import clsx from "clsx";
import {useDrag} from "react-dnd";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Ingredient = ({ingredient}) => {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {...ingredient},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    const location=useLocation()

    return (
        <Link ref={dragRef}  key={ingredient._id} className={classes.ingredient}
              to={`/ingredients/${ingredient._id}`} state={{backgroundLocation:location}}>
            {!!ingredient.counter && <Counter count={ingredient.counter} size={"default"} extraClass={""}/>}
            <img className={classes.image} src={ingredient.image} alt={ingredient.name}/>
            <div className={clsx(classes.price, "pt-1 pb-1")}>
                <p className={"text text_type_digits-default"}>{ingredient.price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <p className={clsx(classes.ingredient_name, "text text_type_main-default")}>{ingredient.name}</p>
        </Link>
    )
};

Ingredient.propType = {

    ingredient: ingredientPropType
}

export default Ingredient;