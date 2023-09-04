import classes from "./burger-ingredients.module.css"
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from "clsx";
import {CategorizedComponents} from "./categorized-component/categorized-components";
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