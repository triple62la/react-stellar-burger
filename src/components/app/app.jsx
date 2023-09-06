import styles from "./app.module.css";
import { data } from "../../utils/data";
import {Header} from "./header/header";
import {Main} from "../main/main";

function App() {
  return (
    <div className={styles.app}>
        <Header/>
        <Main/>
        {/*<footer className={styles.footer}></footer>*/}
    </div>
  );
}

export default App;
