import classes from "./main.module.css"
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";
import {Tabs} from "./tabs/tabs";
import {data} from "../../utils/data";

export const Main = ()=>(
    <main className={classes.main}>
        <h1 className={"text text_type_main-large pt-10"}>Соберите бургер</h1>
        <section className={classes.section}>
            <div className={classes.column}>
                <Tabs/>
                <BurgerIngredients data={data}/>
            </div>
            <div className={classes.column}>
                <BurgerConstructor/>
            </div>
        </section>
    </main>
)