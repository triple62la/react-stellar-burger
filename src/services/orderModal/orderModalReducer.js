import * as actions from "./orderModalActions"


const initialState = {
    isVisible:false
}

export const orderModalReducer=(state=initialState, action)=>{
    switch (action.type) {
        case actions.SHOW_MODAL:
            return{
                ...state,
                isVisible: true
            }
        case  actions.HIDE_MODAL:
            return{
                ...state,
                isVisible: false
            }
        default :
            return state
    }
}