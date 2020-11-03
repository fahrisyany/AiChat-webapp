import * as type from '../types/data.types'

const initialState:type.DataState = {
    datas:[],
    loading:false,
    error:''
,}


export default function datasReducer(state = initialState, action: type.DataActionTypes):type.DataState {
    switch (action.type) {
        case type.GET_DATAS_REQUESTED:
            return {
                ...state,
                loading:true
            }
        case type.GET_DATAS_SUCCESS:
            return {
                ...state,
                datas: action.datas,
                loading:false
            }
        case type.GET_DATAS_FAILED:
            return {
                ...state,
                loading:false,
                error:action.message
            }

        default: return state
    }
}