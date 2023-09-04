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
        <div className={"pt-5 pb-10"} style={{ display: 'flex' }}>
            {data.map(item=>
                (
                <Tab key={item.value} active={current===item.value} value={item.value} onClick={setCurrent}>
                    {item.value}
                </Tab>))
            }
        </div>
    )
}