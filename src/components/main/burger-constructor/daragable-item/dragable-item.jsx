import React, {useRef} from 'react';
import classes from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {moveIngredient, removeIngredient} from "../../../../services/burger-constructor/burgerConstructorSlice";
import {useDrop, useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {decrementCounter} from "../../../../services/burger-ingredients/burgerIngredientsSlice";


const DragableItem = ({ing,index}) => {
    const ref = useRef(null)
    const dispatch= useDispatch()
    const onTrashClick = ingredientData => () => {
        dispatch(removeIngredient(ingredientData))
        dispatch(decrementCounter(ingredientData._id))
    }
    const [{ handlerId }, drop] = useDrop({
        accept: "sort",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            dispatch(moveIngredient({dragIndex, hoverIndex}))
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "sort",
        item: () => {
            return { id:ing.constructorId, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
            <li ref={ref} style={{opacity}} className={ classes.list_item} data-handler-id={handlerId}>
                <DragIcon type={"primary"} />
                <ConstructorElement  text={ing.name} thumbnail={ing.image} price={ing.price} handleClose={onTrashClick(ing)}/>
            </li>
    );
};

export default DragableItem;