import styles from "../../../pages/order-details/order-details.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {selectAllIngredients} from "../../../services/burger-ingredients/selector";
import react from "react"
export const IngredientsList = ({order}) =>{

    const allIngredients = useSelector(state => selectAllIngredients(state))
    const orderIngredients = order.ingredients

    const ingredientsMapper = ()=>{
        const mapper = {}
        orderIngredients.forEach((ingId,index, array)=>{
            const ingData = allIngredients.find(ing=>ing._id === ingId)
            const count = array.reduce((acc, curr)=>{
                if (curr === ingData._id){
                    return ++acc
                }
                return acc
            }, 0)
            mapper[ingId] = {...ingData, count}
        })
        return mapper
    }

   return (
    <ul className={`${styles[`ingredients-list`]} custom-scroll`}>
        {Object.values(ingredientsMapper()).map(({_id, image_mobile, name, count, price })=>{
            return  <li key={_id}  className={"styles.ingredient"}>
                <div className={styles[`ingredient-name`]}>
                    <div className={styles[`img-wrapper`]}>
                        <img className={styles[`ingredient-img`]}
                             src={image_mobile}
                             alt={"allIngredients[ingredientId].alt"}/>
                    </div>
                    <h3 className="text text_type_main-default">{name}</h3>
                </div>
                <div className={styles[`ingredient-price`]}>
                    <span className="text text_type_digits-default">{count}</span>
                    <span className="text text_type_digits-default">x</span>
                    <span className="text text_type_digits-default">{price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </li>
        })
        }


    </ul>)
}