
import styles from "./ingredient-info.module.css";
import IngredientDetails from "../../components/modals/ingredient-details/ingredient-details";



export default function IngredientInfoPage() {

    return  (
        <main  className={styles.main}>
            <IngredientDetails/>
        </main>
    )
}