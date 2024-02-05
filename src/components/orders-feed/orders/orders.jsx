import styles from "./orders.module.css"
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {selectOrders} from "../../../services/orders-feed/selectors";

export default function Orders ({orders}){


   return (
           <ul className={clsx(styles["cards-list"], "custom-scroll") }>
               {orders.map((order)=>{
                    return (<li key={order._id} className={styles["order-card"]}>
                        <div className={styles.metadata}>
                            <p className={"text text_type_digits-default"}>{"#"+order.number}</p>
                            <p className={"text text_type_main-default text_color_inactive"}><FormattedDate date={new Date(order.createdAt)}/></p>
                        </div>
                        <h2 className={"text text_type_main-medium"}>{order.name}</h2>
                        <div className={styles.components}>
                            <div>
                                <ul className={styles.ingredients}> {order.ingredients.map((ingId,index, arr)=>{

                                    return (
                                    <li key={index+ingId}>
                                        <img style={{zIndex:[arr.length-index]}} className={styles["ingredient-img"]} src="https://code.s3.yandex.net/react/code/bun-01.png" alt=""/>
                                    </li>)})}
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <span className="text text_type_digits-default">2540</span>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    </li>)})}
        </ul>
   )
}