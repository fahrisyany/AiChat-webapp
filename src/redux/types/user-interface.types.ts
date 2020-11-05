
export const TOGGLE_TOAST = 'TOGGLE_TOAST'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'


export interface ToggleToastInterface {
    type: typeof TOGGLE_TOAST,
    text?: string,
    title?: string,
    status: boolean
}
export interface ToggleModalInterface {
    type: typeof TOGGLE_MODAL,
    text?: string,
    status?: boolean

}

export type UIActionTypes = ToggleToastInterface | ToggleModalInterface



