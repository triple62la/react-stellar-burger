import styles from "./orders.module.css"
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {selectAllIngredients} from "../../../services/burger-ingredients/selector";
import {mapIngredients} from "../../../utils/helpers";
import {Link, useLocation, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

export default function Orders ({orders}){
    const allIngredients = useSelector(selectAllIngredients)
    const location = useLocation()
    const navigate = useNavigate()
    const handleOrderClick= orderNum => e => {

        navigate(`/feed/${orderNum}`, {state:{backgroundLocation:location}})

    }
   return (
           <ul className={clsx(styles["cards-list"], "custom-scroll") }>
               {orders.map((order)=>{
                   const {summary, mapper} = mapIngredients(order.ingredients, allIngredients)
                    return (
                        <li className={styles["order-card"]} key={order._id} onClick={handleOrderClick(order.number)}>
                        <div className={styles.metadata}>
                            <p className={"text text_type_digits-default"}>{"#"+order.number}</p>
                            <p className={"text text_type_main-default text_color_inactive"}><FormattedDate date={new Date(order.createdAt)}/></p>
                        </div>
                        <h2 className={"text text_type_main-medium"}>{order.name}</h2>
                        <div className={styles.components}>
                            <div>
                                <ul className={styles.ingredients}> {Object.values(mapper).map((ingData,index, arr)=>{
                                    return (
                                    <Link to={`/ingredients/${ingData._id}`} state={{backgroundLocation:location}} key={index+ingData._id} onClick={event => event.stopPropagation()}>
                                        <li>
                                        <img style={{zIndex:[arr.length-index]}} className={styles["ingredient-img"]} src={ingData.image_mobile} alt=""/>
                                    </li>
                                    </Link>)})}
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <span className="text text_type_digits-default">{summary}</span>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    </li>
                   )})}
        </ul>
   )
}
Orders.PropType={
    orders:PropTypes.arrayOf(PropTypes.object)
}