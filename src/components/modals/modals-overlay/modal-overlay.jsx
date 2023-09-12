import classes from "./modal-overlay.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {useEffect} from "react";

const ModalOverlay = ({children,isVisible,closeModal})=> {

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
        <div className={clsx(classes.overlay, {[classes.hidden]:!isVisible})} onClick={closeModal}>
            <div className={classes.content} onClick={(e)=>e.stopPropagation()}>
                <button className={classes["close-btn"]} onClick={closeModal}>
                    <CloseIcon type="primary"/>
                </button>
                {children}
            </div>
        </div>
    )
}
export default ModalOverlay