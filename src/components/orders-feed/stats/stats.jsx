import styles from "./stats.module.css"
import clsx from "clsx";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {selectTotal, selectTotalToday} from "../../../services/orders-feed/selectors";

export default function Stats({orders}){

    const undone = []
    const done = []
    orders.forEach(order=>{
        if (order.status ==="done"){
            done.push(order.number)
        } else {
            undone.push(order.number)
        }
    })
    const totalToday = useSelector(selectTotalToday)
    const total = useSelector(selectTotal)

    return(
        // <section className={styles.section}>
        <>
            <div className={styles.orders}>
                <div>
                    <h2 className={"text text_type_main-medium mb-6"}>Готовы:</h2>
                    <ul className={styles.items}>
                        {done.slice(0,10).map(num=><li key={num} className={clsx("text text_type_digits-default", styles["finished-orders"])}>{num}</li>)}

                    </ul>
                </div>
                <div>
                    <h2 className={"text text_type_main-medium mb-6"}>В работе:</h2>
                    <ul className={styles.items}>
                        {undone.slice(0,10).map(num=> <li key={num} className={"text text_type_digits-default"}>{num}</li>)}

                    </ul>
                </div>
            </div>
            <div>
                <h2 className={"text text_type_main-medium"}>Выполнено за все время:</h2>
                <p className={"text text_type_digits-large"}>{total}</p>
            </div>
            <div>
                <h2 className={"text text_type_main-medium"}>Выполнено за сегодня:</h2>
                <p className={"text text_type_digits-large"}>{totalToday}</p>
            </div>
        </>
    )
}
Stats.PropType={
    orders:PropTypes.arrayOf(PropTypes.object)
}