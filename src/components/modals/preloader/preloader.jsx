import React from 'react';
import classes from "./preloader.module.css";
import clsx from "clsx";
import PropTypes from "prop-types";

const Preloader = ({isVisible, fetchStatus, image}) => {
    return (
        <div className={clsx(classes["preloader-overlay"], {[classes.hidden]:!isVisible})} >
            <img className={classes["preloader-image"]} src={image} alt="Loading..."/>
            <h2 className={classes.message}>{fetchStatus==="loading"?"Загружаемся...":"Произошла ошибка при загрузке"}</h2>
        </div>
    );
};

Preloader.propTypes={
    isVisible:PropTypes.bool.isRequired,
    fetchStatus:PropTypes.oneOf(["loading", "error"]),
    image:PropTypes.any
}
export default Preloader;