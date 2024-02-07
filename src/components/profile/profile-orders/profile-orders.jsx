import styles from "./profile-orders.module.css"
import Orders from "../../orders-feed/orders/orders";
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PROFILE_ORDERS_WS_CONNECT as wsConnect,
    PROFILE_ORDERS_WS_DISCONNECT as wsDisconnect} from "../../../services/profile-orders/actions";
import {selectProfileOrders, selectProfileStatus} from "../../../services/profile-orders/selectors";
import {getAuthData} from "../../../utils/helpers";
import Preloader from "../../modals/preloader/preloader";

export const ProfileOrders = ()=>{
    const dispatch = useDispatch()
    const {accessToken} =  getAuthData()

    useEffect(()=>{

        dispatch(wsConnect(
           `wss://norma.nomoreparties.space/orders?token=${accessToken.replace("Bearer ", "")}`))
        return ()=>{dispatch(wsDisconnect())
        }
    },[dispatch])
    const orders = useSelector(selectProfileOrders)
    const wsStatus = useSelector(selectProfileStatus)
    const reverseOrders = useMemo(()=>{
        return [...orders].reverse()
    },[orders])
    return (
        <>
        {wsStatus ==="CONNECTING" && <Preloader/>}

        <div className={styles.content}>
            <Orders orders={reverseOrders}/>
        </div>
        </>
    )
}