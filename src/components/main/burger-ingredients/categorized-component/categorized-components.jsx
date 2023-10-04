import {memo, useContext} from "react";
import classes from "../burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {ingredientPropType} from "../../../../utils/prop-types";
import PropTypes from "prop-types";
import {ConstructorContext} from "../../../../services/appContext";
import uuid from "../../../../utils/id-helper";


const CategorizedComponents = ({categoryName, ingredients})=>{

    const {constructorState, constructorDispatcher} = useContext(ConstructorContext)

    const handleIngClick=(ingredient)=>()=>{
        const ingData = {...ingredient, uuid:uuid()}
        //необходимо пересоздать ингредиент и наделить его uuid
        if (ingData.type === "bun"){
           const bun = constructorState.ingredients.find(item=>item.type ==="bun")
           if (bun) constructorDispatcher({type:"delete", payload:bun})
            // так как в ингредиентах может быть только один тип булок
            // прежде чем добавлять булку нужно удалить старую
       }
       constructorDispatcher({type:"add", payload:ingData})
    }
    return(
        <li className={classes.category}>
            <h2 className={clsx(classes.title, "text text_type_main-medium mt-10")}>{categoryName}</h2>
            <ul className={clsx(classes.ingredients, "pt-6 pb-6 pl-4 pr-2")}>
                {ingredients.map((ingredient, index)=>{
                    return (
                        <li onClick={handleIngClick(ingredient)} key={ingredient._id} className={classes.ingredient}>
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

const areEqual = ({categoryName:_categoryName, ingredients:_ingredients}, {categoryName,ingredients})=>{
    return [
        _categoryName!==categoryName,
        JSON.stringify(_ingredients)!==JSON.stringify(ingredients)
    ].any
}

CategorizedComponents.propType = {
    categoryName:PropTypes.string.isRequired,
    ingredients:PropTypes.arrayOf(ingredientPropType)
}
export default memo(CategorizedComponents, areEqual)