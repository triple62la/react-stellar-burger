import classes from "./burger-ingredients.module.css"
import clsx from "clsx";
import CategorizedComponents from "./categorized-component/categorized-components";
import IngredientDetails from "../../modals/ingredient-details/ingredient-details";
import {memo, useCallback, useContext,  useMemo} from "react";
import Modal from "../../modals/modal/modal";
import {IngredientsContext} from "../../../services/appContext";
import {setIsVisible} from "../../../services/ingredient-modal/ingredientModalSlice";
import {useDispatch, useSelector} from "react-redux";

const BurgerIngredients = () => {

    const dispatcher = useDispatch()
    const isVisible = useSelector(state=>state.ingredientModal.isVisible)
    const categories = useSelector(state => state.burgerIngredients.categories)
    const {ingredients} = useContext(IngredientsContext)
    const categorizedIngredients = useMemo(()=>{
        return {
             buns : ingredients.filter(item=>item.type === 'bun'),
             sauces : ingredients.filter(item=>item.type === 'sauce'),
             mains : ingredients.filter(item=>item.type === 'main'),
        }
    },[ingredients])

    const closeModal = useCallback(()=>dispatcher(setIsVisible(false)),[dispatcher])

    return (
        <>
            <ul className={clsx(classes.components,'custom-scroll')}>
                {categories.map(category=>
                    <CategorizedComponents key={category.id} categoryName={category.name}
                                           ingredients={categorizedIngredients[category.id]}
                    categoryId={category.id}/>
                )}
            </ul>
            {isVisible &&<Modal closeModal={closeModal} >
                <IngredientDetails />
                            </Modal>}
        </>
    )
}

export default memo(BurgerIngredients)