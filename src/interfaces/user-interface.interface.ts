export interface ToastInterface {
    text?: string,
    title?: string,
    status?: boolean
}
export interface ModalInterface {
    text?: string,
    status?: boolean

}


export interface UIInterface {
    toast: ToastInterface
    modal: ModalInterface
}