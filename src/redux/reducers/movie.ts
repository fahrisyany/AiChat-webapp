import * as type from '../types/movie.types'
import { MovieState } from "../../interfaces/movie/movie-state.interface"



const initialState: MovieState = {
    movies: [],
    loading: false,
    error: '',
    page: 0,
    totalPage: 0,
    totalResult: 0,
    favorites: [],
    favoritesDetails: [],
    movieDetail: undefined,
    movieCredits: undefined
    ,
}


export default function movieReducer(state = initialState, action: type.MovieActionTypes): MovieState {
    switch (action.type) {
        case type.GET_MOVIE_SEARCH_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case type.GET_MOVIE_SEARCH_SUCCESS:
            return {
                ...state,
                movies: action.movies,
                page: action.page,
                totalPage: action.totalPage,
                totalResult: action.totalResult,
                loading: false
            }
        case type.GET_MOVIE_SEARCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case type.GET_MOVIE_DETAIL_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case type.GET_MOVIE_DETAIL_SUCCESS:
            return {
                ...state,
                movieDetail: action.movieDetail,
                movieCredits: action.movieCredits,
                loading: false
            }
        case type.GET_MOVIE_DETAIL_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case type.GET_FAVORITE_MOVIE_SUCCESS:
            return {
                ...state,
                favorites: action.favorites,
                favoritesDetails: action.favoritesDetails
            }

        default: return state
    }
}