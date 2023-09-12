import classes from "./modal-overlay.module.css";
import clsx from "clsx";
import Modal from "../modal/modal";
import PropTypes from "prop-types";

const ModalOverlay = ({children,isVisible,closeModal})=> {
    return (
        <div className={clsx(classes.overlay, {[classes.hidden]:!isVisible})} onClick={closeModal}>
            <Modal closeModal={closeModal}>{children}</Modal>
        </div>
    )
}
ModalOverlay.propTypes={
    isVisible:PropTypes.bool.isRequired,
    closeModal:PropTypes.func.isRequired
}
export default ModalOverlay