import styles from "./order-details.module.css"
import {useEffect, useState} from "react";
import {getOrderDetails} from "../../utils/api";
import {useParams} from "react-router-dom";
import Preloader from "../../components/modals/preloader/preloader";
import preloaderGif from "../../assets/images/loader.gif"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {selectAllIngredients} from "../../services/burger-ingredients/selector";

export const OrderDetails=()=>{
    const {orderNum} = useParams()
    const [order, setOrder] = useState({})
    const ingredients = useSelector(state => selectAllIngredients(state))
    useEffect(()=>{
        getOrderDetails(orderNum)
            .then(response=>{
                if (response.success){
                    setOrder({...response.orders.at(0)})

                }

            })
            .catch(err=>console.log(err))

    }, [])

   return (
       <section>
            {Object.keys(order).length<1 && <Preloader fetchStatus={"pending"} image={preloaderGif}/>}
            {Object.keys(order).length>0 &&
        <>
       <p className={`${styles[`order-number`]} text text_type_digits-default`}>{order.number}</p>
       <h2 className="text text_type_main-medium">{order.name}</h2>
       <p className={`${styles[`order-status`]} text text_type_main-default`}>{order.status}</p>
       <p className="text text_type_main-medium">Состав:</p>
       <ul className={`${styles[`ingredients-list`]} custom-scroll`}>
           {order.ingredients.map((ingId, arr)=>{
               const ingData = ingredients.find(ing=>ing._id === ingId)


               return  <li  className={"styles.ingredient"}>
                   <div className={styles[`ingredient-name`]}>
                       <div className={styles[`img-wrapper`]}>
                           <img className={styles[`ingredient-img`]}
                                src={ingData.image_mobile}
                                alt={"allIngredients[ingredientId].alt"}/>
                       </div>
                       <h3 className="text text_type_main-default">{ingData.name}</h3>
                   </div>
                   <div className={styles[`ingredient-price`]}>
                                       <span
                                           className="text text_type_digits-default">{"count"}</span>
                       <span className="text text_type_digits-default">x</span>
                       <span
                           className="text text_type_digits-default">{ingData.price}</span>
                       <CurrencyIcon type="primary"/>
                   </div>
               </li>
           })
           }


       </ul>

       <div className={styles.summary}>
           <div>
               <div className={"text text_type_main-default text_color_inactive"} > ffffffffffffffffffff</div>
               <span
                   className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
           </div>
           <div className={styles.total}>
                           <span
                               className="text text_type_digits-default">{"getIngredientsTotalPrice(ingredientCount, allIngredients)"}</span>
               <CurrencyIcon type="primary"/>
           </div>
       </div>
        </>}
   </section>)

}