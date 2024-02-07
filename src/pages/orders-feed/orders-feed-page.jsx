import styles from "./orders-feed.module.css"
import Orders from "../../components/orders-feed/orders/orders";
import Stats from "../../components/orders-feed/stats/stats";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ORDERS_FEED_WS_CONNECT as wsConnect, ORDERS_FEED_WS_DISCONNECT as wsDisconnect} from "../../services/orders-feed/actions";
import {selectOrders, selectStatus} from "../../services/orders-feed/selectors";
import Preloader from "../../components/modals/preloader/preloader";

export default function OrdersFeedPage (){

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(wsConnect("wss://norma.nomoreparties.space/orders/all"))
        return ()=> dispatch(wsDisconnect())
    },[dispatch])

    const orders = useSelector(selectOrders)
    const wsStatus = useSelector(selectStatus)

    return (
        <>
            {wsStatus ==="CONNECTING" && <Preloader/>}
            {wsStatus === "ONLINE" &&
            <main className={styles.main}>
                <h1 className={"text text_type_main-large mt-10"}>Лента заказов</h1>
                <div className={styles.content}>
                    <section className={styles["orders-section"]}>
                        <Orders orders={orders}/>
                    </section>
                    <section className={styles["stats-section"]}>
                        <Stats orders={orders}/>
                    </section>
                </div>
            </main>}
        </>
    )
}