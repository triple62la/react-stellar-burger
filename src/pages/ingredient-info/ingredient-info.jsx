import { useSelector} from "react-redux";
import {selectIngById} from "../../services/burger-ingredients/selector";
import { useParams} from "react-router-dom";
import styles from "./ingredient-info.module.css";
export default function IngredientInfoPage() {

        const {ingId} = useParams()
        const {name,calories, carbohydrates, fat, proteins,  image_large,price} = useSelector(state => selectIngById(state, ingId))

    return  (
        <main  className={styles.main}>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
            <img src={image_large} alt={name}/>
            <h2 className="text text_type_main-medium mt-4 mb-8">{name}</h2>
            <ul className={styles.nutrients}>
                <li className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span
                        className="text text_type_digits-default text_color_inactive">{calories}</span>
                </li>
                <li className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                    <span
                        className="text text_type_digits-default text_color_inactive">{proteins}</span>
                </li>
                <li className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{fat}</span>
                </li>
                <li className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span
                        className="text text_type_digits-default text_color_inactive">{carbohydrates}</span>
                </li>
            </ul>
        </main>
    )
}