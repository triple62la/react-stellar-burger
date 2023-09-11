import {Navigation} from "./navigation/navigation";
import classes from "./app-header.module.css"

export function AppHeader(){
    return (<header className={classes.header}>
       <Navigation/>
    </header>)
}