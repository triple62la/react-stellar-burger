import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";


export const Tabs = ()=>{
   const data = [
       {
           value:"Булки",
           onClick: ()=>console.log("Булки"),
        },
       {
           value:"Соусы",
           onClick: ()=>console.log("Соусы"),
       },
       {
           value:"Начинки",
           onClick: ()=>console.log("Начинки"),
       },
   ]

   const [current, setCurrent] = React.useState("Булки")
    return (
        <div style={{ display: 'flex' }}>
            {data.map((item,index)=>(
                <Tab key={index} active={current===item.value} value={item.value} onClick={setCurrent}/>
            ))}
        </div>
    )
}