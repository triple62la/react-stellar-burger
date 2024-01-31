import styles from "./orders.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

export default function Orders (){
   return (
           <ul className={clsx(styles["cards-list"], "custom-scroll") }>
               {[0,0,0,0].map(()=>{
                    return (<li className={styles["order-card"]}>
                        <div className={styles.metadata}>
                            <p className={"text text_type_digits-default"}>#034535</p>
                            <p className={"text text_type_main-default text_color_inactive"}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h2 className={"text text_type_main-medium"}>Death Star Starship Main бургер</h2>
                        <div className={styles.components}>
                            <div>
                                <ul className={styles.ingredients}> {[0,1,2,3,4,5].map((_,index, arr)=>{

                                    return (
                                    <li>
                                        <img style={{["z-index"]:[arr.length-index]}} className={styles["ingredient-img"]} src="https://code.s3.yandex.net/react/code/bun-01.png" alt=""/>
                                    </li>)})}
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <span className="text text_type_digits-default">2540</span>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    </li>)})}
        </ul>
   )
}