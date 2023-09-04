import classes from "../burger-ingredients.module.css";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

export const CategorizedComponents = ({categoryName, ingredients})=>{
    return(
        <li className={classes.category}>
            <h2 className={clsx(classes.title, "text text_type_main-medium mt-10")}>{categoryName}</h2>
            <ul className={clsx(classes.ingredients, "pt-6 pl-4")}>
                {ingredients.map(ingredient=>{
                    return (
                        <li key={ingredient._id} className={clsx(classes.ingredient)}>
                        <Counter count={1} size={"default"} extraClass={"m-1"}/>
                        <img className={classes.image} src={ingredient.image} alt={ingredient.name}/>
                        <div className={classes.price}></div>
                    </li>)
                })}
            </ul>
        </li>
    )
};
