import classes from "./modal-overlay.module.css";
import clsx from "clsx";
import Modal from "../modal/modal";

const ModalOverlay = ({children,isVisible,closeModal})=> {
    return (
        <div className={clsx(classes.overlay, {[classes.hidden]:!isVisible})} onClick={closeModal}>
            <Modal closeModal={closeModal}>{children}</Modal>
        </div>
    )
}
export default ModalOverlay