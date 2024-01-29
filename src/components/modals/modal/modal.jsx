import {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import classes from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {createPortal} from "react-dom";


const Modal = ({closeModal, children, btnExtraClass}) => {


    const handleEscPress = useCallback((e) => {
        if (e.key === "Escape") {
            closeModal()
        }
    },[closeModal])

    const handleModalClick = useCallback((e)=> e.stopPropagation(), [])

    useEffect(()=>{
        document.addEventListener("keydown", handleEscPress)
        return ()=>document.removeEventListener("keydown",handleEscPress)
    })

    return createPortal((
            <ModalOverlay closeModal={closeModal}>
                <div className={classes.content} onClick={handleModalClick}>
                    <button className={classes["close-btn"]} onClick={closeModal} style={btnExtraClass}>
                        <CloseIcon type="primary"/>
                    </button>
                    {children}
                </div>
            </ModalOverlay>
    ), document.querySelector("#react-modals"));
};

Modal.propTypes = {
    closeModal:PropTypes.func.isRequired,
    btnExtraClass:PropTypes.object,
};



export default Modal;