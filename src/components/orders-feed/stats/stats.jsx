import styles from "./stats.module.css"
import clsx from "clsx";

export default function Stats(){
    return(
        <section className={styles.section}>
            <div>
                <h2 className={"text text_type_main-medium mb-6"}>Готовы:</h2>
                <ul>
                    <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                    <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                    <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                    <li className={clsx("text text_type_digits-default", styles["finished-orders"])}>034533</li>
                </ul>
            </div>
            <div>
                <h2 className={"text text_type_main-medium mb-6"}>В работе:</h2>
                <ul>
                    <li className={"text text_type_digits-default"}>034538</li>
                    <li className={"text text_type_digits-default"}>034538</li>
                    <li className={"text text_type_digits-default"}>034538</li>
                    <li className={"text text_type_digits-default"}>034538</li>
                </ul>
            </div>
        </section>
    )
}