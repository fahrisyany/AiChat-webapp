import { User } from "../../interfaces/user.interface"
export const GET_DATAS_REQUESTED = 'GET_DATAS_REQUESTED'
export const GET_DATAS_SUCCESS = 'GET_DATAS_SUCCESS'
export const GET_DATAS_FAILED = 'GET_DATAS_FAILED'

export interface DataState {
    datas: User[],
    loading: boolean,
    error?: string
}

interface GetDataActionInterface {
    type: typeof GET_DATAS_REQUESTED
}
interface GetDataFailActionInterface {
    type: typeof GET_DATAS_FAILED,
    message: string
}
interface GetDataSuccessActionInterface {
    type: typeof GET_DATAS_SUCCESS,
    datas: User[]
}

export type DataActionTypes = (GetDataActionInterface | GetDataFailActionInterface | GetDataSuccessActionInterface)
