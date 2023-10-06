import classes from "./main.module.css"
import clsx from "clsx";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";
import {Tabs} from "./tabs/tabs";

export const Main = ()=>(
    <main className={classes.main}>
        <h1 className={clsx(classes.title , "text text_type_main-large pt-10")}>Соберите бургер</h1>
        <section className={classes.section}>
            <div className={classes.column}>
                <Tabs/>
                <BurgerIngredients />
            </div>
            <div className={classes.column}>
                <BurgerConstructor />
            </div>
        </section>
    </main>
)