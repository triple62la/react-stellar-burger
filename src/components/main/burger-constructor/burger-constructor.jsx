import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./burger-constructor.module.css"
import clsx from "clsx";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../../utils/prop-types";
import {ConstructorContext} from "../../../services/appContext";
import {useContext, useMemo} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../../modals/modal/modal";
import {getOrderNum} from "../../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {setIsVisible, setOrderId} from "../../../services/order-modal/orderModalSlice";
import {useDrop} from "react-dnd";



export const BurgerConstructor = ()=>{

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item, monitor)=>console.log(item),
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const dispatch = useDispatch()
    const modalIsVisible = useSelector(state => state.orderModal.isVisible)
    const {constructorState, constructorDispatcher} = useContext(ConstructorContext)
    const {buns,ingredients} =  useMemo(()=>{
        return {
            buns:constructorState.ingredients.filter(item=>item.type==="bun"),
            ingredients: constructorState.ingredients.filter(item=>item.type!=="bun"),
        }
    }, [constructorState.ingredients])


    const onTrashClick = ingredientData => () => constructorDispatcher({type:"delete", payload:ingredientData})
    const closeModal = ()=>{
        dispatch(setIsVisible(false))
    }
    const openModal = ()=>{
        getOrderNum(constructorState.ingredients.map(item=>item._id))
            .then(number=>{
                dispatch(setOrderId(number))
                dispatch(setIsVisible(true))
            })
            .catch(err=>{
                alert("Произошла ошибка во время обработки заказа")
                console.error(err)
            })
    }
    return (
        <div className={classes.wrapper}>
            {!!buns.length && <ConstructorElement  extraClass={clsx("ml-7 mt-3", classes.bun)}
                                                   text={buns[0]?.name + " (верх)"} isLocked={true}
                                                   thumbnail={buns[0]?.image} price={buns[0]?.price}
                                                   type={"top"}/>}
            <ul ref={dropTarget}  className={clsx(classes.container,
                                                    "pt-4 pr-2 custom-scroll",
                {[classes.no_ingredients]:!buns.length && !ingredients.length,
                    [classes.no_scroll]:ingredients.length<=4,
                    [classes.drag_over]:isHover
                })}>

                { !buns.length && !ingredients.length && <p className={clsx(classes.no_ingredients,"text text_color_inactive")}>
                     Перетащите игнредиенты, чтобы собрать свой сочнейший бургер</p>}

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
                <OrderDetails />
            </Modal>}
        </div>
    )
}
BurgerConstructor.propTypes = {
    data:PropTypes.arrayOf(ingredientPropType)
}
