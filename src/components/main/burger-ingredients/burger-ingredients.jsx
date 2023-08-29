import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {Tabs} from "./tabs/tabs";
export const BurgerIngredients = () => (
    <section className={classes.section}>
        <h1 className={"text text_type_main-large"}>Соберите бургер</h1>
        <Tabs />
    </section>
)