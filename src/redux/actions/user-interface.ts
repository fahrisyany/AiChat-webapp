import * as type from '../types/user-interface.types'

export function toggleToast(status: boolean, text?: string, title?: string): type.UIActionTypes {
    return {
        type: type.TOGGLE_TOAST,
        text: text,
        title: title,
        status: status
    }
}
export function toggleModal( status:boolean,text?: string, ): type.UIActionTypes {
    return {
        type: type.TOGGLE_MODAL,
        status: status,
        text: text,
     
    }
}