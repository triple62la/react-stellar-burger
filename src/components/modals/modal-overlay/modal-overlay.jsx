import classes from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({closeModal,children})=> {

    return (
        <div className={classes.overlay} onClick={closeModal}>{children}</div>
    )
}
ModalOverlay.propTypes={
    closeModal:PropTypes.func.isRequired
}
export default ModalOverlay