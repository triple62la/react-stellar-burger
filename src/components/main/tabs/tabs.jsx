import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {setActiveTab} from "../../../services/burger-ingredients/burgerIngredientsSlice";

export const Tabs = ()=>{

    const activeTab = useSelector(state=> state.burgerIngredients.activeTab)
    const categories = useSelector(state=> state.burgerIngredients.categories)
    const dispatcher = useDispatch()
    const handleClick = (tabName, categoryId) =>()=>{
        dispatcher(setActiveTab(tabName))
        document.getElementById(categoryId).scrollIntoView({behavior: 'smooth' })
    }
    return (
        <div className={"pt-5 pb-10"} style={{ display: 'flex' }}>
            {categories.map(category=>
                (
                <Tab key={category.name} active={activeTab===category.name} value={category.name} onClick={handleClick(category.name, category.id)}>
                    {category.name}
                </Tab>))
            }
        </div>
    )
}