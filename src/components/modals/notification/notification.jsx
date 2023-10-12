import styles from "./notification.module.css"
import {useSelector} from "react-redux";

export const Notification = () => {
    const message = useSelector(state => state.notificationModal.message)
    const title = useSelector(state => state.notificationModal.title)
    return (
        <div className={styles.window}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.message}>{message}</p>
        </div>
    )
}