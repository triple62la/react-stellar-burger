import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setVisible, setTitle, setMessage} from "../services/notification-modal/notificationModalSlice";

const useNotification = ()=>{
    const dispatch = useDispatch()
    const showNotification = useCallback((title, msg)=>{
        dispatch(setTitle(title))
        dispatch(setMessage(msg))
        dispatch(setVisible(true))
    }, [dispatch])
    const closeNotification = useCallback(()=>{
        dispatch(setTitle(""))
        dispatch(setMessage(""))
        dispatch(setVisible(false))
    })
    return [showNotification, closeNotification]
}
export default useNotification