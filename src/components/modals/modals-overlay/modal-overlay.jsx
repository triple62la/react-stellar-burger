import classes from "./modal-overlay.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

const ModalOverlay = ({children,isVisible,closeModal})=> {
    return (
        <div className={clsx(classes.overlay, {[classes.hidden]:!isVisible})} onClick={closeModal}>
            <div className={classes.content}>
                <button className={classes["close-btn"]} onClick={closeModal}>
                    <CloseIcon type="primary"/>
                </button>
                {children}
            </div>
        </div>
    )
}
export default ModalOverlay