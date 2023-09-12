import {useEffect} from 'react';
import PropTypes from 'prop-types';
import classes from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({closeModal, children}) => {

    const handleEscPress = (e) =>{
        if (e.key==="Escape"){
            closeModal()
        }
    }
    useEffect(()=>{
        document.addEventListener("keydown", handleEscPress)
        return ()=>document.removeEventListener("keydown",handleEscPress)
    })
    return (
        <div className={classes.content} onClick={(e)=>e.stopPropagation()}>
            <button className={classes["close-btn"]} onClick={closeModal}>
                <CloseIcon type="primary"/>
            </button>
            {children}
        </div>
    );
};

Modal.propTypes = {
    closeModal:PropTypes.func.isRequired
};

export default Modal;