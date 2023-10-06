export const SHOW_MODAL = "SHOW_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"
export const SET_ORDER_ID = "SET_ORDER_ID"

export const showModal=()=>({type:SHOW_MODAL, payload:{
    isVisible:true
}})
export const hideModal = ()=>({type: HIDE_MODAL, payload: {
    isVisible: false
}})
export const setOrderId = (orderId)=>({type:SET_ORDER_ID, payload: {
    orderId
}})
