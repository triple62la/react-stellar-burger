import styles from "./igredients-list.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {selectAllIngredients} from "../../../services/burger-ingredients/selector";
import clsx from "clsx";
import {mapIngredients} from "../../../utils/helpers";



export const IngredientsList = ({order}) =>{

    const allIngredients = useSelector(state => selectAllIngredients(state))
    const orderIngredients = order.ingredients
    const {mapper,summary} = mapIngredients(orderIngredients, allIngredients)
    const overflow = Object.keys(mapper).length>3?"scroll":"hidden"
   return ( <>
    <ul className={clsx(styles.ingredients, "custom-scroll")} style={{overflowY:overflow}}>
        {Object.values(mapper).map(({_id, image_mobile, name, count, price })=>{
            return  <li key={_id}  className={styles.ingredient}>
                        <img className={styles["ingredient-img"]} src={image_mobile} alt={name}/>
                        <h3 className={clsx(styles["ingredient-name"],"text text_type_main-default")}>{name}</h3>
                        <div className={styles["ingredient-price"]}>
                            <span className="text text_type_digits-default">{count}</span>
                            <span className="text text_type_digits-default">x</span>
                            <span className="text text_type_digits-default">{price}</span>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </li>
        })
        }
    </ul>
        <div className={styles.footer}>
            <div>
                <FormattedDate className={"text text_type_main-default text_color_inactive"} date={new Date(order.createdAt)} />
                <span className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
            </div>
            <div className={styles["total-price"]}>
                <span className="text text_type_digits-default">{summary}</span>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
       </>
   )
}