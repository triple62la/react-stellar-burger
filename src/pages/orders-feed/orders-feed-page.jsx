import styles from "./orders-feed.module.css"
import Orders from "../../components/orders-feed/orders/orders";
import Stats from "../../components/orders-feed/stats/stats";

export default function OrdersFeedPage (){
    return (
        <main className={styles.main}>
            <h1 className={"text text_type_main-large mt-10"}>Лента заказов</h1>
            <div className={styles.content}>
                <section className={styles.section}>
                    <Orders/>
                </section>
                <section className={styles.section}>
                    <Stats/>
                </section>
            </div>
        </main>
    )
}