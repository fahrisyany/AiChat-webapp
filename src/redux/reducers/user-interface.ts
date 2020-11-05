import * as type from '../types/user-interface.types'
import { UIInterface, ToastInterface, ModalInterface } from "../../interfaces/user-interface.interface"

const toastState: ToastInterface = {
    text: '',
    status: false
}
const modalState: ModalInterface = {
    text: '',
    status: false
}

const initialState: UIInterface = {
    toast: toastState,
    modal: modalState
}


export default function UIReducer(state = initialState, action: type.UIActionTypes): UIInterface {
    switch (action.type) {
        case type.TOGGLE_TOAST:
            return {
                ...state,
                toast: {
                    text: action.text,
                    title: action.title,
                    status: action.status
                }
            }
        case type.TOGGLE_MODAL:
            return {
                ...state,
                modal: {
                    text: action.text,
                    status: action.status

                }
            }
        default: return state
    }
}