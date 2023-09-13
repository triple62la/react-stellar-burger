import React from 'react';
import classes from "./order-details.module.css"
import PropTypes from "prop-types";
import orderSuccessImage from "../../../assets/images/submitted-order.svg"
import clsx from "clsx";

const OrderDetalis = ({orderId}) => {
    return (
            <div className={clsx(classes.content, "pt-30 pb-30 pl-25 pr-25")}>
                <h2 className="text text_type_digits-large">{orderId}</h2>
                <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
                <img className={clsx(classes['order-image'] )} src={orderSuccessImage} alt='Успешно' />
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на орбитальной станции</p>
            </div>
    );
};

OrderDetalis.propTypes = {
    orderId:PropTypes.string
}
OrderDetalis.defaultProps = {
    orderId:"034536"
}

export default OrderDetalis;