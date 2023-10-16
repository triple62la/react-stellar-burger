import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./burger-constructor.module.css"
import clsx from "clsx";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../../utils/prop-types";
import OrderDetails from "../../modals/order-details/order-details";
import Modal from "../../modals/modal/modal";
import {getOrderNum} from "../../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {setIsVisible, setOrderId} from "../../../services/order-modal/orderModalSlice";
import {addIngredient} from "../../../services/burger-constructor/burgerConstructorSlice";
import {useDrop} from "react-dnd";
import {useRef} from "react";
import {incrementCounter} from "../../../services/burger-ingredients/burgerIngredientsSlice";
import {setVisible as setNotificationVisible, setTitle, setMessage} from "../../../services/notification-modal/notificationModalSlice";
import DragableItem from "./daragable-item/dragable-item";


export const BurgerConstructor = ()=>{
    const ingredientsListElement = useRef(null)
    const dispatch = useDispatch()
    const ingredients =useSelector(store=>store.burgerConstructor.ingredients)
    const hanldeDrop = (item,)=> {
        dispatch(addIngredient(item))
        if (item.type !=="bun")dispatch(incrementCounter(item._id))
        if (ingredients.length>3) {
             ingredientsListElement.current.scrollTop = ingredientsListElement.current.scrollHeight
        }
    }
    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop:hanldeDrop,
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const modalIsVisible = useSelector(state => state.orderModal.isVisible)
    const bun = useSelector(store=>store.burgerConstructor.bun)
    const totalCost = useSelector(store=>store.burgerConstructor.totalCost)

    const closeModal = ()=>{
        dispatch(setIsVisible(false))
    }
    const showNotification = (title, msg)=>{
        dispatch(setTitle(title))
        dispatch(setMessage(msg))
        dispatch(setNotificationVisible(true))
    }
    const openModal = ()=>{
        const orderedItems = [...ingredients.map(item=>item._id), bun._id]
        getOrderNum(orderedItems)
            .then(number=>{
                dispatch(setOrderId(number))
                dispatch(setIsVisible(true))
            })
            .catch(err=>{
                showNotification("ОЙ","Произошла ошибка во время обработки заказа")
                console.error(err)
            })
    }

    return (
        <div ref={dropTarget} className={clsx(classes.wrapper, {[classes.drag_over]:isHover})}>
            {bun && <ConstructorElement  extraClass={clsx("ml-7 mt-3", classes.bun)}
                                                   text={bun.name + " (верх)"} isLocked={true}
                                                   thumbnail={bun.image} price={bun.price}
                                                   type={"top"}/>}
            <ul ref={ingredientsListElement}  className={clsx(classes.container,
                                                    "pt-4 pr-2 custom-scroll",
                {[classes.no_ingredients]:!bun && !ingredients.length,
                    [classes.no_scroll]:ingredients.length<=4,
                    [classes.bottom_space]:bun && isHover
                })}>

                { !bun && !ingredients.length && <p className={clsx(classes.no_ingredients,"text text_color_inactive")}>
                     Перетащите игнредиенты, чтобы собрать свой сочнейший бургер</p>}

                {ingredients.map((ing, index)=>{
                   return(
                        <DragableItem key={ing.constructorId} ing={ing} index={index}/>
                    )
                })}
            </ul>
            {!!bun && <ConstructorElement extraClass={clsx("ml-7 mt-4", classes.bun)}
                                                  text={bun.name + " (низ)"}
                                                  isLocked={true} thumbnail={bun.image}
                                                  price={bun.price}
                                                  type={"bottom"}/>}
            <div className={clsx(classes.cart_controls,"pt-10 pl-13 pr-4 pb-10")}>
                <p className="text text_type_digits-medium pr-10">{totalCost}
                    <CurrencyIcon  type="primary"/>
                </p>
                <Button onClick={openModal}  htmlType="button" type="primary" size="large" disabled={!bun }>
                    Оформить заказ
                </Button>
            </div>
            {modalIsVisible && <Modal closeModal={closeModal}>
                <OrderDetails />
            </Modal>}
        </div>
    )
}
BurgerConstructor.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}
