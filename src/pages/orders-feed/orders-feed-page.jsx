import styles from "./orders-feed.module.css"
import Orders from "../../components/orders-feed/orders/orders";
import Stats from "../../components/orders-feed/stats/stats";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {ORDERS_FEED_WS_CONNECT, ORDERS_FEED_WS_DISCONNECT} from "../../services/orders-feed/actions";

export default function OrdersFeedPage (){
    const dispatch = useDispatch()
    useEffect(()=>{
        // const socket = new WebSocket("wss://norma.nomoreparties.space/orders/all")
        // socket.onmessage=evt=>{
        //     const parsedData = JSON.parse(evt.data);
        //     console.log(parsedData)
        // }
        dispatch(ORDERS_FEED_WS_CONNECT("wss://norma.nomoreparties.space/orders/all"))
        return ()=> dispatch(ORDERS_FEED_WS_DISCONNECT())
    },[dispatch])

    return (
        <main className={styles.main}>
            <h1 className={"text text_type_main-large mt-10"}>Лента заказов</h1>
            <div className={styles.content}>
                <section className={styles["orders-section"]}>
                    <Orders/>
                </section>
                <section className={styles["stats-section"]}>
                    <Stats/>
                </section>
            </div>
        </main>
    )
}