import React from 'react';
import {useDispatch} from "react-redux";
import {setIngredientData, setIsVisible} from "../../../../services/ingredient-modal/ingredientModalSlice";
import classes from "../burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../../../utils/prop-types";
import clsx from "clsx";
import {useDrag} from "react-dnd";

const Ingredient = ({ingredient}) => {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {ingredient},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    const dispatcher = useDispatch()
    const counter = 0
    const handleIngClick=(ingredient)=>()=>{
        //  const ingData = {...ingredient, uuid:uuid()}
        //  //необходимо пересоздать ингредиент и наделить его uuid
        //  if (ingData.type === "bun"){
        //     const bun = constructorState.ingredients.find(item=>item.type ==="bun")
        //     if (bun) constructorDispatcher({type:"delete", payload:bun})
        //      // так как в ингредиентах может быть только один тип булок
        //      // прежде чем добавлять булку нужно удалить старую
        // }
        // constructorDispatcher({type:"add", payload:ingData})
        dispatcher(setIngredientData(ingredient))
        dispatcher(setIsVisible(true))
    }

    return (
        <li ref={dragRef} onClick={handleIngClick(ingredient)} key={ingredient._id} className={classes.ingredient}>
            {counter>0 && <Counter count={1} size={"default"} extraClass={""}/>}
            <img className={classes.image} src={ingredient.image} alt={ingredient.name}/>
            <div className={clsx(classes.price, "pt-1 pb-1")}>
                <p className={"text text_type_digits-default"}>{ingredient.price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <p className={clsx(classes.ingredient_name,"text text_type_main-default")}>{ingredient.name}</p>
        </li>
    )
};

Ingredient.propType = {

    ingredient:ingredientPropType
}

export default Ingredient;