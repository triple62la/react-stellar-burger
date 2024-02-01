import styles from "./stats.module.css"
import clsx from "clsx";

export default function Stats(){
    return(
        // <section className={styles.section}>
        <>
            <div className={styles.orders}>
                <div>
                    <h2 className={"text text_type_main-medium mb-6"}>Готовы:</h2>
                    <ul className={styles.items}>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                        <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>6666</li>
                    </ul>
                </div>
                <div>
                    <h2 className={"text text_type_main-medium mb-6"}>В работе:</h2>
                    <ul className={styles.items}>
                        <li className={"text text_type_digits-default"}>034538</li>
                        <li className={"text text_type_digits-default"}>034538</li>
                        <li className={"text text_type_digits-default"}>034538</li>
                        <li className={"text text_type_digits-default"}>034538</li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className={"text text_type_main-medium"}>Выполнено за все время:</h2>
                <p className={"text text_type_digits-large"}>66666</p>
            </div>
            <div>
                <h2 className={"text text_type_main-medium"}>Выполнено за сегодня:</h2>
                <p className={"text text_type_digits-large"}>66</p>
            </div>
        </>
    )
}