import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./burger-constructor.module.css"
import clsx from "clsx";
import {defaultFallbackInView} from "react-intersection-observer";


export const BurgerConstructor = ({data})=>{
    const buns = data.filter(item=>item.type==="bun")
    const ingredients = data.filter(item=>item.type==="main")
    return (
        <>
            <ConstructorElement extraClass={"ml-7 mt-3"} text={buns[0].name + " (верх)"} isLocked={true} thumbnail={buns[0].image} price={buns[0].price} type={"top"}/>
            <ul className={clsx(classes.container, "pt-4 pr-2 custom-scroll")}>
                {ingredients.map(ing=>{
                   return(
                       <li key={ing.name} className={ classes.list_item}>
                           <DragIcon type={"primary"} />
                           <ConstructorElement  text={ing.name} thumbnail={ing.image} price={ing.price}/>
                       </li>
                    )
                })}
            </ul>
            <ConstructorElement extraClass={"ml-7 mt-4"} text={buns[1].name + " (низ)"} isLocked={true} thumbnail={buns[1].image} price={buns[1].price} type={"bottom"}/>
            <div className={clsx(classes.cart_controls,"pt-10 pl-13 pr-4 pb-10")}>
                <p className="text text_type_digits-medium pr-10">610
                    <CurrencyIcon  type="primary"/>
                </p>

                <Button  htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </>
    )
}