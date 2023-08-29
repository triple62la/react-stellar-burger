import classes from "./main.module.css"
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";

export const Main = ()=>(
    <main className={classes.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
    </main>
)