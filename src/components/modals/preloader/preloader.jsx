import React from 'react';
import classes from "./preloader.module.css";
import PropTypes from "prop-types";
import {createPortal} from "react-dom";
import DefaultGif from "../../../assets/images/loader.gif"


const Preloader = ({ fetchStatus = "pending", image=DefaultGif}) => {
    return createPortal(
        <div className={classes["preloader-overlay"]} >
            <img className={classes["preloader-image"]} src={image} alt="Loading..."/>
            <h2 className={classes.message}>{fetchStatus==="pending"?"Загружаемся...":"Произошла ошибка при загрузке данных"}</h2>
        </div>
    , document.querySelector("#react-modals"));
};

Preloader.propTypes={
    fetchStatus:PropTypes.oneOf(["pending", "error"]),
    image:PropTypes.any
}
export default Preloader;