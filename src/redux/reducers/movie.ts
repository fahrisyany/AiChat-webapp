import * as type from '../types/movie.types'

const initialState:type.MovieState = {
    movies:[],
    loading:false,
    error:'',
    page:0,
    totalPage:0,
    totalResult:0
,}


export default function movieReducer(state = initialState, action: type.MovieSearchActionTypes):type.MovieState {
console.log("action", action)
    switch (action.type) {
        case type.GET_MOVIE_SEARCH_REQUESTED:
            return {
                ...state,
                loading:true
            }
        case type.GET_MOVIE_SEARCH_SUCCESS:
            return {
                ...state,
                movies: action.movies,
                page: action.page,
                totalPage: action.totalPage,
                totalResult: action.totalResult,
                loading:false
            }
        case type.GET_MOVIE_SEARCH_FAILED:
            return {
                ...state,
                loading:false,
                error:action.message
            }

        default: return state
    }
}