import React from 'react';
import classes from "./preloader.module.css";
import PropTypes from "prop-types";
import {createPortal} from "react-dom";


const Preloader = ({ fetchStatus, image}) => {
    return createPortal(
        <div className={classes["preloader-overlay"]} >
            <img className={classes["preloader-image"]} src={image} alt="Loading..."/>
            <h2 className={classes.message}>{fetchStatus==="loading"?"Загружаемся...":"Произошла ошибка при загрузке"}</h2>
        </div>
    , document.querySelector("#react-modals"));
};

Preloader.propTypes={
    fetchStatus:PropTypes.oneOf(["loading", "error"]),
    image:PropTypes.any
}
export default Preloader;