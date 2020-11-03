import * as type from '../types/data.types'

export function getData():type.DataActionTypes {
    return {
        type: type.GET_DATAS_REQUESTED,
    }
}