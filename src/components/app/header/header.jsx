import {Navigation} from "./navigation/navigation";
import classes from "./header.module.css"

export function Header(){
    return (<header className={classes.header}>
       <Navigation/>
    </header>)
}