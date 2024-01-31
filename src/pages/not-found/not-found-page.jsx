import styles from "./not-found.module.css"
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage(){
    const navigate = useNavigate();
    function go_back(e){
        e.preventDefault()
        navigate(-1)
    }

    return (<main className={styles.main}>
        <h1>Oopsy Whoopsy! Запрошенная страница не найдена</h1>
        <Link to={""} onClick={go_back} style={{textDecoration:"underline"}}>Назад</Link>
    </main> )
 }