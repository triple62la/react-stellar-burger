import {forwardRef, memo} from "react";
import classes from "../burger-ingredients.module.css";
import clsx from "clsx";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import ingredientPropType from "../../../../utils/prop-types";
import {InView} from "react-intersection-observer";
import {setCategoryVisibility} from "../../../../services/burger-ingredients/burgerIngredientsSlice";
import {useDispatch} from "react-redux";


const CategorizedComponents = forwardRef(({categoryName, ingredients, categoryId }, ref)=>{
const dispatch = useDispatch()
const changeCategoryView = (isVisible =>dispatch(setCategoryVisibility({name:categoryName, isVisible})))

    return(
        <InView  threshold={0.3} as="span" onChange={changeCategoryView}>
        <li id={categoryId}  className={classes.category}>
                <h2 ref={ref} className={clsx(classes.title, "text text_type_main-medium mt-10")}>{categoryName}</h2>

            <ul className={clsx(classes.ingredients, "pt-6 pb-6 pl-4 pr-2")}>
                {ingredients.map((data)=>{
                    return <Ingredient key={data._id} ingredient={data}/>
                })}
            </ul>
        </li>
        </InView>
    )
});

const areEqual = ({categoryName:_categoryName, ingredients:_ingredients}, {categoryName,ingredients})=>{
    return [
        _categoryName!==categoryName,
        JSON.stringify(_ingredients)!==JSON.stringify(ingredients)
    ].any
}
CategorizedComponents.propType = {
    categoryName:PropTypes.string.isRequired,
    ingredients:PropTypes.arrayOf(ingredientPropType),
    categoryId:PropTypes.string.isRequired,
}

export default memo(CategorizedComponents, areEqual)