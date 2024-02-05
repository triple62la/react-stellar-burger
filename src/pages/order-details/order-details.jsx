import styles from "./order-details.module.css"
import {useEffect, useState} from "react";
import {getOrderDetails} from "../../utils/api";
import {useParams} from "react-router-dom";
import Preloader from "../../components/modals/preloader/preloader";
import preloaderGif from "../../assets/images/loader.gif"
import {IngredientsList} from "../../components/order-details/ingredients-list/ingredients-list";
import clsx from "clsx";

export const OrderDetails=()=>{
    const {orderNum} = useParams()
    const [order, setOrder] = useState({})

    useEffect(()=>{
        getOrderDetails(orderNum)
            .then(response=>{
                if (response.success){
                    setOrder({...response.orders.at(0)})

                }

            })
            .catch(err=>console.log(err))

    }, [])
    const statusTranslateMapper = {"done": "Выполнен"}
   return (
       <section className={styles.section}>
            {Object.keys(order).length<1 && <Preloader fetchStatus={"pending"} image={preloaderGif}/>}
            {Object.keys(order).length>0 &&
        <>
       <p className={clsx(styles["order-number"],"text text_type_digits-default" ) }>{"#"+order.number}</p>
       <h2 className="text text_type_main-medium">{order.name}</h2>
       <p className={clsx(styles["order-status"], "text text_type_main-default")}>{statusTranslateMapper[order.status] || order.status}</p>
       <p className="text text_type_main-medium mb-6">Состав:</p>
        <IngredientsList order={order}/>
        </>}
   </section>)

}