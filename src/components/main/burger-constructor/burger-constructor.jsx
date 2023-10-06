import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./burger-constructor.module.css"
import clsx from "clsx";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../../utils/prop-types";
import {useContext, useMemo, useState} from "react";
import OrderDetalis from "../order-details/order-detalis";
import Modal from "../../modals/modal/modal";
import {ConstructorContext} from "../../../services/appContext";
import {getOrderNum} from "../../../utils/api";

export const BurgerConstructor = ()=>{
    const {constructorState, constructorDispatcher} = useContext(ConstructorContext)
    const {buns,ingredients} =  useMemo(()=>{
        return {
            buns:constructorState.ingredients.filter(item=>item.type==="bun"),
            ingredients: constructorState.ingredients.filter(item=>item.type!=="bun"),
        }
    }, [constructorState.ingredients])
    const [modalIsVisible, setModalVisible]=useState(false)
    const [orderId, setOrderId] = useState(0)
    const onTrashClick = ingredientData => () => constructorDispatcher({type:"delete", payload:ingredientData})
    const closeModal = ()=>{
        setModalVisible(false)
    }
    const openModal = ()=>{
        getOrderNum(constructorState.ingredients.map(item=>item._id))
            .then(number=>{
                setOrderId(number)
                setModalVisible(true)
            })
            .catch(err=>alert("Произошла ошибка во время обработки заказа"))
    }
    return (
        <div className={classes.wrapper}>
            {!!buns.length && <ConstructorElement  extraClass={clsx("ml-7 mt-3", classes.bun)}
                                                   text={buns[0]?.name + " (верх)"} isLocked={true}
                                                   thumbnail={buns[0]?.image} price={buns[0]?.price}
                                                   type={"top"}/>}
            <ul className={clsx(classes.container,
                "pt-4 pr-2 custom-scroll",
                {[classes.no_ingredients]:!buns.length && !ingredients.length,
                    [classes.no_scroll]:ingredients.length<=4})
            }>
                { !buns.length && !ingredients.length && <p className={clsx(classes.no_ingredients,"text text_color_inactive")}>
                    Кликните на игнредиент, чтобы собрать свой сочнейший бургер</p>}

                {ingredients.map(ing=>{
                   return(
                       <li key={ing.uuid} className={ classes.list_item}>
                           <DragIcon type={"primary"} />
                           <ConstructorElement  text={ing.name} thumbnail={ing.image} price={ing.price} handleClose={onTrashClick(ing)}/>
                       </li>
                    )
                })}
            </ul>
            {!!buns.length && <ConstructorElement extraClass={clsx("ml-7 mt-4", classes.bun)}
                                                  text={buns[0]?.name + " (низ)"}
                                                  isLocked={true} thumbnail={buns[0]?.image}
                                                  price={buns[0]?.price}
                                                  type={"bottom"}/>}
            <div className={clsx(classes.cart_controls,"pt-10 pl-13 pr-4 pb-10")}>
                <p className="text text_type_digits-medium pr-10">{constructorState.cost}
                    <CurrencyIcon  type="primary"/>
                </p>
                <Button onClick={openModal}  htmlType="button" type="primary" size="large" disabled={!buns.length && !ingredients.length}>
                    Оформить заказ
                </Button>
            </div>
            {modalIsVisible && <Modal closeModal={closeModal}>
                <OrderDetalis orderId={orderId}/>
            </Modal>}
        </div>
    )
}
BurgerConstructor.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}